import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import Carousel from '../../Carousel'

const CardBody = ({ post }) => {
  const { userSettings } = useSelector((state) => state)
  const [readMore, setReadMore] = useState(false)

  console.log(userSettings.isDarkTheme)
  const createMarkedUp = () => {
    if (!post.content) return
    const formattedContent = post.content.replace('\n', '<br/>')
    return {
      __html: formattedContent.length < 200
      ? formattedContent
      : readMore
      ? formattedContent + ' '
      : formattedContent.slice(0, 200) + '.....'
    }
  }
  return (
    <div className='card_body'>
      <div
        className='card_body-content'
        style={{
          filter: userSettings.isDarkTheme ? 'invert(1)' : 'invert(0)',
          color: userSettings.isDarkTheme ? 'white' : '#111',
        }}
      >
        <span dangerouslySetInnerHTML={createMarkedUp()} />
        &nbsp;&nbsp;
        {post.content.length > 60 && (
          <span className='readMore' onClick={() => setReadMore(!readMore)}>
            {readMore ? 'Hide content' : 'Read more'}
          </span>
        )}
      </div>
      {post.images.length > 0 && (
        <Carousel images={post.images} id={post._id} />
      )}
    </div>
  )
}

export default CardBody
