import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import ProfileBodyLeft from '../../components/profile/ProfileBodyLeft'
import ProfileBodyRight from '../../components/profile/ProfileBodyRight'
import ProfileCover from '../../components/profile/ProfileCover'
import { getProfileUsers } from '../../redux/actions/profileAction'

const Profile = () => {
  const { profile, auth } = useSelector((state) => state)
  const dispatch = useDispatch()

  const { id } = useParams()
  const [user, setUser] = useState()

  useEffect(() => {
    if (profile.ids.every((item) => item !== id)) {
      dispatch(getProfileUsers({ id, auth }))
    }
  }, [id, auth, dispatch, profile.ids])

  useEffect(() => {
    setUser(profile.users.filter((user) => user.userId === id)[0])
  }, [profile.users, id])

  if (!user) {
    return <></>
  }

  return (
    <div className='profile_container'>
      <div><ProfileCover user={user} /></div>
      <div className='profile_body'>
        <div className='card-body profile_body_left'>
          <ProfileBodyLeft
            auth={auth}
            user={user}
            dispatch={dispatch}
          />
        </div>
        <div className='profile_body_right'>
          <ProfileBodyRight />
        </div>
      </div>
    </div>
  )
}

export default Profile
