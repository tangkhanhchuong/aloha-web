import { AVATAR_LG } from '../constants'
import Avatar from './Avatar'

const UserCard = ({
  children,
  user,
}) => {
  const redirectToUserProfile = (userId) => {
    window.location = `#/profile/${userId}`
  }

  return (
    <div
      className={`d-flex p-2 align-items-center justify-content-between w-100`}
    >
      <div>
        <div className='d-flex align-items-center' onClick={() => redirectToUserProfile(user.userId)}>
          <div>
            <Avatar src={user.avatar} size={AVATAR_LG} />
          </div>
          <div className='mx-3'>
            <div>
              <span className='user-card-fullname'>{user.fullname}&nbsp;&nbsp;</span>
              <span className='user-card-username'>@{user.username}</span>
            </div>
            <span><i>{user.bio}</i></span>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}

export default UserCard
