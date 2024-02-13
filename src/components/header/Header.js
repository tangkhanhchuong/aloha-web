import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from 'antd'

import Menu from './menu/Menu'
import Search from './Search'
import logo from '../../images/konoha-logo.png'

const Header = () => {
  return (
    <div className='header bg-light'>
      <nav
        className='navbar navbar-expand-lg navbar-light 
          bg-light justify-content-between align-middle'
      >
        <div className='row align-items-center pl-4' style={{ gap: '16px' }}>
          <Link to='/' className='logo'>
            <h1 className='p-0 m-0' onClick={() => window.scrollTo({ top: 0 })}>
              <Avatar
                src={logo}
                size={40}
                shape='circle'
              />
            </h1>
          </Link>
          <Search />
        </div>
        <div>
          <Menu />
        </div>
      </nav>
    </div>
  )
}

export default Header
