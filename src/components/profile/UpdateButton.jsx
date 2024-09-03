import useUpdateUserProfile from "../../hooks/useUpdateUserProfile";

export const UpdateButton = ({ avatarImg, coverImg, setAvatarImg, setCoverImg }) => {
    const { isUpdatingProfile, mutateUpdateProfile } = useUpdateUserProfile();
    
    return (
        <button
            className='btn btn-outline rounded-full btn-sm px-4 ml-2'
            onClick={async () => {
                await mutateUpdateProfile({ coverImg, avatarImg });
                setAvatarImg(null);
                setCoverImg(null);
            }}
        >
            {isUpdatingProfile ? "Updating..." : "Update"}
        </button>
    )
}