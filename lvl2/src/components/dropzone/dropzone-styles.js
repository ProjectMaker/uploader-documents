export default theme => ({
  dropzone: {
    border: '2px',
    borderColor: theme.palette.primary.main,
    borderRadius: '5px',
    backgroundColor: theme.palette.common.white,
    minHeight: '150px',
    maxWidth: '720px',
    padding: '54px',
    boxSizing: 'border-box',

    '&.default': {
      borderStyle: 'solid'
    },

    '&.dragging': {
      borderStyle: 'dashed'
    }
  },
  message: {
    textAlign: 'center',
    margin: '40px 0'
  }
})
