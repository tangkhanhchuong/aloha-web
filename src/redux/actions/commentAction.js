import { GLOBALTYPES, editData, deleteData } from './globalTypes'
import { POST_TYPES } from './postAction'
import {
  postDataAPI,
  patchDataAPI,
  deleteDataAPI,
} from '../../utils/fetchData'
import { mapMessages } from '../../utils/mapMessages'

export const createComment = ({ post, newComment, auth, socket }) =>
  async (dispatch) => {
    const newPost = { ...post, comments: [...post.comments, newComment] }

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
    try {
      const data = {
        ...newComment,
        postId: post._id,
        postUserId: post.user._id,
      }
      const res = await postDataAPI(dispatch, 'comments', data, auth.token)
      if (!res) return

      const newData = { ...res.data.newComment, user: auth.user }
      const newPost = { ...post, comments: [...post.comments, newData] }
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })

      socket.emit('createComment', newPost)
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: mapMessages(err.response.data.msg), loading: false },
      })
    }
  }

export const updateComment = ({ comment, post, content, auth }) =>
  async (dispatch) => {
    const newComments = editData(post.comments, comment._id, {
      ...comment,
      content,
    })
    const newPost = { ...post, comments: newComments }

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
    try {
      await patchDataAPI(dispatch, `comments/${comment._id}`, { content }, auth.token)
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: mapMessages(err.response.data.msg), loading: false },
      })
    }
  }

export const likeComment = ({ comment, post, auth }) =>
  async (dispatch) => {
    const newComment = { ...comment, likes: [...comment.likes, auth.user] }
    const postComments = editData(post.comments, comment._id, newComment)
    const newPost = { ...post, comments: postComments }
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })

    try {
      await patchDataAPI(dispatch, `comments/${comment._id}/like`, null, auth.token)
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: mapMessages(err.response.data.msg), loading: false },
      })
    }
  }

export const unLikeComment = ({ comment, post, auth }) =>
  async (dispatch) => {
    const newComment = {
      ...comment,
      likes: deleteData(comment.likes, auth.user._id),
    }
    const newComments = editData(post.comments, comment._id, newComment)
    const newPost = { ...post, comments: newComments }

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })

    try {
      await patchDataAPI(dispatch, `comments/${comment._id}/unlike`, null, auth.token)
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: mapMessages(err.response.data.msg), loading: false },
      })
    }
  }

export const deleteComment = ({ post, comment, auth, socket }) =>
  async (dispatch) => {
    const deleteArr = [
      ...post.comments.filter((cm) => cm.reply === comment._id),
      comment,
    ]

    const newPost = {
      ...post,
      comments: post.comments.filter(
        (cm) => !deleteArr.find((da) => cm._id === da._id)
      ),
    }

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
    socket.emit('deleteComment', newPost)
    try {
      deleteArr.forEach((item) => {
        deleteDataAPI(dispatch, `comments/${item._id}`, auth.token)
      })
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: mapMessages(err.response.data.msg), loading: false },
      })
    }
  }
