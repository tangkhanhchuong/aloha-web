import axios from "axios";

import { isValidUrl } from "../utils/string";
import { makePostRequest } from "./http/axios.client";

export const requestGenerateUploadUrl = async ({ fileNames, mineType="images/png" }) => {
    return makePostRequest({
        url: `/media/signed-urls`,
        data: {
            fileNames, mineType
        },
        isRequiredAccessToken: true
    });
}

export const uploadToBucket = async ({ uploadUrl, media }) => {
    if (!isValidUrl(uploadUrl)) {
        throw new Error("Invalid upload URL");
    }
    
    await axios.put(
        uploadUrl,
        media
    );
}