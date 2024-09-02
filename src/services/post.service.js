import {
    makeGetRequest,
    makePostRequest
} from "./http/axios.client";

export const requestGetPost = async ({ userId }) => {
    return makeGetRequest({
        url: `/users/${userId}/posts`,
        isRequiredAccessToken: true
    });
}

export const requestCreatePost = async ({ content, media }) => {
    return makePostRequest({
        url: `/posts`,
        data: {
            content,
            media
        },
        isRequiredAccessToken: true
    });
}