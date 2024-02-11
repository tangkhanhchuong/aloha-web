import { postDataAPI } from './fetchData'

export const checkImage = (file) => {
  let err = ''
  if (!file) return (err = 'File does not exist.')

  if (file.size > 1024 * 1024)
    // 1mb
    err = 'The largest image size is 1mb.'

  if (file.type !== 'image/jpeg' && file.type !== 'image/png')
    err = 'Image format is incorrect.'

  return err
}

export const imageUpload = async (images, token) => {
  const formData = new FormData()
  for (const item of images) {
    if (item.camera) {
      formData.append('files', item.camera)
    } else {
      formData.append('files', item)
    }
  }
  const res = await postDataAPI('files/upload', formData, token)
  return res.data.files
}
