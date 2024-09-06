export const PostContent = ({ post }) => {
    return (
        <div className='flex flex-col gap-3 overflow-hidden mt-2'>
            <span>{post.content}</span>
            {post.fileUrls[0] && (
                <img
                    src={post.fileUrls[0]}
                    className='h-80 object-contain rounded-lg border border-gray-700'
                    alt=''
                />
            )}
        </div>
    );
}