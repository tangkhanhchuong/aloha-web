import React from 'react'

import ConversationList from '../../components/message/ConversationList'
import ConversationDetail from '../../components/message/ConversationDetail'

const Conversation = () => {
  return (
    <div className='message d-flex'>
      <div className='col-md-4 border-right px-0 left_mess'>
        <ConversationList />
      </div>
      <div className='col-md-8 px-0'>
        <ConversationDetail />
      </div>
    </div>
  )
}

export default Conversation
