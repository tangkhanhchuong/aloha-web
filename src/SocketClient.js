import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { POST_TYPES } from './redux/actions/postAction'
import { GLOBALTYPES } from './redux/actions/globalTypes'
import { NOTIFY_TYPES } from './redux/actions/notifyAction'
import { MESS_TYPES } from './redux/actions/messageAction'

import audiobell from './audio/got-it-done-613.mp3'


const spawnNotification = (body, icon, url, title) => {
	let options = {
		body, icon
	}
	let n = new Notification(title, options)

	n.onclick = e => {
		e.preventDefault()
		window.open(url, '_blank')
	}
}

const SocketClient = () => {
	const { auth, socket, notify, online, call } = useSelector(state => state)
	const dispatch = useDispatch()

	const audioRef = useRef()

	// user joined
	useEffect(() => {
		socket.emit('user_joined', auth.user)

	}, [socket, auth.user])

	// notify user
	useEffect(() => {
		socket.on('send_notifcation', msg => {
			dispatch({ type: NOTIFY_TYPES.CREATE_NOTIFY, payload: msg })

			if (notify.sound)
				audioRef.current.play()
			spawnNotification(
				msg.user.username + ' ' + msg.text,
				msg.user.avatar,
				msg.url,
				'Aloha'
			)
		})
		return () => socket.off('send_notifcation')

	}, [socket, dispatch, notify.sound])

	// Message
	useEffect(() => {
		socket.on('add_message_to_client', msg => {
			dispatch({ type: MESS_TYPES.ADD_MESSAGE, payload: msg })
			dispatch({
				type: MESS_TYPES.ADD_USER,
				payload: {
					...msg.user,
					text: msg.text,
					media: msg.media
				}
			})
		})
		return () => socket.off('add_message_to_client')

	}, [socket, dispatch])

	useEffect(() => {
		socket.on('user_is_online', id => {
			if (!online.includes(id)) {
				dispatch({ type: GLOBALTYPES.ONLINE, payload: id })
			}
		})
		return () => socket.off('user_is_online')

	}, [socket, dispatch, online])

	// Check User Offline
	useEffect(() => {
		socket.on('user_is_offline', id => {
			dispatch({ type: GLOBALTYPES.OFFLINE, payload: id })
		})
		return () => socket.off('user_is_offline')

	}, [socket, dispatch])


	// Call User
	// useEffect(() => {
	// 	socket.on('callUserToClient', data => {
	// 		dispatch({ type: GLOBALTYPES.CALL, payload: data })
	// 	})
	// 	return () => socket.off('callUserToClient')

	// }, [socket, dispatch])

	// useEffect(() => {
	// 	socket.on('userBusy', data => {
	// 		dispatch({ type: GLOBALTYPES.ALERT, payload: { error: `${call.username} is busy!` } })
	// 	})
	// 	return () => socket.off('userBusy')

	// }, [socket, dispatch, call])

	return (
		<>
			<audio controls ref={audioRef} style={{ display: 'none' }} >
				<source src={audiobell} type='audio/mp3' />
			</audio>
		</>
	)
}

export default SocketClient
