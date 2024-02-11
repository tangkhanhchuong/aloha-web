import Cookies from 'js-cookie'

import { GLOBALTYPES } from './globalTypes'
import { postDataAPI } from '../../utils/fetchData'
import valid from '../../utils/valid'
import { mapMessages } from '../../utils/mapMessages'

const TOKEN_LIFESPAN = 7 //days
export const AUTH_TYPES = {
  AUTH: 'AUTH',
  TOKEN_REFRESHING: 'TOKEN_REFRESHING',
}

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
    const res = await postDataAPI('auth/login', data)
    Cookies.set('access_token', res.data.access_token, {
      expires: TOKEN_LIFESPAN,
    })
    Cookies.set('refresh_token', res.data.refresh_token, {
      expires: TOKEN_LIFESPAN,
    })
    Cookies.set('user', JSON.stringify(res.data.user), {
      expires: TOKEN_LIFESPAN,
    })

    dispatch({
      type: AUTH_TYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    })
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: mapMessages(res.data.msg),
      },
    })
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: mapMessages(err.response.data.msg),
      },
    })
  }
}

export const initialize = () => async (dispatch) => {
  const localUserJson = Cookies.get('user')
  if (!localUserJson) {
    return
  }
  const localUser = JSON.parse(localUserJson)
  const accessToken = Cookies.get('access_token')
  dispatch({
    type: AUTH_TYPES.AUTH,
    payload: {
      token: accessToken,
      user: localUser,
    },
  })
}

export const refreshToken = () => async (dispatch) => {
  try {
    const refreshToken = Cookies.get('refresh_token')
    const res = await postDataAPI('auth/refresh-token', { refreshToken })
    Cookies.set('access_token', res.data.access_token, {
      expires: TOKEN_LIFESPAN,
    })
    dispatch({
      type: AUTH_TYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    })
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: mapMessages(err.response.data.msg),
      },
    })
  }
}

export const register = (data) => async (dispatch) => {
  const check = valid(data)
  if (check.errLength > 0)
    return dispatch({ type: GLOBALTYPES.ALERT, payload: check.errMsg })

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

    const res = await postDataAPI('auth/register', data)
    Cookies.set('access_token', res.data.access_token, {
      expires: TOKEN_LIFESPAN,
    })
    Cookies.set('refresh_token', res.data.refresh_token, {
      expires: TOKEN_LIFESPAN,
    })
    Cookies.set('user', JSON.stringify(res.data.user), {
      expires: TOKEN_LIFESPAN,
    })
    dispatch({
      type: AUTH_TYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    })
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: mapMessages(res.data.msg),
      },
    })
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: mapMessages(err.response.data.msg),
      },
    })
  }
}

export const logout = () => async (dispatch) => {
  try {
    await postDataAPI('auth/logout')
    Cookies.remove('access_token')
    Cookies.remove('refresh_token')
    Cookies.remove('user')
    window.location.href = '/'
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: mapMessages(err.response.data.msg),
      },
    })
  }
}
