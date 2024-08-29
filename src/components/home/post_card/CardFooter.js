import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import Send from '../../../images/send.svg'
import {
  likePost,
  savePost,
  unlikePost,
  unsavePost,
} from '../../../redux/actions/postAction'
import LikeButton from '../../LikeButton'
import ShareModal from '../../ShareModal'

const CardFooter = ({ post }) => {
  const { auth, theme, socket } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [isLike, setIsLike] = useState(post?.isReacted || false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [isSaved, setIsSaved] = useState(post?.isBookmarked || false)

  const handleLike = async () => {
    if (isLoading) return

    setIsLoading(true)
    await dispatch(likePost({ post, auth, socket }))
    setIsLike(true)
    setIsLoading(false)
  }

  const handleUnLike = async () => {
    if (isLoading) return

    setIsLoading(true)
    await dispatch(unlikePost({ post, auth, socket }))
    setIsLike(false)
    setIsLoading(false)
  }
  const handleSavePost = async () => {
    if (isLoading) return

    setIsLoading(true)
    await dispatch(savePost({ post, auth }))
    setIsSaved(true)
    setIsLoading(false)
  }

  const handleUnSavePost = async () => {
    if (isLoading) return

    setIsLoading(true)
    await dispatch(unsavePost({ post, auth }))
    setIsSaved(false)
    setIsLoading(false)
  }

  return (
    <div className='card_footer'>
      <div className='card_figures'>
        <h6 style={{ cursor: 'pointer' }}>
          {post.numberOfReactions} likes
        </h6>
        <h6 style={{ cursor: 'pointer' }}>
          {post.numberOfComments} comments
        </h6>
      </div>
      <div className='card_icon_menu'>
        <div>
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
          <Link to={`/posts/${post.postId}`} className='text-dark'>
            <i className='far fa-comment' />
          </Link>
          <img src={Send} alt='Send' onClick={() => setIsSharing(!isSharing)} />
        </div>
        {
          isSaved ? (
            <i className='fas fa-bookmark text-info' onClick={handleUnSavePost} />
          ) : (
            <i className='far fa-bookmark' onClick={handleSavePost} />
          )
        }
      </div>
      {
        isSharing && (
          <ShareModal
            url={`${process.env.REACT_APP_WEB_URL}/posts/${post.postId}`}
            theme={theme}
          />
        )
      }
    </div>
  )
}

export default CardFooter
