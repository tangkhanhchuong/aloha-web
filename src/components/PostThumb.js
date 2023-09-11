import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const placeholder = 'https://placehold.co/600x400'

const PostThumb = ({ posts, count }) => {
	const { theme } = useSelector(state => state)

	if (count === 0) return <h2 className='text-center text-danger'>No Post</h2>

	return (
		<div className='post_thumb'>
			{
				posts.map(post => (
					<Link key={post._id} to={`/posts/${post._id}`}>
						<div className='post_thumb_display'>
							{
								!post.images[0] ? (
									<img
										src={placeholder}
										alt='placeholder'
										style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
									/>
								) : post.images[0].url.match(/video/i) ? (
									<video
										controls
										src={post.images[0].url}
										alt={post.images[0].url}
										style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
									/>
								) : (
									<img
										src={post.images[0].url}
										alt={post.images[0].url}
										style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
									/>
								)
							}
							<div className='post_thumb_menu'>
								<i className='far fa-heart'>{post.likes.length}</i>
								<i className='far fa-comment'>{post.comments.length}</i>
							</div>
						</div>
					</Link>
				))
			}
		</div>
	)
}

export default PostThumb
