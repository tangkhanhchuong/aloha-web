import React, { useState, useEffect } from 'react'

import PostThumb from '../PostThumb'
import LoadIcon from '../../images/loading.gif'
import LoadMoreBtn from '../LoadMoreBtn'
import { getDataAPI } from '../../utils/fetchData'
import { mapMessages } from '../../utils/mapMessages'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

const Saved = ({ auth, dispatch }) => {
  const [savedPosts, setSavedPosts] = useState([])
  const [count, setCount] = useState(9)
  const [page, setPage] = useState(2)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    setLoad(true)
    getDataAPI(dispatch, 'users/saved-posts', auth.token)
      .then((res) => {
        setSavedPosts(res.data.savedPosts)
        setCount(res.data.count)
        setLoad(false)
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
    setLoad(true)
    const res = await getDataAPI(
      dispatch,
      `users/saved-posts?limit=${page * 9}`,
      auth.token
    )
    setSavedPosts(res.data.savedPosts)
    setCount(res.data.count)
    setPage(page + 1)
    setLoad(false)
  }

  return (
    <div>
      <PostThumb posts={savedPosts} count={count} />
      {load && <img src={LoadIcon} alt='loading' className='d-block mx-auto' />}
      <LoadMoreBtn
        count={count}
        page={page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  )
}

export default Saved
