import { FaRegComment } from "react-icons/fa"

export const CommentButton = ({ post }) => {
    return (
        <div
            className='flex gap-1 items-center cursor-pointer group'
            onClick={() => document.getElementById("comments_modal" + post.postId).showModal()}
        >
            <FaRegComment className='w-4 h-4  text-slate-500 group-hover:text-sky-400' />
            <span className='text-sm text-slate-500 group-hover:text-sky-400'>
                {post.numberOfComments}
            </span>
        </div>
    )
}