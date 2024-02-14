import React, { useState, useEffect } from 'react'

import Posts from '../home/Posts'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { getDataAPI } from '../../utils/fetchData'
import { mapMessages } from '../../utils/mapMessages'

const SavedPosts = ({ auth, dispatch }) => {
  const [savedPosts, setSavedPosts] = useState([])
  const [page, setPage] = useState(2)
  const [count, setCount] = useState(9)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getDataAPI(dispatch, 'users/saved-posts', auth.token)
      .then((res) => {
        setSavedPosts(res.data.savedPosts)
        setLoading(false)
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
    setLoading(true)
    const res = await getDataAPI(
      dispatch,
      `users/saved-posts?limit=${page * 9}`,
      auth.token
    )
    setSavedPosts(res.data.savedPosts)
    setPage(page + 1)
    setCount(res.data.count)
    setLoading(false)
  }

  return (
    <Posts
      loading={loading}
      posts={savedPosts}
      count={count}
      handleLoadMore={handleLoadMore}
    />
  )
}

export default SavedPosts
