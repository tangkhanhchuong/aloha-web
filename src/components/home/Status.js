import { Avatar } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { AVATAR_LG } from '../../constants'

const Status = () => {
  const { auth } = useSelector((state) => state)
  const dispatch = useDispatch()

  return (
    <div className='status my-3 d-flex'>
      <Avatar src={auth.user.avatar} size={AVATAR_LG} />

      <button
        className='status_btn flex-fill'
        onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}
      >
        &nbsp;&nbsp;&nbsp;&nbsp;{auth.user.username}, what are you thinking?
      </button>
    </div>
  )
}

export default Status
