import React from 'react'

import { ITEMS_PER_PAGE } from '../constants'

const LoadMoreBtn = ({ count, page, loading, handleLoadMore }) => {
  return (
    <div className='my-2'>
      {
        count < ITEMS_PER_PAGE * (page - 1)
          ? <></>
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
