import React from 'react'
import classNames from 'classnames'
import {withStyles} from '@material-ui/core/styles'
import Typography from "@material-ui/core/Typography/Typography"

import styles from './dropzone-styles'

const DropZone = ({classes, dragging, onChooseFile}) => {
  let inputElement

  const handleChooseFile = ({target}) => {
    onChooseFile(target.files[0])
    target.value = ''
  }

  return (
    <div className={classNames(classes.dropzone, dragging ? 'dragging' : 'default')} onClick={() => inputElement.click()}>
      <input ref={input => inputElement = input} type="file" style={{display: 'none'}} onChange={handleChooseFile}/>
      <div className={classes.message}>
        <Typography variant="h5" gutterBottom>
          {dragging ? 'Drop here' : 'Drop file here or click to upload'}
        </Typography>
      </div>
    </div>
  )
}

export default withStyles(styles)(DropZone)
