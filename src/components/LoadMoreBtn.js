import React from 'react'

const LoadMoreBtn = ({ count, page, loading, handleLoadMore }) => {
  return (
    <>
      {count < 9 * (page - 1)
        ? ''
        : !loading && (
            <button
              className='btn btn-dark mx-auto d-block'
              onClick={handleLoadMore}
            >
              Load more
            </button>
          )}
    </>
  )
}

export default LoadMoreBtn
