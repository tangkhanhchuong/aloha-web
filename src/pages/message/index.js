import React from 'react'
import { Avatar } from 'antd'

import LeftSide from '../../components/message/LeftSide'
import logo from '../../images/konoha-logo.png'

const Message = () => {
  return (
    <div className='message d-flex'>
      <div className='col-md-4 border-right px-0'>
        <LeftSide />
      </div>

      <div className='col-md-8 px-0 right_mess'>
        <div
          className='d-flex justify-content-center 
                align-items-center flex-column h-100'
        >
          <h1 className='p-0 m-4' onClick={() => window.scrollTo({ top: 0 })}>
            <Avatar
              src={logo}
              size={72}
              shape='circle'
            />
          </h1>
          <h4>Message</h4>
          <p>Choose a conversation to send messages to your friend</p>
        </div>
      </div>
    </div>
  )
}

export default Message
