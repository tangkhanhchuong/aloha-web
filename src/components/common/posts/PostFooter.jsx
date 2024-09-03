import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { BiRepost } from "react-icons/bi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";

import { requestLikePost } from "../../../services/post.service";
import LoadingSpinner from "../LoadingSpinner";
import { CommentButton } from "./CommentButton";
import { PostComments } from "./PostComments";

export const PostFooter = ({ post }) => {
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
				<CommentButton post={post} />
				<PostComments post={post} />
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