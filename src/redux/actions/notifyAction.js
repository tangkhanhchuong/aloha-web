import { GLOBALTYPES } from './globalTypes'
import { deleteDataAPI, getDataAPI, patchDataAPI } from '../../utils/fetchData'

export const NOTIFY_TYPES = {
    GET_NOTIFIES: 'GET_NOTIFIES',
    CREATE_NOTIFY: 'CREATE_NOTIFY',
    REMOVE_NOTIFY: 'REMOVE_NOTIFY',
    UPDATE_NOTIFY: 'UPDATE_NOTIFY',
    UPDATE_SOUND: 'UPDATE_SOUND',
    DELETE_ALL_NOTIFIES: 'DELETE_ALL_NOTIFIES'
}

export const getNotifies = (token) => async (dispatch) => {
    try {
        const res = await getDataAPI('notifies', token)
        dispatch({ type: NOTIFY_TYPES.GET_NOTIFIES, payload: res.data.notifies })

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg }})
    }
}


export const readNotify = ({ msg, auth }) => async (dispatch) => {
    dispatch({ type: NOTIFY_TYPES.UPDATE_NOTIFY, payload: { ...msg, isRead: true }})

    try {
        await patchDataAPI(`notifies/${msg._id}/read`, null, auth.token)

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg }})
    }
}

export const deleteAllNotifies = (token) => async (dispatch) => {
    dispatch({ type: NOTIFY_TYPES.DELETE_ALL_NOTIFIES, payload: [] })
    try {
        await deleteDataAPI('notifies', token)
        
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg }})
    }
}