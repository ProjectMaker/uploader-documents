import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography/Typography'

import {
  UPLOADING_START,
  UPLOADING_END,
  UPLOADING_ERROR,
  UPLOADING_CANCELED,
  FIND_TOTAL_START
} from '../../constants'
import DropZone from '../dropzone'
import ButtonCancel from '../button-cancel'
import styles from './file-uploader-styles'

const FileUploader = ({classes, upload, total, totalStatus, file, uploadingStatus, cancel}) => (
  <div>
    <div className={classes.total}>
      <Typography variant="h5">Number of binary documents</Typography>
      <div className={classes.totalStatus}>
        {totalStatus === FIND_TOTAL_START ? (
          <CircularProgress className={classes.progress} size={28} color="secondary" />
        ) : (
          <Typography variant="h5" className="success">{total.toLocaleString()}</Typography>
        )}
      </div>
    </div>
    <DropZone onDrop={upload}/>
    {file && (
      <div className={classes.uploadingFile}>
        <Typography>{file.name}</Typography>
        <div className={classes.uploadingStatus}>
          {uploadingStatus === UPLOADING_END && <Typography className="success">Uploading end</Typography>}
          {uploadingStatus === UPLOADING_ERROR && <Typography className="error">Uploading error</Typography>}
          {uploadingStatus === UPLOADING_CANCELED && <Typography className="error">Uploading canceled</Typography>}
          {uploadingStatus === UPLOADING_START && <ButtonCancel onClick={cancel}/>}
        </div>
      </div>
    )}
  </div>
)

export default withStyles(styles)(FileUploader)
