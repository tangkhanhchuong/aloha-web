import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import { AVATAR_LG } from '../../../constants'
import { GLOBALTYPES } from '../../../redux/actions/globalTypes'
import { deletePost } from '../../../redux/actions/postAction'
import Avatar from '../../Avatar'

const CardHeader = ({ post }) => {
  const { auth, socket } = useSelector((state) => state)
  const dispatch = useDispatch()

  const history = useHistory()

  const handleEditPost = () => {
    dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } })
  }

  const handleDeletePost = () => {
    if (window.confirm('Are you sure want to delete this post?')) {
      dispatch(deletePost({ post, auth, socket }))
      return history.push('/')
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `${process.env.REACT_APP_WEB_URL}/posts/${post.id}`
    )
  }

  return (
    <div className='card_header'>
      <div className='d-flex'>
        <Avatar src={post.createdBy.avatar} size={AVATAR_LG} />
        &nbsp;&nbsp;
        <div className='card_name'>
          <h6 className='m-0'>
            <Link to={`/profile/${post.createdBy.userId}`} className='text-dark'>
              {post.createdBy.username}
            </Link>
          </h6>
          <small className='text-muted'>
            {moment(post.createdAt).fromNow()}
          </small>
        </div>
      </div>

      <div className='nav-item dropdown'>
        <span className='material-icons' id='moreLink' data-toggle='dropdown'>
          more_horiz
        </span>
        <div className='dropdown-menu'>
          {auth.user.id === post.createdBy.userId && (
            <>
              <div className='dropdown-item' onClick={handleEditPost}>
                <span className='material-icons'>create</span> Edit Post
              </div>
              <div className='dropdown-item' onClick={handleDeletePost}>
                <span className='material-icons'>delete_outline</span> Remove
                Post
              </div>
            </>
          )}
          <div className='dropdown-item' onClick={handleCopyLink}>
            <span className='material-icons'>content_copy</span> Copy Link
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardHeader
