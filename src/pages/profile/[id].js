import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import ProfileInfo from '../../components/profile/ProfileInfo'
import MyPosts from '../../components/profile/MyPosts'
import SavedPosts from '../../components/profile/SavedPosts'
import LoadIcon from '../../images/loading.gif'
import { getProfileUsers } from '../../redux/actions/profileAction'

const Profile = () => {
  const { profile, auth } = useSelector((state) => state)
  const dispatch = useDispatch()

  const { id } = useParams()
  const [saveTab, setSaveTab] = useState(false)

  useEffect(() => {
    if (profile.ids.every((item) => item !== id)) {
      dispatch(getProfileUsers({ id, auth }))
    }
  }, [id, auth, dispatch, profile.ids])

  return (
    <div className='profile'>
      <div className='card-body my-3'>
        <ProfileInfo auth={auth} profile={profile} dispatch={dispatch} id={id} />
      </div>
      {
        auth.user._id === id && (
          <div className='profile_tab'>
            <button
              className={saveTab ? '' : 'active'}
              onClick={() => setSaveTab(false)}
            >
              Posts
            </button>
            <button
              className={saveTab ? 'active' : ''}
              onClick={() => setSaveTab(true)}
            >
              Saved
            </button>
          </div>
        )
      }
      {profile.loading ? (
        <img className='d-block mx-auto' src={LoadIcon} alt='loading' />
      ) : (
        <>
          {
            saveTab ? (
              <SavedPosts auth={auth} dispatch={dispatch} />
            ) : (
              <MyPosts auth={auth} profile={profile} dispatch={dispatch} id={id} />
            )
          }
        </>
      )}
    </div>
  )
}

export default Profile
