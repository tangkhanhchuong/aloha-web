import { makeGetRequest, makePatchRequest } from "./http/axios.client";

export const requestGetUserProfile = async ({ slug }) => {
    return makeGetRequest({
        url: `/users/${slug}`,
        isRequiredAccessToken: true
    });
}

export const requestUpdateUser = async ({
    fullname,
    bio,
    location,
    website,
    mobile,
    gender,
    birthday,
    avatar,
    cover
}) => {
    return makePatchRequest({
        url: `/me/profile`,
        data: {
            fullname,
            bio,
            location,
            website,
            mobile,
            gender,
            birthday,
            avatar,
            cover
        },
        isRequiredAccessToken: true
    });
}

export const requestGetUserTimeline = async ({ userId }) => {
    return makeGetRequest({
        url: `/users/${userId}/posts`,
        isRequiredAccessToken: true
    });
}