import red from '@material-ui/core/colors/red'

export default theme => ({
  wrapper: {
    position: 'relative',
    cursor: 'pointer'
  },
  progress: {
    color: red[500],
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  button: {
    backgroundColor: theme.palette.common.white,
    color: red[500],
    width: '28px',
    height: '28px',
    minHeight: '28px'
  }
})
