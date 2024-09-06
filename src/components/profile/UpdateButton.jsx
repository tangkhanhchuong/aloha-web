import { useState } from "react";

import useUpdateUserProfile from "../../hooks/useUpdateUserProfile";
import { requestGenerateUploadUrl, uploadToBucket } from "../../services/media.service";

export const UpdateButton = ({
    userId,
    avatarPath,
    coverPath,
    avatarFile,
    coverFile,
}) => { 
    const [isLoading, setIsLoading] = useState(false);
    const { isUpdatingProfile, mutateUpdateProfile } = useUpdateUserProfile();
    
    const handleUpdateUserImage = async () => {
        setIsLoading(true);
        let coverKey = null, avatarKey = null;
        const updateFields = {};

        const avatarUpdated = avatarPath?.includes("data:image");
        if (avatarUpdated) {
            const signedResponse = await requestGenerateUploadUrl({
                fileNames: [`avatar-${userId}`],
                mineType: "images/png",
            });
            const { key, url } = signedResponse.files[0];
            avatarKey = key;
            await uploadToBucket({ uploadUrl: url, media: avatarFile });
            updateFields['avatar'] = avatarKey;
        }

        const coverUpdated = coverPath?.includes("data:image");
        if (coverUpdated) {
            const signedResponse = await requestGenerateUploadUrl({
                fileNames: [`cover-${userId}`],
                mineType: "images/png",
            });
            const { key, url } = signedResponse.files[0];
            coverKey = key;
            await uploadToBucket({ uploadUrl: url, media: coverFile });
            updateFields['cover'] = coverKey;
        }

        await mutateUpdateProfile(updateFields);
        setIsLoading(false);
    }

    return (
        <button
            className='btn btn-outline rounded-full btn-sm px-4 ml-2'
            onClick={handleUpdateUserImage}
        >
            {(isUpdatingProfile || isLoading) ? "Updating..." : "Update"}
        </button>
    );
}