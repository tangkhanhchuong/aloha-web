import React, { useState, useEffect } from 'react'

import Avatar from '../Avatar'
import { AVATAR_XL } from '../../constants'
import EditProfile from './EditProfile'
import FollowBtn from '../FollowBtn'
import Followers from './Followers'
import Following from './Following'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

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

const ProfileInfo = ({ id, auth, profile, dispatch }) => {
  const [userData, setUserData] = useState([])
  const [onEdit, setOnEdit] = useState(false)

  const [showFollowers, setShowFollowers] = useState(false)
  const [showFollowing, setShowFollowing] = useState(false)

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user])
    } else {
      const newData = profile.users.filter((user) => user._id === id)
      setUserData(newData)
    }
  }, [id, auth, dispatch, profile.users])

  useEffect(() => {
    if (showFollowers || showFollowing || onEdit) {
      dispatch({ type: GLOBALTYPES.MODAL, payload: true })
    } else {
      dispatch({ type: GLOBALTYPES.MODAL, payload: false })
    }
  }, [showFollowers, showFollowing, onEdit, dispatch])

  return (
      <div className='info'>
        {
          userData.map((user) => (
            <div className='info_container' key={user._id}>
              <Avatar src={user.avatar} size={AVATAR_XL} />
              <div className='info_content'>
                <div className='row'>
                  <div className='col'>
                    <h2 style={{color: 'black'}}><b>{user.username}</b></h2>
                    <h5 style={{color: 'gray'}}>{user.fullname}</h5>
                  </div>
                  <div className='col'>
                    {
                      user._id === auth.user._id ? (
                        <EditProfileButton setOnEdit={setOnEdit} />
                      ) : (
                        <FollowBtn user={user} style={{ width: '100%' }} />
                      )
                    }
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <h6 className='my-1'>Live in <b>{user.address}</b></h6>
                    <h6 className='my-1'>Mobile: {user.mobile}</h6>
                  </div>
                  <div className='col'>
                    <h6 className='my-1'>Email: {user.email}</h6>
                    <h6 className='my-1'>
                      Website: <a href={user.website} target='_blank' rel='noreferrer'>
                        {user.website}
                      </a>
                    </h6>
                  </div>
                </div>
                <p>{user.story}</p>

                <h6 className='follow_btn'>
                  <span className='mr-4' onClick={() => setShowFollowers(true)}>
                    {user.followers.length} Followers
                  </span>
                  <span className='ml-4' onClick={() => setShowFollowing(true)}>
                    {user.following.length} Following
                  </span>
                </h6>
              </div>
              {onEdit && <EditProfile setOnEdit={setOnEdit} />}
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
          ))
        }
      </div>
  )
}

export default ProfileInfo
