import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { requestCreatePostComment, requestGetPostComments } from "../../../services/post.service";
import LoadingSpinner from "../LoadingSpinner";

export const PostComments = ({ post }) => {
	const queryClient = useQueryClient();
	const [comment, setNewComment] = useState("");

	const { mutate: mutateCommentPost, isPending: isCommenting } = useMutation({
		mutationFn: async () => {
			try {
				const data = await requestCreatePostComment({ postId: post.postId, content: comment });
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
		onSuccess: () => {
			toast.success("Comment posted successfully");
			setNewComment("");
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
		onError: (error) => {
			toast.error(error.message);
		},
    });

	const { data: postComments, isLoading: isRetrieving } = useQuery({
		// we use queryKey to give a unique name to our query and refer to it later
		queryKey: ["postComments"],
		queryFn: async () => {
            try {
                const data = await requestGetPostComments({ postId: post.postId });
				return data.items;
			} catch (error) {
				throw new Error(error);
			}
		},
		retry: true,
    });

	const handlePostComment = (e) => {
		e.preventDefault();
		if (isCommenting) return;
		mutateCommentPost();
    };

    
    return (
        <dialog id={`comments_modal${post.postId}`} className='modal border-none outline-none'>
            <div className='modal-box rounded border border-gray-600'>
                <h3 className='font-bold text-lg mb-4'>COMMENTS</h3>
                <div className='flex flex-col gap-3 max-h-60 overflow-auto'>
                    {post.numberOfComments === 0 && (
                        <p className='text-sm text-slate-500'>
                            No comments yet 🤔 Be the first one 😉
                        </p>
                    )}
                    {(postComments || []).map((comment) => (
                        <div key={comment.commentId} className='flex gap-2 items-start'>
                            <div className='avatar'>
                                <div className='w-8 rounded-full'>
                                    <img
                                        src={comment.createdBy.avatar || "/avatar-placeholder.png"}
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <div className='flex items-center gap-1'>
                                    <span className='font-bold'>{comment.createdBy.fullName}</span>
                                    <span className='text-gray-700 text-sm'>
                                        @{comment.createdBy.username}
                                    </span>
                                </div>
                                <div className='text-sm'>{comment.content}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <form
                    className='flex gap-2 items-center mt-4 border-t border-gray-600 pt-2'
                    onSubmit={handlePostComment}
                >
                    <textarea
                        className='textarea w-full p-1 rounded text-md resize-none border focus:outline-none  border-gray-800'
                        placeholder='Add a comment...'
                        value={comment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button className='btn btn-primary rounded-full btn-sm text-white px-4'>
                        {isCommenting ? <LoadingSpinner size='md' /> : "Post"}
                    </button>
                </form>
            </div>
            <form method='dialog' className='modal-backdrop'>
                <button className='outline-none'>close</button>
            </form>
        </dialog>
    )
}