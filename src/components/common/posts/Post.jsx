import { Link } from "react-router-dom";

import { PostContent } from "./PostContent";
import { PostFooter } from "./PostFooter";
import { PostHeader } from "./PostHeader";

export const Post = ({ post }) => {
	const postOwner = post.createdBy;

	return (
		<>
			<div className='flex gap-2 items-start p-4 border-b border-gray-700'>
				<div className='avatar'>
					<Link to={`/profile/${postOwner.slug}`} className='w-8 rounded-full overflow-hidden'>
						<img src={postOwner.avatar || "/avatar-placeholder.png"} />
					</Link>
				</div>
				<div className='flex flex-col flex-1'>
					<PostHeader post={post} />
					<PostContent post={post} />
					<PostFooter post={post} />
				</div>
			</div>
		</>
	);
};
