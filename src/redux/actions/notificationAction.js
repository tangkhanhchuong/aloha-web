import { GLOBALTYPES } from './globalTypes'
import { deleteDataAPI, getDataAPI, patchDataAPI } from '../../utils/fetchData'
import { mapMessages } from '../../utils/mapMessages'

export const NOTIFICATION_TYPES = {
	GET_NOTIFICATIONS: 'GET_NOTIFICATIONS',
	CREATE_NOTIFICATION: 'CREATE_NOTIFICATION',
	REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
	UPDATE_NOTIFICATION: 'UPDATE_NOTIFICATION',
	UPDATE_SOUND: 'UPDATE_SOUND',
	DELETE_ALL_NOTIFICATIONS: 'DELETE_ALL_NOTIFICATIONS'
}

export const getNotifications = (token) => async (dispatch) => {
	try {
		const res = await getDataAPI('notifications', token)
		dispatch({ type: NOTIFICATION_TYPES.GET_NOTIFICATIONS, payload: res.data.notifications })

	} catch (err) {
		dispatch({ type: GLOBALTYPES.ALERT, payload: { error: mapMessages(err.response.data.msg) } })
	}
}


export const readNotification = ({ msg, auth }) => async (dispatch) => {
	dispatch({ type: NOTIFICATION_TYPES.UPDATE_NOTIFICATION, payload: { ...msg, isRead: true } })
	try {
		await patchDataAPI(`notifications/${msg._id}/read`, null, auth.token)
	} catch (err) {
		dispatch({ type: GLOBALTYPES.ALERT, payload: { error: mapMessages(err.response.data.msg) } })
	}
}

export const deleteAllNotifications = (token) => async (dispatch) => {
	dispatch({ type: NOTIFICATION_TYPES.DELETE_ALL_NOTIFICATIONS, payload: [] })
	try {
		await deleteDataAPI('notifications', token)
	} catch (err) {
		dispatch({ type: GLOBALTYPES.ALERT, payload: { error: mapMessages(err.response.data.msg) } })
	}
}