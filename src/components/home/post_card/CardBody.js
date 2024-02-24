import React, { useState } from 'react'

import Carousel from '../../Carousel'

const CardBody = ({ post, theme }) => {
  const [readMore, setReadMore] = useState(false)

  const createMarkedUp = () => {
    if (!post.content) return
    const formattedContent = `<p>${post.content.replaceAll('\n', '</p><p>')}</p>`
    return {
      __html: formattedContent
    }
  }
  return (
    <div className='card_body'>
      <div
        className={`card_body-content ${!readMore ? `read-more-text` : ''}`}
        style={{
          filter: theme ? 'invert(1)' : 'invert(0)',
          color: theme ? 'white' : '#111',
        }}
      >
        <p dangerouslySetInnerHTML={createMarkedUp()} />
      </div>
        {post.content.length > 60 && (
          <span className='read-more' onClick={() => setReadMore(!readMore)}>
            {readMore ? 'Hide content' : 'Read more'}
          </span>
        )}
      {post.images.length > 0 && (
        <Carousel images={post.images} id={post._id} />
      )}
    </div>
  )
}

export default CardBody
