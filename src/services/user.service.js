import { makeGetRequest } from "./http/axios.client";

export const requestUserProfile = async ({ slug }) => {
    return makeGetRequest({
        url: `/users/${slug}`,
        isRequiredAccessToken: true
    });
}