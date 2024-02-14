import React, { useState, useEffect } from "react"

import Posts from "../home/Posts"
import { PROFILE_TYPES } from "../../redux/actions/profileAction"
import { getDataAPI } from "../../utils/fetchData"

const MyPosts = ({ auth, id, dispatch, profile }) => {
  const [posts, setPosts] = useState([])
  const [count, setCount] = useState(9)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    profile.posts.forEach((data) => {
      if (data._id === id) {
        setPosts(data.posts)
        setCount(data.count)
        setPage(data.page)
      }
    })
  }, [profile.posts, id])

  const handleLoadMore = async () => {
    setLoading(true)
    const res = await getDataAPI(
      dispatch,
      `users/${id}/posts?limit=${page * 9}`,
      auth.token
    )
    const newData = { ...res.data, page: page + 1, _id: id }
    dispatch({ type: PROFILE_TYPES.UPDATE_PROFILE_POST, payload: newData })
    setLoading(false)
  }

  return (
    <Posts
      loading={loading}
      posts={posts}
      count={count}
      handleLoadMore={handleLoadMore}
    />
  )
}

export default MyPosts
