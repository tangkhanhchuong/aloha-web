import React from 'react'
import { useSelector } from 'react-redux'

import PostCard from '../PostCard'
import LoadIcon from '../../images/loading.gif'
import LoadMoreBtn from '../LoadMoreBtn'

const Posts = ({ loading, posts, count, page, handleLoadMore }) => {
  const { theme } = useSelector((state) => state)

  return (
    <div className='posts'>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} theme={theme} />
      ))}
      {loading && <img src={LoadIcon} alt='loading' className='d-block mx-auto' />}
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
