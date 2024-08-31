import Cookies from 'js-cookie';

import {
    makeDeleteRequest,
    makeGetRequest,
    makePostRequest
} from './http/axios.client';

export const requestLogin = async ({ email, password }) => {
    const data = await makePostRequest({
        url: '/auth/login',
        data: { email, password },
    });
    Cookies.set('accessToken', data.accessToken);
    Cookies.set('refreshToken', data.refreshToken);
    return data;
}

export const requestRegister = async ({ email, username, password }) => {
    return makePostRequest({
        url: '/auth/register',
        data: { email, password, username },
    });
}

export const requestAuthUser = async () => {
    return makeGetRequest({
        url: '/auth/me',
        isRequiredAccessToken: true
    });
}

export const requestLogout = async () => {
    await makeDeleteRequest({
        url: '/auth/logout',
        isRequiredAccessToken: true
    });
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
}