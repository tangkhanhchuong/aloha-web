import { AUTH_TYPES } from "../actions/authAction"

const initialState = {
  user: null,
  token: null,
  loading: false,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_TYPES.AUTHENTICATED:
      return action.payload
    default:
      return state
  }
}

export default authReducer
