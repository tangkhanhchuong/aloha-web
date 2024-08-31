import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_APP_SERVER_URL,
});

const HttpMethods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE'
}

const makeRequest = async ({
    method = HttpMethods.GET,
    url,
    data = {},
    params = {},
    isRequiredAccessToken = false,
    isRequiredRefreshToken = false
}) => {
    if (!Object.values(HttpMethods).includes(method)) {
        throw new Error('Invalid HTTP method');
    }
    try {
        const headers = {
            'Content-Type': 'application/json'
        };
        if (isRequiredAccessToken) {
            headers['Authorization'] = `Bearer ${Cookies.get('accessToken')}`;
        }
        if (isRequiredRefreshToken) {
            headers['Authorization'] = `Bearer ${Cookies.get('refreshToken')}`;
        }
        const response = await axiosClient({
            url,
            data,
            params,
            headers,
            method
        });
        return response.data?.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || 'Internal Server Error');
    }
}

export const makeGetRequest = async ({
    url,
    params = {},
    isRequiredAccessToken = false,
    isRequiredRefreshToken = false
}) => {
    return makeRequest({
        url, params, method: HttpMethods.GET,
        isRequiredAccessToken, isRequiredRefreshToken
    });
}

export const makePostRequest = async ({
    url,
    data = {},
    params = {},
    isRequiredAccessToken = false,
    isRequiredRefreshToken = false
}) => {
    return makeRequest({
        url, params, method: HttpMethods.POST, data,
        isRequiredAccessToken, isRequiredRefreshToken
    });
}

export const makePutRequest = async ({
    url,
    data = {},
    params = {},
    isRequiredAccessToken = false,
    isRequiredRefreshToken = false
}) => {
    return makeRequest({
        url, params, method: HttpMethods.PUT, data,
        isRequiredAccessToken, isRequiredRefreshToken
    });
}

export const makeDeleteRequest = async ({
    url,
    params = {},
    isRequiredAccessToken = false,
    isRequiredRefreshToken = false
}) => {
    return makeRequest({
        url, params, method: HttpMethods.DELETE,
        isRequiredAccessToken, isRequiredRefreshToken
    });
}

export const makePatchRequest = async ({
    url,
    data = {},
    params = {},
    isRequiredAccessToken = false,
    isRequiredRefreshToken = false
}) => {
    return makeRequest({
        url, params, method: HttpMethods.PATCH, data,
        isRequiredAccessToken, isRequiredRefreshToken
    });
}