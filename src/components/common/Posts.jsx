import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { requestGetUserTimeline } from "../../services/user.service";
import PostSkeleton from "../skeletons/PostSkeleton";
import Post from "./Post";

const Posts = ({ feedType, userSlug, userId }) => {
	// const getPostEndpoint = () => {
	// 	switch (feedType) {
	// 		case "forYou":
	// 			return "/api/posts/all";
	// 		case "following":
	// 			return "/api/posts/following";
	// 		case "posts":
	// 			return `/api/posts/user/${userSlug}`;
	// 		case "likes":
	// 			return `/api/posts/likes/${userId}`;
	// 		default:
	// 			return "/api/posts/all";
	// 	}
	// };

	// const POST_ENDPOINT = getPostEndpoint();

	const {
		data: posts,
		isLoading,
		refetch,
		isRefetching,
	} = useQuery({
		queryKey: ["posts"],
		queryFn: async () => {
			try {
				if (!userId) {
					return [];
				}
				const data = await requestGetUserTimeline({ userId });
				return data.items;
			} catch (error) {
				throw new Error(error);
			}
		},
	});

	useEffect(() => {
		refetch();
	}, [feedType, refetch, userSlug]);

	return (
		<>
			{(isLoading || isRefetching) && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && !isRefetching && posts?.length === 0 && (
				<p className='text-center my-4'>No posts in this tab. Switch 👻</p>
			)}
			{!isLoading && !isRefetching && posts && (
				<div>
					{posts.map((post) => (
						<Post key={post.postId} post={post} />
					))}
				</div>
			)}
		</>
	);
};
export default Posts;
