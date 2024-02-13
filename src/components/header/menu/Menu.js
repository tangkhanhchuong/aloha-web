import { Link, useLocation } from 'react-router-dom'

import AccountMenuItem from './AccountMenuItem'
import NotificationMenuItem from './NotificationMenuItem'
import navLinks from './navLinks'

const Menu = () => {
  const { pathname } = useLocation()

  const isActive = (pn) => {
    if (pn === pathname) return 'active'
  }

  return (
    <div className='menu'>
      <ul className='navbar-nav flex-row'>
        {navLinks.map((link, index) => (
          <li className={`nav-item px-1 ${isActive(link.path)}`} key={index}>
            <Link className='nav-link' to={link.path}>
              <span className='material-icons'>{link.icon}</span>
            </Link>
          </li>
        ))}

        <li className='nav-item dropdown px-1' style={{ opacity: 1 }}>
          <NotificationMenuItem />
        </li>

        <li className='nav-item dropdown pl-1' style={{ opacity: 1 }}>
          <AccountMenuItem />
        </li>
      </ul>
    </div>
  )
}

export default Menu
