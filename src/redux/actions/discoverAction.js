import { GLOBALTYPES } from './globalTypes'
import { getDataAPI } from '../../utils/fetchData'
import { mapMessages } from '../../utils/mapMessages'

export const DISCOVER_TYPES = {
  LOADING: 'LOADING_DISCOVER',
  GET_POSTS: 'GET_DISCOVER_POSTS',
  UPDATE_POST: 'UPDATE_DISCOVER_POST',
}

export const getDiscoverPosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: DISCOVER_TYPES.LOADING, payload: true })
    const res = await getDataAPI(dispatch, `users/discover-posts`, token)
    if (!res) return
    dispatch({ type: DISCOVER_TYPES.GET_POSTS, payload: res.data })
    dispatch({ type: DISCOVER_TYPES.LOADING, payload: false })
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: mapMessages(err.response.data.msg) },
    })
  }
}
