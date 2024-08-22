import { PROFILE_TYPES } from '../actions/profileAction'
import { editData } from '../actions/globalTypes'

const initialState = {
  loading: false,
  ids: [],
  users: [],
  posts: [],
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_TYPES.LOADING_PROFILE:
      return {
        ...state,
        loading: action.payload,
      }
    case PROFILE_TYPES.GET_PROFILE_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      }
    case PROFILE_TYPES.FOLLOW:
      return {
        ...state,
        users: editData(state.users, action.payload._id, action.payload),
      }
    case PROFILE_TYPES.UNFOLLOW:
      return {
        ...state,
        users: editData(state.users, action.payload._id, action.payload),
      }
    case PROFILE_TYPES.GET_PROFILE_ID:
      return {
        ...state,
        ids: [...state.ids, action.payload],
      }
    case PROFILE_TYPES.UPDATE_PROFILE_POST:
      return {
        ...state,
        posts: editData(state.posts, action.payload._id, action.payload),
      }
    default:
      return state
  }
}

export default profileReducer
