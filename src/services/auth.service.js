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
    return data;
}

export const requestRegister = async ({ email, username, password }) => {
    return makePostRequest({
        url: '/auth/register',
        data: { email, password, username },
    });
}

export const requestGetAuthUser = async () => {
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
}