import axios from 'axios'

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL + '/api/v1',
})

export const getDataAPI = async (url, token) => {
	return axiosClient.get(url, {
		headers: { Authorization: token }
	})
}

export const postDataAPI = async (url, data, token) => {
	return axiosClient.post(url, data, {
		headers: { Authorization: token }
	})
}

export const putDataAPI = async (url, data, token) => {
	return axiosClient.put(url, data, {
		headers: { Authorization: token }
	})
}

export const patchDataAPI = async (url, data, token) => {
	return axiosClient.patch(url, data, {
		headers: { Authorization: token }
	})
}

export const deleteDataAPI = async (url, token) => {
	return axiosClient.delete(url, {
		headers: { Authorization: token }
	})
}