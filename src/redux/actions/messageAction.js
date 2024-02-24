import { GLOBALTYPES, deleteData } from '../actions/globalTypes'
import { ITEMS_PER_PAGE } from '../../constants'
import { postDataAPI, getDataAPI, deleteDataAPI } from '../../utils/fetchData'
import { mapMessages } from '../../utils/mapMessages'

export const MESS_TYPES = {
  ADD_USER: 'ADD_USER',
  ADD_MESSAGE: 'ADD_MESSAGE',
  GET_CONVERSATIONS: 'GET_CONVERSATIONS',
  GET_MESSAGES: 'GET_MESSAGES',
  UPDATE_MESSAGES: 'UPDATE_MESSAGES',
  DELETE_MESSAGES: 'DELETE_MESSAGES',
  DELETE_CONVERSATION: 'DELETE_CONVERSATION',
  CHECK_ONLINE_OFFLINE: 'CHECK_ONLINE_OFFLINE',
}

export const addMessage = ({ msg, auth, socket }) =>
  async (dispatch) => {
    dispatch({ type: MESS_TYPES.ADD_MESSAGE, payload: msg })
    const { _id, avatar, fullname, username } = auth.user
    
    const mappedMsg = { ...msg, media: msg.media?.map(m => m.key) }
    socket.emit('add_message', {
      ...mappedMsg,
      user: { _id, avatar, fullname, username },
    })
    
    try {
      await postDataAPI(dispatch, 'messages', mappedMsg, auth.token)
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: mapMessages(err.response.data.msg), loading: false },
      })
    }
  }

export const getConversations = ({ auth, page = 1 }) =>
  async (dispatch) => {
    try {
      const res = await getDataAPI(
        dispatch,
        `conversations?limit=${page * ITEMS_PER_PAGE}`,
        auth.token
      )
      if (!res) return

      let newArr = []
      res.data.conversations.forEach((item) => {
        item.recipients.forEach((cv) => {
          if (cv._id !== auth.user._id) {
            newArr.push({
              ...cv,
              text: item.text,
              media: item.media,
              call: item.call,
            })
          }
        })
      })

      dispatch({
        type: MESS_TYPES.GET_CONVERSATIONS,
        payload: { newArr, count: res.data.count },
      })
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: mapMessages(err.response.data.msg), loading: false },
      })
    }
  }

export const getMessages = ({ auth, id, page = 1 }) =>
  async (dispatch) => {
    try {
      const res = await getDataAPI(
        dispatch,
        `messages/${id}?limit=${page * ITEMS_PER_PAGE}`,
        auth.token
      )
      if (!res) return

      const newData = { ...res.data, messages: res.data.messages.reverse() }
      dispatch({
        type: MESS_TYPES.GET_MESSAGES,
        payload: { ...newData, _id: id, page },
      })
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: mapMessages(err.response.data.msg), loading: false },
      })
    }
  }

export const loadMoreMessages = ({ auth, id, page = 1 }) =>
  async (dispatch) => {
    try {
      const res = await getDataAPI(
        dispatch,
        `messages/${id}?limit=${page * ITEMS_PER_PAGE}`,
        auth.token
      )
      if (!res) return

      const newData = { ...res.data, messages: res.data.messages.reverse() }

      dispatch({
        type: MESS_TYPES.UPDATE_MESSAGES,
        payload: { ...newData, _id: id, page },
      })
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: mapMessages(err.response.data.msg), loading: false },
      })
    }
  }

export const deleteMessages = ({ msg, data, auth }) =>
  async (dispatch) => {
    const newData = deleteData(data, msg._id)
    dispatch({
      type: MESS_TYPES.DELETE_MESSAGES,
      payload: { newData, _id: msg.recipient },
    })
    try {
      await deleteDataAPI(dispatch, `messages/${msg._id}`, auth.token)
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: mapMessages(err.response.data.msg), loading: false },
      })
    }
  }

export const deleteConversation = ({ auth, id }) =>
  async (dispatch) => {
    dispatch({ type: MESS_TYPES.DELETE_CONVERSATION, payload: id })
    try {
      await deleteDataAPI(dispatch, `conversations/${id}`, auth.token)
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: mapMessages(err.response.data.msg), loading: false },
      })
    }
  }
