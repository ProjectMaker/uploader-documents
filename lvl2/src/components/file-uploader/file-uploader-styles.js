import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'

export default {
  uploadingFile: {
    display: 'flex',
    alignItems: 'center',
  },

  uploadingStatus: {
    marginLeft: '20px',

    '& .error': {
      color: red[500]
    },

    '& .success': {
      color: green[500]
    }
  }
}
