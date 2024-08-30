import axios from 'axios'
import HttpStatusCodes from 'http-status-codes'

import { autoLogin } from '../redux/actions/authAction'

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
})

export const getDataAPI = async (dispatch, url, token) => {
  try {
    return await axiosClient.get(url, {
      headers: { Authorization: 'Bearer ' + token },
    })
  } catch (err) {
    if (!dispatch)  return
    if (err.response.status === HttpStatusCodes.UNAUTHORIZED) {
      return dispatch(autoLogin())
    }
    throw err
  }
}

export const postDataAPI = async (dispatch, url, data, token) => {
  try {
    const response = await axiosClient.post(url, data, {
      headers: { Authorization: 'Bearer ' + token },
    })
    return response?.data;
  } catch (err) {
    if (!dispatch) return
    if (
      err.response.status === HttpStatusCodes.UNAUTHORIZED
      && err.response?.data.message !== 'INVALID_EMAIL_OR_PASSWORD'
    ) {
      return dispatch(autoLogin())
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
    if (err.response.status === HttpStatusCodes.UNAUTHORIZED) {
      return dispatch(autoLogin())
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
    if (err.response.status === HttpStatusCodes.UNAUTHORIZED) {
      return dispatch(autoLogin())
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
    if (err.response.status === HttpStatusCodes.UNAUTHORIZED) {
      return dispatch(autoLogin())
    }
    throw err
  }
}
