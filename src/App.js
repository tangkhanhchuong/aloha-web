import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import io from 'socket.io-client'
import Peer from 'peerjs'

import PageRender from './customRouter/PageRender'
import PrivateRouter from './customRouter/PrivateRouter'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import Alert from './components/alert/Alert'
import Header from './components/header/Header'
import StatusModal from './components/StatusModal'
import { initialize } from './redux/actions/authAction'
import { getPosts } from './redux/actions/postAction'
import { getSuggestions } from './redux/actions/suggestionsAction'
import { GLOBALTYPES } from './redux/actions/globalTypes'
import SocketClient from './SocketClient'
import { getNotifications } from './redux/actions/notificationAction'
import CallModal from './components/message/CallModal'

const App = () => {
  const { auth, status, modal, call } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialize())

    const socket = io(process.env.REACT_APP_SERVER_URL, {
      reconnection: true,
      transport: ['websocket']
    })
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket })
    return () => socket.close()
  }, [dispatch])

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token))
      dispatch(getSuggestions(auth.token))
      dispatch(getNotifications(auth.token))
    }
  }, [dispatch, auth.token])

  useEffect(() => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification')
    }
    else if (Notification.permission === 'granted') { }
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') { }
      })
    }
  }, [])


  useEffect(() => {
    const newPeer = new Peer(undefined, {
      path: '/', secure: true
    })
    dispatch({ type: GLOBALTYPES.PEER, payload: newPeer })
  }, [dispatch])

  
  return (
    <Router>
      <Alert />
      <input type='checkbox' id='theme' />
      <div className={`App ${(status || modal) && 'mode'}`}>
        {auth.token && <Header />}
        <div className='main'>
          {status && <StatusModal />}
          {auth.token && <SocketClient />}
          {call && <CallModal />}

          <Route exact path='/' component={auth.token ? Home : Login} />
          <Route exact path='/register' component={Register} />
          <PrivateRouter exact path='/:page' component={PageRender} />
          <PrivateRouter exact path='/:page/:id' component={PageRender} />
        </div>
      </div>
    </Router>
  )
}

export default App
