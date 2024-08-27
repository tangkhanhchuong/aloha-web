import React, { useEffect, useState } from 'react'

import { ITEMS_PER_PAGE } from '../../constants'
import LoadIcon from '../../images/loading.gif'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { getDataAPI } from '../../utils/fetchData'
import { mapMessages } from '../../utils/mapMessages'
import Posts from '../home/Posts'

const SavedPosts = ({ auth, dispatch }) => {
  const [savedPosts, setSavedPosts] = useState([])
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const [firstLoadloading, setFirstLoadloading] = useState(false)
  const [loadMoreLoading, setLoadMoreLoading] = useState(false)

  useEffect(() => {
    setFirstLoadloading(true)
    getDataAPI(dispatch, 'users/saved-posts', auth.token)
      .then((res) => {
        setSavedPosts(() => res.data.savedPosts)
        setPage(page => page + 1)
        setCount(() => res.data.count)
        setFirstLoadloading(() => false)
      })
      .catch((err) => {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: mapMessages(err.response.data.msg), loading: false },
        })
      })

    return () => setSavedPosts([])
  }, [auth.token, dispatch])

  const handleLoadMore = async () => {
    setLoadMoreLoading(true)
    const res = await getDataAPI(
      dispatch,
      `users/saved-posts?limit=${ITEMS_PER_PAGE}&&page=${page}`,
      auth.token
    )
    setSavedPosts((prevPosts) => [...prevPosts, ...res.data.savedPosts])
    setPage(page => page + 1)
    setCount(() => res.data.count)
    setLoadMoreLoading(() => false)
  }

  return (
    <>
      {
        firstLoadloading ? (
          <img src={LoadIcon} alt='loading' className='d-block mx-auto' />
        ) : count === 0 && savedPosts.length === 0 ? (
          <h4 className='text-center my-2'>No Post</h4>
        ) : (
          <Posts
            loading={loadMoreLoading}
            posts={savedPosts}
            count={count}
            page={page}
            handleLoadMore={handleLoadMore}
          />
        )
      }
    </>
  )
}

export default SavedPosts
