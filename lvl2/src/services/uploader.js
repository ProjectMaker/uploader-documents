import axios from 'axios'
import { API_UPLOAD_URL, UPLOADING_CANCELED } from '../constants'

export const uploadFile = (file, cancelToken) => {

  return axios.post(API_UPLOAD_URL, file, {
    cancelToken,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).catch(err => {
    if (axios.isCancel(err)) {
      return Promise.reject(UPLOADING_CANCELED)
    }
    return Promise.reject(err)
  })
}
