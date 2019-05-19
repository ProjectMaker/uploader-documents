import React from 'react'
import classNames from 'classnames'
import {withStyles} from '@material-ui/core/styles'
import Typography from "@material-ui/core/Typography/Typography"

import styles from './dropzone-styles'

const DropZone = ({classes, dragging}) => {
  let inputElement
  return (
    <div className={classNames(classes.dropzone, dragging ? 'dragging' : 'default')} onClick={() => inputElement.click()}>
      <input ref={input => inputElement = input} type="file" style={{display: 'none'}}
             onChange={e => onChooseFile(e.target.files[0])}/>
      <div className={classes.message}>
        <Typography variant="h5" gutterBottom>
          {dragging ? 'Drop here' : 'Drop file here'}
        </Typography>
      </div>
    </div>
  )
}

export default withStyles(styles)(DropZone)
