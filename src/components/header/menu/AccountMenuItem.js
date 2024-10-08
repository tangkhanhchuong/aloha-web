import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

import { AVATAR_SM } from '../../../constants'
import { logout } from '../../../redux/actions/authAction'
import { GLOBALTYPES } from '../../../redux/actions/globalTypes'
import Avatar from '../../Avatar'
import MenuDropdownItem from './MenuDropdownItem'

const AccountMenuItem = () => {
  const { auth, theme } = useSelector((state) => state)
  const dispatch = useDispatch()
  return (
    <MenuDropdownItem
      appearance={<Avatar src={auth.user.avatar} size={AVATAR_SM}/>}
      content={
        <>
          <Link className='dropdown-item' to={`/profile/${auth.user.userId}`}>
            Profile
          </Link>

          <label
            htmlFor='theme'
            className='dropdown-item'
            onClick={() =>
              dispatch({
                type: GLOBALTYPES.THEME,
                payload: !theme,
              })
            }
          >
            {theme ? 'Light mode' : 'Dark mode'}
          </label>

          <div className='dropdown-divider'></div>
          <Link
            className='dropdown-item'
            to='/'
            onClick={() => dispatch(logout(auth.token))}
          >
            Logout
          </Link>
        </>
      }
      showDropdownIcon={true}
    />
  )
}

export default AccountMenuItem