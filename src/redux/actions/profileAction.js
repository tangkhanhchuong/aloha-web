import { AUTH_TYPES } from './authAction'
import { GLOBALTYPES, deleteData } from './globalTypes'
import { getDataAPI, patchDataAPI } from '../../utils/fetchData'
import { imageUpload } from '../../utils/imageUpload'
import { mapMessages } from '../../utils/mapMessages'

export const PROFILE_TYPES = {
  LOADING_PROFILE: 'LOADING_PROFILE',
  GET_PROFILE_USER: 'GET_PROFILE_USER',
  FOLLOW: 'FOLLOW',
  UNFOLLOW: 'UNFOLLOW',
  GET_PROFILE_ID: 'GET_PROFILE_ID',
  UPDATE_PROFILE_POST: 'UPDATE_PROFILE_POST',
  LOAD_MORE_PROFILE_POSTS: 'LOAD_MORE_PROFILE_POSTS',
}

export const getProfileUsers = ({ id, auth }) =>
  async (dispatch) => {
    dispatch({ type: PROFILE_TYPES.GET_PROFILE_ID, payload: id })
    dispatch({ type: PROFILE_TYPES.LOADING_PROFILE, payload: true })
    const usersRes = await getDataAPI(dispatch, `/users/${id}`, auth.token)
    if (!usersRes) return

    dispatch({
      type: PROFILE_TYPES.GET_PROFILE_USER,
      payload: usersRes.data,
    })
    dispatch({ type: PROFILE_TYPES.LOADING_PROFILE, payload: false })
  }

export const updateProfileUser = ({ userData, avatar, auth }) =>
  async (dispatch) => {
    if (!userData.fullname) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: 'Please add your fullname.' },
      })
    }
    if (userData.fullname.length > 25) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: 'Your full name too long.' },
      })
    }
    if (userData.story.length > 200) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: 'Your story too long.' },
      })
    }

    try {
      let media
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
      if (avatar) {
        media = await imageUpload([avatar], auth.token)
      }
      const res = await patchDataAPI(dispatch, 
        'users',
        {
          ...userData,
          avatar: avatar ? media[0].key : null,
        },
        auth.token
      )

      const user = {
        ...auth.user,
        ...userData,
        avatar: avatar ? media[0].url : auth.user.avatar,
      }
      dispatch({
        type: AUTH_TYPES.AUTHENTICATED,
        payload: { ...auth, user },
      })
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: mapMessages(res.data.msg), loading: false }
      })
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: mapMessages(err.response.data.msg), loading: false },
      })
    }
  }

export const follow = ({ users, user, auth, socket }) =>
  async (dispatch) => {
    let updatedUser

    if (users.every((item) => item._id !== user._id)) {
      updatedUser = { ...user, following: [...user.following, auth.user] }
    } else {
      users.forEach((item) => {
        if (item._id === user._id) {
          updatedUser = { ...item, following: [...item.following, auth.user] }
        }
      })
    }

    const following = [...auth.user.following, updatedUser]
    dispatch({ type: PROFILE_TYPES.FOLLOW, payload: updatedUser })
    dispatch({
      type: AUTH_TYPES.AUTHENTICATED,
      payload: {
        ...auth,
        user: { ...auth.user, following },
      },
    })

    try {
      const res = await patchDataAPI(
        dispatch, 
        `users/${user._id}/follow`,
        null,
        auth.token
      )
      socket.emit('follow', res.data.user)
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: mapMessages(err.response.data.msg), loading: false },
      })
    }
  }

export const unfollow = ({ users, user, auth, socket }) =>
  async (dispatch) => {
    let updatedUser

    if (users.every((item) => item._id !== user._id)) {
      updatedUser = {
        ...user,
        following: deleteData(user.following, auth.user._id),
      }
    } else {
      users.forEach((item) => {
        if (item._id === user._id) {
          updatedUser = {
            ...item,
            following: deleteData(item.following, auth.user._id),
          }
        }
      })
    }

    const following = deleteData(auth.user.following, updatedUser._id)
    dispatch({ type: PROFILE_TYPES.UNFOLLOW, payload: updatedUser })
    dispatch({
      type: AUTH_TYPES.AUTHENTICATED,
      payload: {
        ...auth,
        user: { ...auth.user, following },
      },
    })

    try {
      const res = await patchDataAPI(
        dispatch,
        `users/${user._id}/unfollow`,
        null,
        auth.token
      )
      socket.emit('unFollow', res.data.user)
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: mapMessages(err.response.data.msg), loading: false },
      })
    }
  }