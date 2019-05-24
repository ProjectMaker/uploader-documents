import axios from 'axios'
import {
  API_UPLOAD_URL,
  API_FIND_TOTAL_URL,
  UPLOADING_CANCELED,
  UPLOADING_ERROR,
  FIND_TOTAL_ERROR
} from '../constants'

export const uploadFile = async (file, cancelToken) => {
  console.log(file)
  try {
    // await fetch(API_UPLOAD_URL, { method: 'POST', body: file})

    const reader = new FileReader();
    reader.onload = async function(e) {
      const result = e.target.result;
      console.log(`result: ${result} of type ${typeof(result)}`);
      const blob = new Blob([reader.result], { type: 'image/png' })
      await axios.post(API_UPLOAD_URL, blob, {
        headers: {
          'Content-Type': 'image/png'
        }
      })
    }

    reader.readAsDataURL(file)

    // await fetch(API_UPLOAD_URL, { method: 'POST', body: file})
    /*
    const form = new FormData()
    form.append('file', file, {
      filename: 'popo.png',
      contentType: 'image/png',
    });


    await axios.post(API_UPLOAD_URL, form, {
      cancelToken,
    })
    */
  } catch (err) {
    console.log(err)
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
