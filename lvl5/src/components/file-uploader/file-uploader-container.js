import React, { Component } from 'react'
import axios from 'axios'
import FileUploader from './file-uploader'
import watcher from '../../services/watcher'
import {uploadFile, findTotal} from '../../services/uploader'
import {
  UPLOADING_START,
  UPLOADING_CANCELED,
  UPLOADING_ERROR,
  UPLOADING_END,
  FIND_TOTAL_START,
  FIND_TOTAL_END,
  FIND_TOTAL_ERROR,
  UPDLOAD_FILE_EVENT
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

  canUpload = () => {
    const {uploadingStatus} = this.state
    return uploadingStatus !== UPLOADING_START
  }
  handleCancel = () => {
    this.cancelSource.cancel()
  }

  handleUpload = async (file) => {
    if (!this.canUpload()) {
      return
    }
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
    watcher.on(UPDLOAD_FILE_EVENT, this.handleUpload)
  }

  componentWillUnmount () {
    watcher.off(UPDLOAD_FILE_EVENT, this.handleUpload)
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
