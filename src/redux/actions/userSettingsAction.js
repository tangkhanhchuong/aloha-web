import { GLOBALTYPES } from './globalTypes'
// import { getDataAPI } from '../../utils/fetchData'
import { mapMessages } from '../../utils/mapMessages'

export const USER_SETTINGS_TYPES = {
  SWITCH_THEME: 'SWITCH_THEME'
}

export const switchTheme = (token) => async (dispatch) => {
  try {
    console.log('Switch theme')
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
    // const res = await getDataAPI(dispatch, 'users/suggest', token)
    // if (!res) return
    dispatch({ type: USER_SETTINGS_TYPES.SWITCH_THEME })
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } })
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: mapMessages(err.response.data.msg) },
    })
  }
}
