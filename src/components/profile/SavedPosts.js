import React, { useState, useEffect } from 'react'

import { ITEMS_PER_PAGE } from '../../constants'
import Posts from '../home/Posts'
import LoadIcon from '../../images/loading.gif'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { getDataAPI } from '../../utils/fetchData'
import { mapMessages } from '../../utils/mapMessages'

const SavedPosts = ({ auth, dispatch }) => {
  const [savedPosts, setSavedPosts] = useState([])
  const [page, setPage] = useState(0)
  const [count, setCount] = useState(0)
  const [firstLoadloading, setFirstLoadloading] = useState(false)
  const [loadMoreLoading, setLoadMoreLoading] = useState(false)

  useEffect(() => {
    setFirstLoadloading(true)
    getDataAPI(dispatch, 'users/saved-posts', auth.token)
      .then((res) => {
        setSavedPosts(res.data.savedPosts)
        setFirstLoadloading(false)
      })
      .catch((err) => {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: mapMessages(err.response.data.msg) },
        })
      })

    return () => setSavedPosts([])
  }, [auth.token, dispatch])

  const handleLoadMore = async () => {
    setLoadMoreLoading(true)
    const res = await getDataAPI(
      dispatch,
      `users/saved-posts?limit=${ITEMS_PER_PAGE}`,
      auth.token
    )
    setSavedPosts(res.data.savedPosts)
    setPage(page + 1)
    setCount(res.data.count)
    setLoadMoreLoading(false)
  }

  return (
    <>
      {
        firstLoadloading ? (
          <img src={LoadIcon} alt='loading' className='d-block mx-auto' />
        ) : count === 0 && savedPosts.length === 0 ? (
          <h2 className='text-center'>No Post</h2>
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
