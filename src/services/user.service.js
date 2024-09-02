import { makeGetRequest } from "./http/axios.client";

export const requestGetUserProfile = async ({ slug }) => {
    return makeGetRequest({
        url: `/users/${slug}`,
        isRequiredAccessToken: true
    });
}

export const requestGetUserTimeline = async ({ userId }) => {
    return makeGetRequest({
        url: `/users/${userId}/posts`,
        isRequiredAccessToken: true
    });
}