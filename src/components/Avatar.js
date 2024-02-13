import React from 'react'
import { useSelector } from 'react-redux'

const Avatar = ({ src, size }) => {
  const { userSettings } = useSelector((state) => state)

  return (
    <img
      src={src}
      alt='avatar'
      className={size}
      style={{ filter: `${userSettings.isDarkTheme ? 'invert(1)' : 'invert(0)'}` }}
    />
  )
}

export default Avatar
