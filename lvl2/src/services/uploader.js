import { API_UPLOAD_URL } from '../constants'

export const uploadFileBinary = (content) => {
  return fetch(API_UPLOAD_URL, { method: 'POST', body: content })
}
