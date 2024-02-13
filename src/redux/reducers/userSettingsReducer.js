import { USER_SETTINGS_TYPES } from "../actions/userSettingsAction"

const initialState = {
  isDarkTheme: false
}

const userSettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SETTINGS_TYPES.SWITCH_THEME:
      return { ...state, isDarkTheme: !state.isDarkTheme }
    default:
      return state
  }
}

export default userSettingsReducer
