import React from 'react'
import Typography from '@material-ui/core/Typography/Typography'

import { UPLOADING_END } from '../../constants'
import DropZone from '../dropzone'

const FileUploader = ({upload, file, uploadingStatus}) => (
  <div>
    <DropZone onDrop={upload}/>
    {file && uploadingStatus !== UPLOADING_END && (
      <div>
        <Typography>Uploading file : {file.name} {uploadingStatus}</Typography>
      </div>
    )}
  </div>
)

export default FileUploader
