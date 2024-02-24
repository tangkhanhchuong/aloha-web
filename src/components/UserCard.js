import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Avatar from './Avatar'
import { AVATAR_LG } from '../constants'

const UserCard = ({
  children,
  user,
  border,
  handleClose,
  setShowFollowers,
  setShowFollowing,
  msg,
}) => {
  const { theme } = useSelector((state) => state)

  const handleCloseAll = () => {
    if (handleClose) handleClose()
    if (setShowFollowers) setShowFollowers(false)
    if (setShowFollowing) setShowFollowing(false)
  }

  const showMessage = (user) => {
    return (
      <>
        <div style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}>
          {user.text}
        </div>
        {
          user.media?.length > 0 && (
            <div>
              An image was sent
            </div>
          )
        }
        {
          user.call && (
            <span className='material-icons'>
              {
                user.call.times === 0
                  ? user.call.video
                    ? 'videocam_off'
                    : 'phone_disabled'
                  : user.call.video
                  ? 'video_camera_front'
                  : 'call'
              }
            </span>
          )
        }
      </>
    )
  }

  return (
    <div
      className={`d-flex p-2 align-items-center justify-content-between w-100 ${border}`}
    >
      <div>
        <Link
          to={`/profile/${user._id}`}
          onClick={handleCloseAll}
          className='d-flex align-items-center'
        >
          <Avatar src={user.avatar} size={AVATAR_LG} />

          <div className='ml-1' style={{ transform: 'translateY(-2px)' }}>
            <span className='d-block'>{user.username}</span>
            <small style={{ opacity: 0.7 }}>
              {msg ? showMessage(user) : user.fullname}
            </small>
          </div>
        </Link>
      </div>
      {children}
    </div>
  )
}

export default UserCard
