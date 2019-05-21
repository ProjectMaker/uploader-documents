import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import CircularProgress from '@material-ui/core/CircularProgress'
import CloseIcon from '@material-ui/icons/Close'

import styles from './button-cancel-styles'

const ButtonCancel = ({classes, onClick}) => (
  <div className={classes.wrapper} onClick={onClick}>
    <Fab className={classes.button}><CloseIcon /></Fab>
    <CircularProgress size={28} className={classes.progress} />
  </div>
)

ButtonCancel.defaultProps = {
  onClick: () => {}
}

export default withStyles(styles)(ButtonCancel)
