import { getDataAPI, patchDataAPI, postDataAPI } from '../../utils/fetchData'
import { imageUpload } from '../../utils/imageUpload'
import { mapMessages } from '../../utils/mapMessages'
import { AUTH_TYPES } from './authAction'
import { GLOBALTYPES } from './globalTypes'

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
      payload: usersRes.data?.data,
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

export const follow = ({ user, auth, socket }) =>
  async (dispatch) => {
    try {
      await postDataAPI(
        dispatch, 
        `users/${user.userId}/follow`,
        null,
        auth.token
      )
      // socket.emit('follow', res.data.user)
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: mapMessages(err.response.data.msg), loading: false },
      })
    }
  }

export const unfollow = ({ user, auth, socket }) =>
  async (dispatch) => {
    try {
      await postDataAPI(
        dispatch,
        `users/${user.userId}/unfollow`,
        null,
        auth.token
      )
      // socket.emit('unFollow', res.data.user)
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: mapMessages(err.response.data.msg), loading: false },
      })
    }
  }