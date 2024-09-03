import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { BiRepost } from "react-icons/bi";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";

import { requestCreatePostComment, requestLikePost } from "../../../services/post.service";
import LoadingSpinner from "../LoadingSpinner";

export const PostFooter = ({ post }) => {
	const queryClient = useQueryClient();
	const [newComment, setNewComment] = useState("");
	const [isReacted, setIsReacted] = useState(post.isReacted);

	const { mutate: likePost, isPending: isLiking } = useMutation({
		mutationFn: async ({ reaction }) => {
			try {
				const data = await requestLikePost({ postId: post.postId, reaction });
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const { mutate: mutateCommentPost, isPending: isCommenting } = useMutation({
		mutationFn: async () => {
			try {
				const data = await requestCreatePostComment({ postId: post.postId, content: newComment });
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

	const handlePostComment = (e) => {
		e.preventDefault();
		if (isCommenting) return;
		mutateCommentPost();
	};

	const handleLikePost = () => {
		if (isLiking) return;
		if (isReacted) {
			likePost({ reaction: null });
			return setIsReacted(false);
		}
		likePost({ reaction: 'LIKE' })
		setIsReacted(true);
	};
	return (
		<div className='flex justify-between mt-3'>
			<div className='flex gap-4 items-center w-2/3 justify-between'>
				<div
					className='flex gap-1 items-center cursor-pointer group'
					onClick={() => document.getElementById("comments_modal" + post.postId).showModal()}
				>
					<FaRegComment className='w-4 h-4  text-slate-500 group-hover:text-sky-400' />
					<span className='text-sm text-slate-500 group-hover:text-sky-400'>
						{post.numberOfComments}
					</span>
				</div>
				<dialog id={`comments_modal${post.postId}`} className='modal border-none outline-none'>
					<div className='modal-box rounded border border-gray-600'>
						<h3 className='font-bold text-lg mb-4'>COMMENTS</h3>
						<div className='flex flex-col gap-3 max-h-60 overflow-auto'>
							{post.numberOfComments === 0 && (
								<p className='text-sm text-slate-500'>
									No comments yet 🤔 Be the first one 😉
								</p>
							)}
							{/* {(post.comments || []).map((newComment) => (
								<div key={newComment.postId} className='flex gap-2 items-start'>
									<div className='avatar'>
										<div className='w-8 rounded-full'>
											<img
												src={newComment.user.avatar || "/avatar-placeholder.png"}
											/>
										</div>
									</div>
									<div className='flex flex-col'>
										<div className='flex items-center gap-1'>
											<span className='font-bold'>{newComment.user.fullName}</span>
											<span className='text-gray-700 text-sm'>
												@{newComment.user.username}
											</span>
										</div>
										<div className='text-sm'>{newComment.text}</div>
									</div>
								</div>
							))} */}
						</div>
						<form
							className='flex gap-2 items-center mt-4 border-t border-gray-600 pt-2'
							onSubmit={handlePostComment}
						>
							<textarea
								className='textarea w-full p-1 rounded text-md resize-none border focus:outline-none  border-gray-800'
								placeholder='Add a newComment...'
								value={newComment}
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
				<div className='flex gap-1 items-center group cursor-pointer'>
					<BiRepost className='w-6 h-6  text-slate-500 group-hover:text-green-500' />
					<span className='text-sm text-slate-500 group-hover:text-green-500'>0</span>
				</div>
				<div className='flex gap-1 items-center group cursor-pointer' onClick={handleLikePost}>
					{isLiking && <LoadingSpinner size='sm' />}
					{!isReacted && !isLiking && (
						<FaRegHeart className='w-4 h-4 cursor-pointer text-slate-500 group-hover:text-pink-500' />
					)}
					{isReacted && !isLiking && (
						<FaHeart className='w-4 h-4 text-pink-500' />
					)}
					<span
						className={`text-sm  group-hover:text-pink-500 ${
							isReacted ? "text-pink-500" : "text-slate-500"
						}`}
					>
						{post.numberOfReactions}
					</span>
				</div>
			</div>
			<div className='flex w-1/3 justify-end gap-2 items-center'>
				<FaRegBookmark className='w-4 h-4 text-slate-500 cursor-pointer' />
			</div>
		</div>
	)
}