export const messages = {
		REGISTER_SUCCESS: 'Your account is created!',
		LOGIN_SUCCESS: 'You are logged in!',
		LOGOUT_SUCCESS: 'You are logged out!',
		TOKEN_REFRESHED: 'Your session is refreshed!',
		EMAIL_EXISTED: 'This email has already existed!',
		EMAIL_NOT_EXISTED: 'This email is not found!',
		USERNAME_EXISTED: 'This username is not found!',
		PASSWORD_EXEEDED: 'Your password exceeds the maximum allowed!',
		PASSWORD_INCORRECT: 'Your password is incorrect!',
		SESSION_EXPIRED: 'Your session has expired. Please try again!',
		UNAUTHENTICATED: 'You are not authenticated!',
		USER_NOT_FOUND: 'User not found!',
		POST_NOT_FOUND: 'Post not found!',
		POST_LIKED: 'You has already liked this post!',
		POST_SAVED: 'You has already saved this post!',
		FILE_MISSED: 'Missing or invalid file!',
		COMMENT_NOT_FOUND: 'Comment not found!',
		COMMENT_LIKED: 'You has already liked this comment!'
}

export const mapMessages = (code) => {
	return messages[code] ?? ''
}