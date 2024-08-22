import Cookies from 'js-cookie'

import { getDataAPI, postDataAPI } from '../../utils/fetchData'
import { mapMessages } from '../../utils/mapMessages'
import valid from '../../utils/valid'
import { GLOBALTYPES } from './globalTypes'

const TOKEN_LIFESPAN = 7 //days
export const AUTH_TYPES = {
  AUTHENTICATED: 'AUTHENTICATED',
}

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
    
    const res = await postDataAPI(dispatch, 'auth/login', data)
    
    const { accessToken, refreshToken } = res.data

    Cookies.set('accessToken', accessToken)
    Cookies.set('refreshToken', refreshToken)

    const userRes = await getDataAPI(dispatch, `/me`, accessToken)
    const userData = userRes.data.data

    dispatch({
      type: AUTH_TYPES.AUTHENTICATED,
      payload: {
        token: accessToken,
        user: userData,
      },
    })
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: mapMessages(res.data.msg),
        loading: false
      },
    })
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: mapMessages(err.response.data.msg),
        loading: false
      },
    })
  }
}

export const initialize = () => async (dispatch) => {
  const accessToken = Cookies.get('accessToken')
  if (!accessToken) {
    return
  }

  const userRes = await getDataAPI(dispatch, `/me`, accessToken)
  const userData = userRes.data.data
  if (!userData?.userId) {
    return
  }
  Cookies.set('user', JSON.stringify(userData))
  const userProfile = await getDataAPI(dispatch, `users/${userData?.userId}`, accessToken)
  dispatch({
    type: AUTH_TYPES.AUTHENTICATED,
    payload: {
      token: accessToken,
      user: userProfile.data.data,
    }
  })
}

export const autoLogin = () => async (dispatch, getState) => {
  try {
    const alertState = getState().alert
    if (!!alertState.loading) return

    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
    const refreshToken = Cookies.get('refreshToken')
    const res = await postDataAPI(dispatch, 'auth/auto-login', { refreshToken })
    
    const { accessToken } = res.data
    const userRes = await getDataAPI(dispatch, `/me`, accessToken)
    const userData = userRes.data.data
    dispatch({
      type: AUTH_TYPES.AUTHENTICATED,
      payload: {
        token: accessToken,
        user: userData,
      },
    })
    Cookies.set('accessToken', accessToken, {
      expires: TOKEN_LIFESPAN,
    })
    Cookies.set('user', userData, {
      expires: TOKEN_LIFESPAN,
    })  
    window.location.reload()
  } catch (err) {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    Cookies.remove('user')
    window.location.href = '/'
  }
}

export const register = (data) => async (dispatch) => {
  const check = valid(data)
  if (check.errLength > 0)
    return dispatch({ type: GLOBALTYPES.ALERT, payload: check.errMsg })

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

    const res = await postDataAPI(dispatch, 'auth/register', data)
    Cookies.set('accessToken', res.data.accessToken)
    Cookies.set('refreshToken', res.data.refreshToken)
    dispatch({
      type: AUTH_TYPES.AUTHENTICATED,
      payload: {
        token: res.data.accessToken,
        user: res.data.user,
      },
    })
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: mapMessages(res.data.msg),
        loading: false
      },
    })
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: mapMessages(err.response.data.msg),
        loading: false
      },
    })
  }
}

export const logout = (accessToken) => async (dispatch) => {
  try {
    await postDataAPI(dispatch, 'auth/logout', null, accessToken)
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    Cookies.remove('user')
    window.location.href = '/'
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: mapMessages(err.response.data.msg),
        loading: false
      },
    })
  }
}
