import PostSkeleton from "../../skeletons/PostSkeleton";
import { Post } from "./Post";

export const Posts = ({ isLoading, isRefetching, posts }) => {
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
