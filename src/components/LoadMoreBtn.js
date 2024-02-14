import React from 'react'

const LoadMoreBtn = ({ count, page, loading, handleLoadMore }) => {
  console.log(count, page)
  return (
    <div className='my-3'>
      {
        count < 9 * (page - 1)
          ? ''
          : !loading && (
            <button
              className='btn btn-dark mx-auto d-block'
              onClick={handleLoadMore}
            >
              Load more
            </button>
          )
      }
    </div>
  )
}

export default LoadMoreBtn
