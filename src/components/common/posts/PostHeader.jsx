import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

import { requestDeletePost } from "../../../services/post.service";
import { formatPostDate } from "../../../utils/date";
import LoadingSpinner from "../LoadingSpinner";

export const PostHeader = ({ post }) => {
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
	const queryClient = useQueryClient();
	const postOwner = post.createdBy;
	const isMyPost = authUser.userId === post.createdBy.userId;
    const formattedDate = formatPostDate(post.createdAt);
    
	const { mutate: mutateDeletePost, isPending: isDeleting } = useMutation({
		mutationFn: async () => {
			try {
				const data = await requestDeletePost({ postId: post.postId })
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
		onSuccess: () => {
			toast.success("Post deleted successfully");
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
    });
    
	const handleDeletePost = () => {
		mutateDeletePost();
    };
    
    return (
        <div className='flex gap-2 items-center'>
            <Link to={`/profile/${postOwner.slug}`} className='font-bold'>
                {postOwner.fullName}
            </Link>
            <span className='text-gray-700 flex gap-1 text-sm'>
                <Link to={`/profile/${postOwner.slug}`}>@{postOwner.username}</Link>
                <span>·</span>
                <span>{formattedDate}</span>
            </span>
            {isMyPost && (
                <span className='flex justify-end flex-1'>
                    {!isDeleting && (
                        <FaTrash className='cursor-pointer hover:text-red-500' onClick={handleDeletePost} />
                    )}
                    {isDeleting && <LoadingSpinner size='sm' />}
                </span>
            )}
        </div>
    )
}