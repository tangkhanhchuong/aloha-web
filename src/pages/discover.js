import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  getDiscoverPosts,
  DISCOVER_TYPES,
} from '../redux/actions/discoverAction'
import LoadIcon from '../images/loading.gif'
import PostThumb from '../components/PostThumb'
import LoadMoreBtn from '../components/LoadMoreBtn'
import { getDataAPI } from '../utils/fetchData'

const Discover = () => {
  const { auth, discover } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!discover.firstLoad) {
      dispatch(getDiscoverPosts(auth.token))
    }
  }, [dispatch, auth.token, discover.firstLoad])

  const handleLoadMore = async () => {
    setLoading(true)
    const res = await getDataAPI(
      dispatch,
      `users/discover-posts?num=${discover.page * 9}`,
      auth.token
    )
    dispatch({ type: DISCOVER_TYPES.UPDATE_POST, payload: res.data })
    setLoading(false)
  }

  return (
    <div>
      {discover.loading ? (
        <img src={LoadIcon} alt='loading' className='d-block mx-auto my-4' />
      ) : (
        <PostThumb posts={discover.posts} count={discover.count} />
      )}

      {loading && <img src={LoadIcon} alt='loading' className='d-block mx-auto' />}

      {!discover.loading && (
        <LoadMoreBtn
          count={discover.count}
          page={discover.page}
          loading={loading}
          handleLoadMore={handleLoadMore}
        />
      )}
    </div>
  )
}

export default Discover
