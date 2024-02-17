import axios from 'axios'

import { refreshToken } from '../redux/actions/authAction'

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
      return dispatch(refreshToken())
    }
    throw err
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
      return dispatch(refreshToken())
    }
    throw err
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
      return dispatch(refreshToken())
    }
    throw err
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
      return dispatch(refreshToken())
    }
    throw err
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
      return dispatch(refreshToken())
    }
    throw err
  }
}
