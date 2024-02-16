import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

import Avatar from '../../Avatar'
import { AVATAR_SM } from '../../../constants'
import MenuDropdownItem from './MenuDropdownItem'
import { GLOBALTYPES } from '../../../redux/actions/globalTypes'
import { logout } from '../../../redux/actions/authAction'

const AccountMenuItem = () => {
  const { auth, theme } = useSelector((state) => state)
  const dispatch = useDispatch()
  return (
    <MenuDropdownItem
      appearance={<Avatar src={auth.user.avatar} size={AVATAR_SM}/>}
      content={
        <>
          <Link className='dropdown-item' to={`/profile/${auth.user._id}`}>
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
            onClick={() => dispatch(logout())}
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