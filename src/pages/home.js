import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Status from '../components/home/Status'
import Posts from '../components/home/Posts'
import RightSideBar from '../components/home/RightSideBar'
import { getDataAPI } from '../utils/fetchData'
import { POST_TYPES } from '../redux/actions/postAction'

let scroll = 0

const Home = () => {
  const { homePosts, auth } = useSelector((state) => state)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const handleLoadMore = async () => {
    setLoading(true)

    const res = await getDataAPI(
      dispatch,
      `posts?limit=${homePosts.page * 9}`,
      auth.token
    )
    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: { ...res.data, page: homePosts.page + 1 },
    })

    setLoading(false)
  }

  window.addEventListener('scroll', () => {
    if (window.location.pathname === '/') {
      scroll = window.pageYOffset
      return scroll
    }
  })

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: scroll, behavior: 'smooth' })
    }, 100)
  }, [])

  return (
    <div className='home row'>
      <div className='col-md-8'>
        <Status />
        <Posts
          loading={loading}
          posts={homePosts.posts}
          count={homePosts.count}
          page={homePosts.page}
          handleLoadMore={handleLoadMore}
        />
      </div>

      <div className='col-md-4'>
        <RightSideBar />
      </div>
    </div>
  )
}

export default Home
