import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import userSettings from './userSettingsReducer'
import profile from './profileReducer'
import status from './statusReducer'
import homePosts from './postReducer'
import modal from './modalReducer'
import detailPost from './detailPostReducer'
import discover from './discoverReducer'
import suggestions from './suggestionReducer'
import socket from './socketReducer'
import notification from './notificationReducer'
import message from './messageReducer'
import online from './onlineReducer'
import call from './callReducer'
import peer from './peerReducer'


export default combineReducers({
	auth,
	alert,
	userSettings,
	profile,
	status,
	homePosts,
	modal,
	detailPost,
	discover,
	suggestions,
	socket,
	notification,
	message,
	online,
	call,
	peer
})