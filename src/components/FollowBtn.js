import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { follow, unfollow } from '../redux/actions/profileAction'

const FollowBtn = ({ user, style }) => {
  const { auth, profile, socket } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [isFollowed, setIsFollowed] = useState(user.isFollowed)
  const [load, setLoad] = useState(false)

  const handleFollow = async () => {
    if (load) return

    setIsFollowed(true)
    setLoad(true)
    await dispatch(follow({ users: profile.users, user, auth, socket }))
    setLoad(false)
  }

  const handleUnfollow = async () => {
    if (load) return

    setIsFollowed(false)
    setLoad(true)
    await dispatch(unfollow({ users: profile.users, user, auth, socket }))
    setLoad(false)
  }

  return (
    <>
      {isFollowed ? (
        <button
          className='btn btn-outline-danger'
          onClick={handleUnfollow}
          style={style}
        >
          Unfollow
        </button>
      ) : (
        <button
          className='btn btn-outline-info'
          onClick={handleFollow}
          style={style}
        >
          Follow
        </button>
      )}
    </>
  )
}

export default FollowBtn
