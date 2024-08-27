import React from 'react'
import { useSelector } from 'react-redux'

import LoadIcon from '../../images/loading.gif'
import LoadMoreBtn from '../LoadMoreBtn'
import PostCard from '../PostCard'

const Posts = ({ loading, posts, count, page, handleLoadMore }) => {
  const { theme } = useSelector((state) => state)

  return (
    <div className='posts'>
      {
        posts.map((post) => (
          <PostCard key={post.postId} post={post} theme={theme} />
        ))
      }
      {
        loading && <img src={LoadIcon} alt='loading' className='d-block mx-auto' />
      }
      <LoadMoreBtn
        count={count}
        page={page}
        loading={loading}
        handleLoadMore={handleLoadMore}
      />
    </div>
  )
}

export default Posts
