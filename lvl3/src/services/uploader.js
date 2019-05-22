import axios from 'axios'
import {
  API_UPLOAD_URL,
  API_FIND_TOTAL_URL,
  UPLOADING_CANCELED,
  UPLOADING_ERROR,
  FIND_TOTAL_ERROR
} from '../constants'

export const uploadFile = async (file, cancelToken) => {
  try {
    await axios.post(API_UPLOAD_URL, file, {
      cancelToken,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  } catch (err) {
    if (axios.isCancel(err)) {
      throw new Error(UPLOADING_CANCELED)
    }
    throw new Error(UPLOADING_ERROR)
  }
}

export const findTotal = async () => {
  try {
    const {data} = await axios.get(API_FIND_TOTAL_URL)
    const binaryResource = data.rest[0].resource.find(resource => resource.type === 'Binary')
    return binaryResource.extension[0].valueDecimal
  } catch (err) {
    throw new Error(FIND_TOTAL_ERROR)
  }
}
