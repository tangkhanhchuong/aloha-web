import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoadIcon from '../../images/loading.gif'
import { getDataAPI } from '../../utils/fetchData'
import FollowBtn from '../FollowBtn'
import UserCard from '../UserCard'

const Followers = () => {
  const { auth } = useSelector((state) => state)
  const [followers, setFollowers] = useState([])
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const mountedRef = useRef(true)

  const getFollowers = useCallback(
    async () => {
      const res = await getDataAPI(
        dispatch,
        `users/${auth.user.userId}/followers`,
        auth.token
      )
      if (!mountedRef.current) return null
      setFollowers(res.data?.data.items)
      setLoading(() => false)
    },
    [dispatch, auth]
  )

  useEffect(() => {
    const fetchData = async () => {
      await getFollowers();
    };
    fetchData();
    return () => {
      mountedRef.current = false;
    };
  }, [getFollowers]);


  return (
    <>
      {
        loading && <img src={LoadIcon} alt='loading' className='d-block mx-auto' />
      }
      <div className='follow mt-2'>
          {
            followers.map((user) => (
              <UserCard
                key={user.userId}
                user={user}
              >
                {auth.user.userId !== user.userId && <FollowBtn user={user} />}
              </UserCard>
            ))
          }
        </div>
    </>
  )
}

export default Followers
