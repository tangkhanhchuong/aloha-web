import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Status from '../components/home/Status'
import Posts from '../components/home/Posts'
import RightSideBar from '../components/home/RightSideBar'
import LoadIcon from '../images/loading.gif'
import { loadMorePosts } from '../redux/actions/postAction'

let scroll = 0

const Home = () => {
  const { homePosts, auth } = useSelector((state) => state)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const handleLoadMore = async () => {
    setLoading(true)
    dispatch(loadMorePosts({ auth }))
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
        {
          homePosts.loading ? (
            <img src={LoadIcon} alt='loading' className='d-block mx-auto' />
          ) : homePosts.count === 0 && homePosts.posts.length === 0 ? (
            <h4 className='text-center my-2'>No Post</h4>
          ) : (
            <Posts
              loading={loading}
              posts={homePosts.posts}
              handleLoadMore={handleLoadMore}
              page={homePosts.page + 1}
              count={homePosts.count}
            />
          )
        }
      </div>

      <div className='col-md-4'>
        <RightSideBar />
      </div>
    </div>
  )
}

export default Home
