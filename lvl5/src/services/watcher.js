import EventEmitter from 'events'
import watch from 'node-watch'
import os from 'os'
import fs from 'fs'
import path from 'path'

import { getMimeType } from '../utils'
import {
  UPDLOAD_FILE_EVENT,
  EXTENSIONS_SUPPORTED,
  WATCH_DIR,
  SIZE_MAX
} from '../constants'

const PATH_TO_WATCH = `${os.homedir()}/${WATCH_DIR}`

class Watcher extends EventEmitter {
  constructor() {
    super()

    watch(PATH_TO_WATCH, { recursive: true }, (evt, name) => {
      if (evt === 'update' && this.checkFile(name)) {
        this.readFile(name)
      }
    })
  }

  readFile(file) {
    fs.readFile(file, (err, data) => {
      if (!err) {
        const mimeType = getMimeType(path.extname(file))
        const fileName = path.basename(file)
        const blob = new Blob([data], {type: mimeType})
        const fileOfBlob = new File([blob], fileName, {
          type: mimeType
        })
        this.emit(UPDLOAD_FILE_EVENT, fileOfBlob)
      }
    })
  }

  checkFile(file) {
    return this.checkSize(file) && this.checkExtension(file)
  }

  checkSize(file) {
    const stats = fs.statSync(file)
    if (stats.size > SIZE_MAX) {
      return false
    }
    return true
  }

  checkExtension(file) {
    return EXTENSIONS_SUPPORTED.includes(path.extname(file))
  }
}

export default new Watcher()
