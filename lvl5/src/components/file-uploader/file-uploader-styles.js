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
  },

  total: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '1px',
    marginBottom: '10px'
  },

  totalStatus: {
    marginLeft: '20px',

    "& .success": {
      color: green[500]
    }
  },

  progress: {
    color: green[500]
  }
}
