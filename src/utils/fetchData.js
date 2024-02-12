import axios from 'axios'

import { refreshToken } from '../redux/actions/authAction'
import { GLOBALTYPES } from '../redux/actions/globalTypes'
import { mapMessages } from './mapMessages'

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL + '/api/v1',
})

export const getDataAPI = async (dispatch, url, token) => {
  try {
    return await axiosClient.get(url, {
      headers: { Authorization: token },
    })
  } catch (err) {
    if (!dispatch)  return
    if (err.response.status === 401) {
      return dispatch(refreshToken(getDataAPI))
    }
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: mapMessages(err.response.data.msg) },
    })
  }
}

export const postDataAPI = async (dispatch, url, data, token) => {
  try {
    return await axiosClient.post(url, data, {
      headers: { Authorization: token },
    })
  } catch (err) {
    if (!dispatch)  return
    if (err.response.status === 401) {
      return dispatch(refreshToken(getDataAPI))
    }
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: mapMessages(err.response.data.msg) },
    })
  }
}

export const putDataAPI = async (dispatch, url, data, token) => {
  try {
    return axiosClient.put(url, data, {
      headers: { Authorization: token },
    })
  } catch (err) {
    if (!dispatch)  return
    if (err.response.status === 401) {
      return dispatch(refreshToken(getDataAPI))
    }
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: mapMessages(err.response.data.msg) },
    })
  }
}

export const patchDataAPI = async (dispatch, url, data, token) => {
  try {
    return await axiosClient.patch(url, data, {
      headers: { Authorization: token },
    })
  } catch (err) {
    if (!dispatch)  return
    if (err.response.status === 401) {
      return dispatch(refreshToken(getDataAPI))
    }
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: mapMessages(err.response.data.msg) },
    })
  }
}

export const deleteDataAPI = async (dispatch, url, token) => {
  try {
    return await axiosClient.delete(url, {
      headers: { Authorization: token },
    })
  } catch (err) {
    if (!dispatch)  return
    if (err.response.status === 401) {
      return dispatch(refreshToken(getDataAPI))
    }
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: mapMessages(err.response.data.msg) },
    })
  }
}
