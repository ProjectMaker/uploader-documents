import React, { Component } from 'react'
import axios from 'axios'

import FileUploader from './file-uploader'
import {uploadFile, findTotal} from '../../services/uploader'
import {
  UPLOADING_START,
  UPLOADING_CANCELED,
  UPLOADING_ERROR,
  UPLOADING_END,
  FIND_TOTAL_START,
  FIND_TOTAL_END,
  FIND_TOTAL_ERROR
} from "../../constants"

const CancelToken = axios.CancelToken

class FileUploaderContainer extends Component {
  state = {
    file: null,
    uploadingStatus: null,
    total: 0,
    totalStatus: null
  }

  cancelSource = null

  handleCancel = () => {
    this.cancelSource.cancel()
  }

  handleUpload = async (file) => {
    this.setState({file, uploadingStatus: UPLOADING_START})
    this.cancelSource = CancelToken.source()
    try {
      await uploadFile(file, this.cancelSource.token)
      this.setState({uploadingStatus: UPLOADING_END})
      await this.fetchTotal()
    } catch (err) {
      if ([UPLOADING_ERROR, UPLOADING_CANCELED].includes(err.message)) {
        this.setState({uploadingStatus: err.message})
      }
    }
  }

  fetchTotal = async () => {
    this.setState({totalStatus: FIND_TOTAL_START})
    try {
      const total = await findTotal()
      this.setState({total, totalStatus: FIND_TOTAL_END})
    } catch (err) {
      this.setState({totalStatus: FIND_TOTAL_ERROR})
    }
  }

  async componentDidMount() {
    await this.fetchTotal()
  }

  render() {
    const {file, uploadingStatus, total, totalStatus} = this.state
    return (
      <FileUploader
        file={file}
        total={total}
        totalStatus={totalStatus}
        upload={this.handleUpload}
        uploadingStatus={uploadingStatus}
        cancel={this.handleCancel}/>
    )
  }
}

export default FileUploaderContainer
