import React, {Component} from 'react'
import Typography from '@material-ui/core/Typography/Typography'
import DropZone from '../dropzone'

class FileUploader extends Component {
  state = {
    file: null
  }

  handleUpload = (file) => {
    this.setState({file})
  }

  render() {
    const {file} = this.state
    return (
      <div>
        <DropZone onDrop={this.handleUpload}/>
        {file && (
          <div>
            <Typography>Uploading file : {file.name}</Typography>
          </div>
        )}
      </div>
    )
  }
}

export default FileUploader
