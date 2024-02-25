import { AUTH_TYPES } from './authAction'
import { GLOBALTYPES } from './globalTypes'
import { imageUpload } from '../../utils/imageUpload'
import {
  postDataAPI,
  getDataAPI,
  patchDataAPI,
  deleteDataAPI,
} from '../../utils/fetchData'
import { mapMessages } from '../../utils/mapMessages'
import { ITEMS_PER_PAGE } from '../../constants'

export const POST_TYPES = {
  CREATE_POST: 'CREATE_POST',
  LOADING_POST: 'LOADING_POST',
  GET_POSTS: 'GET_POSTS',
  UPDATE_POST: 'UPDATE_POST',
  GET_POST: 'GET_POST',
  DELETE_POST: 'DELETE_POST',
  LOAD_MORE_POSTS: 'LOAD_MORE_POSTS',
}

export const createPost = ({ content, images, auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
      let files = []
      if (images.length > 0) files = await imageUpload(images, auth.token)

      const res = await postDataAPI(
        dispatch, 
        'posts',
        { content, images: files.map((file) => file.key) },
        auth.token
      )
      dispatch({
        type: POST_TYPES.CREATE_POST,
        payload: { ...res.data?.newPost, user: auth.user },
      })
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } })
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: mapMessages(err.response.data.msg), loading: false },
      })
    }
  }

export const getPosts = (token) => async (dispatch) => {
  dispatch({ type: POST_TYPES.LOADING_POST, payload: true })
  const res = await getDataAPI(dispatch, 'posts', token)
  if (!res) return
  dispatch({
    type: POST_TYPES.GET_POSTS,
    payload: { ...res.data },
  })
  dispatch({ type: POST_TYPES.LOADING_POST, payload: false })
}

export const updatePost = ({ content, images, auth, status }) =>
  async (dispatch) => {
    let media = []
    const imgNewUrl = images.filter((img) => !img.url)
    const imgOldUrl = images.filter((img) => img.url)

    if (
      status.content === content &&
      imgNewUrl.length === 0 &&
      imgOldUrl.length === status.images.length
    ) {
      return
    }

    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
      if (imgNewUrl.length > 0)
        media = await imageUpload(imgNewUrl, auth.token)

      const res = await patchDataAPI(
        dispatch, 
        `posts/${status._id}`,
        {
          content,
          images: [...imgOldUrl, ...media].map((file) => file.key),
        },
        auth.token
      )

      dispatch({ type: POST_TYPES.UPDATE_POST, payload: res.data.post })
      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: mapMessages(res.data.msg), loading: false } })
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: mapMessages(err.response.data.msg), loading: false },
      })
    }
  }

export const likePost = ({ post, auth, socket }) =>
  async (dispatch) => {
    const newPost = { ...post, likes: [...post.likes, auth.user] }
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
    socket.emit('likePost', newPost)

    try {
      await patchDataAPI(dispatch, `posts/${post._id}/like`, null, auth.token)
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: mapMessages(err.response.data.msg), loading: false },
      })
    }
  }

export const unlikePost = ({ post, auth, socket }) =>
  async (dispatch) => {
    const newPost = {
      ...post,
      likes: post.likes.filter((like) => like._id !== auth.user._id),
    }
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
    socket.emit('unLikePost', newPost)

    try {
      await patchDataAPI(dispatch, `posts/${post._id}/unlike`, null, auth.token)
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: mapMessages(err.response.data.msg), loading: false },
      })
    }
  }

export const getPost = ({ detailPost, id, auth }) =>
  async (dispatch) => {
    if (detailPost.every((post) => post._id !== id)) {
      try {
        const res = await getDataAPI(dispatch, `posts/${id}`, auth.token)
        dispatch({ type: POST_TYPES.GET_POST, payload: res.data.post })
      } catch (err) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: mapMessages(err.response.data.msg), loading: false },
        })
      }
    }
  }

export const deletePost = ({ post, auth, socket }) =>
  async (dispatch) => {
    dispatch({ type: POST_TYPES.DELETE_POST, payload: post })

    try {
      await deleteDataAPI(dispatch, `posts/${post._id}`, auth.token)
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: mapMessages(err.response.data.msg), loading: false },
      })
    }
  }

export const savePost = ({ post, auth }) =>
  async (dispatch) => {
    const newUser = { ...auth.user, saved: [...auth.user.saved, post._id] }
    dispatch({ type: AUTH_TYPES.AUTHENTICATED, payload: { ...auth, user: newUser } })

    try {
      await patchDataAPI(dispatch, `posts/${post._id}/save`, null, auth.token)
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: mapMessages(err.response.data.msg), loading: false },
      })
    }
  }

export const unsavePost = ({ post, auth }) =>
  async (dispatch) => {
    const newUser = {
      ...auth.user,
      saved: auth.user.saved.filter((id) => id !== post._id),
    }
    dispatch({ type: AUTH_TYPES.AUTHENTICATED, payload: { ...auth, user: newUser } })

    try {
      await patchDataAPI(dispatch, `posts/${post._id}/unsave`, null, auth.token)
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: mapMessages(err.response.data.msg), loading: false },
      })
    }
  }

export const loadMorePosts = ({ auth }) =>
  async (dispatch, getState) => {
    const state = getState().homePosts
    const res = await getDataAPI(
      dispatch,
      `posts?limit=${ITEMS_PER_PAGE}&&page=${state.page + 1}`,
      auth.token
    )
    dispatch({
      type: POST_TYPES.LOAD_MORE_POSTS,
      payload: { ...res.data, page: state.page + 1 },
    })
  }