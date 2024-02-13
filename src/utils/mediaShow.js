export const imageShow = (src, isDarkTheme) => {
  return (
    <img
      src={src}
      alt='images'
      className='img-thumbnail'
      style={{ filter: isDarkTheme ? 'invert(1)' : 'invert(0)' }}
    />
  )
}

export const videoShow = (src, isDarkTheme) => {
  return (
    <video
      controls
      src={src}
      alt='images'
      className='img-thumbnail'
      style={{ filter: isDarkTheme ? 'invert(1)' : 'invert(0)' }}
    />
  )
}
