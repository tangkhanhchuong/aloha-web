import axios from 'axios'

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    
})

export const getDataAPI = async (url, token) => {
    return axiosClient.get(`/api/${url}`, {
        headers: { Authorization: token}
    })
}

export const postDataAPI = async (url, data, token, isForm) => {
    const headers = { Authorization: token }
    if (isForm) {
        headers['Content-Type'] = 'multipart/form-data';
    }
    return axiosClient.post(`/api/${url}`, data, {
        headers
    })
}

export const putDataAPI = async (url, data, token) => {
    return axiosClient.put(`/api/${url}`, data, {
        headers: { Authorization: token}
    })
}

export const patchDataAPI = async (url, data, token) => {
    return axiosClient.patch(`/api/${url}`, data, {
        headers: { Authorization: token}
    })
}

export const deleteDataAPI = async (url, token) => {
    return axiosClient.delete(`/api/${url}`, {
        headers: { Authorization: token}
    })
}