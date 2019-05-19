import React, { Component } from 'react'
import axios from 'axios'

import FileUploader from './file-uploader'
import {uploadFileBinary} from '../../services/uploader'
import {UPLOADING_START, UPLOADING_END, UPLOADING_ERROR} from "../../constants";

class FileUploaderContainer extends Component {
  state = {
    file: null,
    uploadingStatus: null,
    source: null
  }

  handleCancel = () => {
    this.state.source.cancel()
  }
  handleUpload = (file) => {
    this.setState({file, uploadingStatus: UPLOADING_START})
    const fr = new FileReader()
    fr.onload = (r) => {
      const CancelToken = axios.CancelToken
      const source = CancelToken.source()
      this.setState(
        () => ({source}),
        () => {
          uploadFileBinary(fr.result, source.token)
            .then(r => this.setState({uploadingStatus: UPLOADING_END}))
            .catch(err => this.setState({uploadingStatus: UPLOADING_ERROR}))
        }
      )
    }
    fr.readAsBinaryString(file)
  }

  render() {
    const {file, uploadingStatus} = this.state
    console.log(uploadingStatus)
    return (
      <FileUploader file={file} upload={this.handleUpload} uploadingStatus={uploadingStatus} cancel={this.handleCancel}/>
    )
  }
}

export default FileUploaderContainer
