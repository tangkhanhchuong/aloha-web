import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import LoadIcon from '../../images/loading.gif'
import { getDataAPI } from '../../utils/fetchData'
import UserCard from '../UserCard'
import { mapMessages } from '../../utils/mapMessages'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

const Search = () => {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])
  const [load, setLoad] = useState(false)
  const { auth } = useSelector((state) => state)
  const dispatch = useDispatch()

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!search) return

    try {
      setLoad(true)
      const res = await getDataAPI(
        dispatch,
        `users/search?username=${search}`,
        auth.token
      )
      setUsers(res.data.users)
      setLoad(false)
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: mapMessages(err.response.data.msg) },
      })
    }
  }

  const handleClose = () => {
    setSearch('')
    setUsers([])
  }

  return (
    <form className='search_form' onSubmit={handleSearch}>
      <input
        type='text'
        value={search}
        title='Enter to Search'
        onChange={(e) =>
          setSearch(e.target.value.toLowerCase().replace(/ /g, ''))
        }
        placeholder='Search Konoha'
      />

      <div
        className='close_search'
        onClick={handleClose}
        style={{ opacity: users.length === 0 ? 0 : 1 }}
      >
        &times;
      </div>

      <button type='submit' style={{ display: 'none' }}>
        Search
      </button>
      {load && <img className='loading' src={LoadIcon} alt='loading' />}
      <div className='users'>
        {search &&
          users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              border='border'
              handleClose={handleClose}
            />
          ))}
      </div>
    </form>
  )
}

export default Search
