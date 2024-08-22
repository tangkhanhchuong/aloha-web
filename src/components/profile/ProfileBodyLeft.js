import {
    AimOutlined,
    ClockCircleOutlined,
    LinkOutlined
} from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
  
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import FollowBtn from '../FollowBtn'
import EditProfile from './EditProfile'
import Followers from './Followers'
import Following from './Following'

const EditProfileButton = ({ setOnEdit }) => {
  return (
    <button
      className='btn btn-outline-info'
      onClick={() => setOnEdit(true)}
      style={{ width: '100%' }}
    >
      Edit Profile
    </button>
  )
}

const ProfileBodyLeft = ({ user, auth, dispatch }) => {
  const [onEdit, setOnEdit] = useState(false)

  const [showFollowers, setShowFollowers] = useState(false)
  const [showFollowing, setShowFollowing] = useState(false)

  useEffect(() => {
    if (showFollowers || showFollowing || onEdit) {
      dispatch({ type: GLOBALTYPES.MODAL, payload: true })
    } else {
      dispatch({ type: GLOBALTYPES.MODAL, payload: false })
    }
  }, [showFollowers, showFollowing, onEdit, dispatch])

  return (
    <div>
      <h2 style={{ color: 'black' }}><b>{user.fullname}</b></h2>
      <h5 style={{ color: 'gray' }}>@{user.username}</h5>
      <p>{user.bio}</p>
      <br />
      <h6 className='mb-3'>
          <AimOutlined />&nbsp; {user.location}
      </h6>
      <h6 className='my-3'>
          <ClockCircleOutlined />&nbsp; {user.joinedAt}</h6>
      <h6 className='my-3'>
          <LinkOutlined />&nbsp; <a href={user.website} target='_blank' rel='noreferrer'>
          {user.website}
          </a>
      </h6>

      <h6 className='follow_btn'>
      {/* <span className='mr-4' onClick={() => setShowFollowers(true)}>
          {user.numberOfFollowers} Followers
      </span>
      <span className='ml-4' onClick={() => setShowFollowing(true)}>
          {user.numberOfFollowers} Following
      </span> */}
      </h6>
      {onEdit && <EditProfile setOnEdit={setOnEdit} />}
      <br />
      {
          user.userId === auth.user.userId ? (
            <EditProfileButton setOnEdit={setOnEdit} />
          ) : (
            <FollowBtn user={user} style={{ width: '100%' }} />
          )
      }
      {
          showFollowers && (
          <Followers
              users={user.followers}
              setShowFollowers={setShowFollowers}
          />
          )
      }
      {
          showFollowing && (
          <Following
              users={user.following}
              setShowFollowing={setShowFollowing}
          />
          )
      } 
  </div>
  )
}

export default ProfileBodyLeft
