import { POST_TYPES } from '../actions/postAction'
import { editData, deleteData } from '../actions/globalTypes'

const initialState = {
  loading: false,
  posts: [],
  count: 0,
  page: 1,
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_TYPES.CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      }
    case POST_TYPES.LOADING_POST:
      return {
        ...state,
        loading: action.payload,
      }
    case POST_TYPES.GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        count: action.payload.count,
      }
    case POST_TYPES.LOAD_MORE_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.posts],
        page: state.page + 1
      }
    case POST_TYPES.UPDATE_POST:
      return {
        ...state,
        posts: editData(state.posts, action.payload._id, action.payload),
      }
    case POST_TYPES.DELETE_POST:
      return {
        ...state,
        posts: deleteData(state.posts, action.payload._id),
      }
    default:
      return state
  }
}

export default postReducer
