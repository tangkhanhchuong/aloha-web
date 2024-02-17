import { GLOBALTYPES } from '../actions/globalTypes'
import { getDataAPI } from '../../utils/fetchData'
import { mapMessages } from '../../utils/mapMessages'

export const SUGGESTION_TYPES = {
  LOADING: 'LOADING_SUGGES',
  GET_USERS: 'GET_USERS_SUGGES',
}

export const getSuggestions = (token) => async (dispatch) => {
  try {
    dispatch({ type: SUGGESTION_TYPES.LOADING, payload: true })
    const res = await getDataAPI(dispatch, 'users/suggest', token)
    if (!res) return
    dispatch({ type: SUGGESTION_TYPES.GET_USERS, payload: res.data })
    dispatch({ type: SUGGESTION_TYPES.LOADING, payload: false })
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: mapMessages(err.response.data.msg), loading: false },
    })
  }
}
