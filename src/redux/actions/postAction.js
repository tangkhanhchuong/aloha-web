import { GLOBALTYPES } from "./globalTypes";
import { imageUpload } from "../../utils/imageUpload";
import {
  postDataAPI,
  getDataAPI,
  patchDataAPI,
  deleteDataAPI,
} from "../../utils/fetchData";

export const POST_TYPES = {
  CREATE_POST: "CREATE_POST",
  LOADING_POST: "LOADING_POST",
  GET_POSTS: "GET_POSTS",
  UPDATE_POST: "UPDATE_POST",
  GET_POST: "GET_POST",
  DELETE_POST: "DELETE_POST",
};

export const createPost =
  ({ content, images, auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      let files = [];
      if (images.length > 0) files = await imageUpload(images, auth.token);

      const res = await postDataAPI(
        "posts",
        { content, images: files.map((file) => file.key) },
        auth.token
      );
      dispatch({
        type: POST_TYPES.CREATE_POST,
        payload: { ...res.data.newPost, user: auth.user },
      });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { rror: err.response.data.msg },
      });
    }
  };

export const getPosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: POST_TYPES.LOADING_POST, payload: true });
    const res = await getDataAPI("posts", token);

    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: { ...res.data, page: res?.data.length || 0 },
    });
    dispatch({ type: POST_TYPES.LOADING_POST, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const updatePost =
  ({ content, images, auth, status }) =>
  async (dispatch) => {
    let media = [];
    const imgNewUrl = images.filter((img) => !img.url);
    const imgOldUrl = images.filter((img) => img.url);

    if (
      status.content === content &&
      imgNewUrl.length === 0 &&
      imgOldUrl.length === status.images.length
    ) {
      return;
    }

    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      if (imgNewUrl.length > 0)
        media = await imageUpload(imgNewUrl, auth.token);

      const res = await patchDataAPI(
        `posts/${status._id}`,
        {
          content,
          images: [...imgOldUrl, ...media].map((file) => file.key),
        },
        auth.token
      );

      dispatch({ type: POST_TYPES.UPDATE_POST, payload: res.data.post });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const likePost =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    const newPost = { ...post, likes: [...post.likes, auth.user] };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    socket.emit("likePost", newPost);

    try {
      await patchDataAPI(`posts/${post._id}/like`, null, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const unlikePost =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    const newPost = {
      ...post,
      likes: post.likes.filter((like) => like._id !== auth.user._id),
    };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    socket.emit("unLikePost", newPost);

    try {
      await patchDataAPI(`posts/${post._id}/unlike`, null, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const getPost =
  ({ detailPost, id, auth }) =>
  async (dispatch) => {
    if (detailPost.every((post) => post._id !== id)) {
      try {
        const res = await getDataAPI(`posts/${id}`, auth.token);
        dispatch({ type: POST_TYPES.GET_POST, payload: res.data.post });
      } catch (err) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      }
    }
  };

export const deletePost =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    dispatch({ type: POST_TYPES.DELETE_POST, payload: post });

    try {
      await deleteDataAPI(`posts/${post._id}`, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const savePost =
  ({ post, auth }) =>
  async (dispatch) => {
    const newUser = { ...auth.user, saved: [...auth.user.saved, post._id] };
    dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });

    try {
      await patchDataAPI(`posts/${post._id}/save`, null, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const unsavePost =
  ({ post, auth }) =>
  async (dispatch) => {
    const newUser = {
      ...auth.user,
      saved: auth.user.saved.filter((id) => id !== post._id),
    };
    dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });

    try {
      await patchDataAPI(`posts/${post._id}/unsave`, null, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
