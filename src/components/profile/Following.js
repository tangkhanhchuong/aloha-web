import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoadIcon from '../../images/loading.gif'
import { getDataAPI } from '../../utils/fetchData'
import UserCard from '../UserCard'

const Followees = () => {
  const { auth } = useSelector((state) => state)
  const [followers, setFollowees] = useState([])
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const mountedRef = useRef(true)

  const getFollowees = useCallback(
    async () => {
      const res = await getDataAPI(
        dispatch,
        `users/${auth.user.userId}/followees`,
        auth.token
      )
      if (!mountedRef.current) return null
      console.log(res.data.data)
      setFollowees(res.data?.data.items)
      setLoading(() => false)
    },
    [dispatch, auth]
  )

  useEffect(() => {
    const fetchData = async () => {
      await getFollowees();
    };
    fetchData();
    return () => {
      mountedRef.current = false;
    };
  }, [getFollowees]);


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
              />
            ))
          }
        </div>
    </>
  )
}

export default Followees
