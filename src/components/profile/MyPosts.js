import React, { useCallback, useEffect, useRef, useState } from "react"

import { ITEMS_PER_PAGE } from "../../constants"
import { getDataAPI } from "../../utils/fetchData"
import Posts from "../home/Posts"

const MyPosts = ({ auth, id, dispatch }) => {
  const [posts, setPosts] = useState([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const mountedRef = useRef(true)

  const getMyPosts = useCallback(async () => {
    const res = await getDataAPI(
      dispatch,
      `users/${id}/posts?limit=${ITEMS_PER_PAGE}&&page=${page}`,
      auth.token
    )
    if (!mountedRef.current) return null;
    setPosts(() => [...res.data.data?.items])
    setCount(() => res.data.data?.total)
    setPage((prevPage) => prevPage + 1)
    setLoading(() => false)
  }, [page, dispatch, auth.token, id])

  useEffect(() => {
    const fetchData = async () => {
      await getMyPosts();
    };
    fetchData();
    return () => {
      mountedRef.current = false;
    };
  }, [getMyPosts]);

  const handleLoadMore = async () => {
    const res = await getDataAPI(
      dispatch,
      `users/${id}/posts?limit=${ITEMS_PER_PAGE}&&page=${page}`,
      auth.token
    )
    const newData = { ...res.data.data, page: page + 1, _id: id }
    setPosts((prevPosts) => [...prevPosts, ...newData?.items])
    setCount(() => newData?.total)
    setPage((prevPage) => prevPage + 1)
    setLoading(() => false)
  }

  return (
    <Posts
      loading={loading}
      posts={posts}
      count={count}
      page={page}
      handleLoadMore={handleLoadMore}
    />
  )
}

export default MyPosts
