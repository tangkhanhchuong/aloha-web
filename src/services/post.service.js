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

export const requestCreatePostComment = async ({ postId, content }) => {
    return makePostRequest({
        url: `/posts/${postId}/comments`,
        data: {
            content,
            type: 'TEXT'
        },
        isRequiredAccessToken: true
    });
}

export const requestLikePost = async ({ postId, reaction }) => {
    return makePostRequest({
        url: `/posts/${postId}/reactions`,
        data: {
            reaction
        },
        isRequiredAccessToken: true
    });
}