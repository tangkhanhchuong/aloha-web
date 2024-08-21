import Cookies from 'js-cookie'
import Peer from 'peerjs'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, HashRouter as Router } from 'react-router-dom'

import Alert from './components/alert/Alert'
import Header from './components/header/Header'
import CallModal from './components/message/CallModal'
import StatusModal from './components/StatusModal'
import PageRender from './customRouter/PageRender'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import { initialize } from './redux/actions/authAction'
import { GLOBALTYPES } from './redux/actions/globalTypes'

const App = () => {
  const { auth, status, modal, call } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    // const socket = io(process.env.REACT_APP_SERVER_URL, {
    //   reconnection: true,
    //   transport: ['websocket']
    // })
    // dispatch({ type: GLOBALTYPES.SOCKET, payload: socket })
    // return () => socket.close()
  }, [dispatch])

  useEffect(() => {
    const cookieToken = Cookies.get('accessToken')
    if (cookieToken) {
      dispatch(initialize())
      // dispatch(getPosts(auth.token))
      // dispatch(getSuggestions(auth.token))
      // dispatch(getNotifications(auth.token))
    }
    return () => { }
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
          {/* {auth.token && <SocketClient />} */}
          {call && <CallModal />}

          <Route exact path='/' component={auth.token ? Home : Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/:page/:id' component={PageRender} />
          <Route exact path='/:page' component={PageRender} />
        </div>
      </div>
    </Router>
  )
}

export default App
