import React, { Component } from 'react'
import axios from 'axios'

import FileUploader from './file-uploader'
import {uploadFile} from '../../services/uploader'
import {UPLOADING_START, UPLOADING_CANCELED, UPLOADING_ERROR, UPLOADING_END} from "../../constants"

const CancelToken = axios.CancelToken

class FileUploaderContainer extends Component {
  state = {
    file: null,
    uploadingStatus: null
  }

  cancelSource = null

  handleCancel = () => {
    this.cancelSource.cancel()
  }

  handleUpload = (file) => {
    this.setState({file, uploadingStatus: UPLOADING_START})
    this.cancelSource = CancelToken.source()
    uploadFile(file, this.cancelSource.token)
      .then(response => this.setState({uploadingStatus: UPLOADING_END}))
      .catch(err => {
        if (err === UPLOADING_CANCELED) {
          this.setState({uploadingStatus: UPLOADING_CANCELED})
        } else {
          this.setState({uploadingStatus: UPLOADING_ERROR})
        }
      })
  }

  render() {
    const {file, uploadingStatus} = this.state
    return (
      <FileUploader
        file={file}
        upload={this.handleUpload}
        uploadingStatus={uploadingStatus}
        cancel={this.handleCancel}/>
    )
  }
}

export default FileUploaderContainer
