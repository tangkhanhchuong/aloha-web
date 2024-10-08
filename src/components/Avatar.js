import { Avatar as AAvatar, Skeleton } from 'antd'
import { useState } from 'react'

const Avatar = ({ src, size, alt, customStyle }) => {
  const [loading, setLoading] = useState(true)

  const onLoad = () => {
    setLoading(false)
  }

  return (
    <>
      { loading && <Skeleton.Avatar size={size} /> }
      <AAvatar
        src={src}
        alt={alt}
        size={size}
        onLoad={onLoad} 
        style={{
          display: loading ? 'none' : 'inline-block',
          backgroundColor: 'white',
          ...customStyle
        }}
      />
    </>
  )
}

export default Avatar
