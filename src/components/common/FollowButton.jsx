import { useQuery } from "@tanstack/react-query";

import useFollow from "../../hooks/useFollow";

export const FollowButton = ({ user }) => {
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
    const { mutateFollow, isFollowing } = useFollow();

	const amIFollowing = (authUser?.following || []).includes(user?.userId);
    
    return (
        <button
            className='btn btn-outline rounded-full btn-sm'
            onClick={() => mutateFollow(user?.userId)}
        >
            {isFollowing && "Loading..."}
            {!isFollowing && amIFollowing && "Unfollow"}
            {!isFollowing && !amIFollowing && "Follow"}
        </button>
    );
}