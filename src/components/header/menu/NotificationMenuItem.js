import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import MenuDropdownItem from './MenuDropdownItem'
import NotificationModal from '../../NotificationModal'

const NotificationMenuItem = () => {
  const [numberOfNewNotification, setNumberOfNewNotification] = useState(false)
  const { notification } = useSelector((state) => state)

  useEffect(() => {
    if (!notification || !notification.data || !notification.data.length) {
      return setNumberOfNewNotification(0)
    }
    setNumberOfNewNotification(
      notification.data.filter((item) => !item.isRead).length
    )
  }, [notification, setNumberOfNewNotification])
  return (
    <MenuDropdownItem
      appearance={
        <>
          <span
            className='material-icons'
            style={{ color: numberOfNewNotification ? 'crimson' : '' }}
          >
            notifications
          </span>
          {
            numberOfNewNotification > 0 ? <span className='notification_length'>{numberOfNewNotification}</span> : null
          }
        </>
      }
      content={<NotificationModal />}
    />
  )
}

export default NotificationMenuItem