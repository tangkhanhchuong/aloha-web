import React from 'react'

import { AVATAR_XL } from '../../constants'
import Avatar from '../Avatar'


const ProfileCover = ({ user }) => {
  return (
    <div
      className='card-body cover_container my-2'
      key={user.userId}
      style={{ backgroundImage: `url(${user.cover})`}}
    >
      <Avatar
        src={user.avatar}
        size={AVATAR_XL}
      />
    </div>
  )
}

export default ProfileCover
