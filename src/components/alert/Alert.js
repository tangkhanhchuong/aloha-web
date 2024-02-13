import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Loading from './Loading'
import Toast from './Toast'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

const Alert = () => {
  const { alert } = useSelector((state) => state)
  const dispatch = useDispatch()

  return (
    <div>
      {alert.loading && <Loading />}
      {alert.error && (
        <Toast
          msg={{ title: 'Error', body: alert.error }}
          close={() => dispatch({ type: GLOBALTYPES.ALERT, payload: { error: null } })}
          bgColor='bg-danger'
        />
      )}
      {alert.success && (
        <Toast
          msg={{ title: 'Success', body: alert.success }}
          close={() => dispatch({ type: GLOBALTYPES.ALERT, payload: { success: null } })}
          bgColor='bg-success'
        />
      )}
    </div>
  )
}

export default Alert
