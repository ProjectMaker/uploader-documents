import React, {Component, createRef} from 'react'
import PropTypes from 'prop-types'
import DropZone from './dropzone'

class DropZoneContainer extends Component {
  dropRef = createRef()

  state = {
    dragging: false
  }

  handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  handleDragIn = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.dragCounter++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({dragging: true})
    }
  }

  handleDragOut = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (this.dragCounter > 0) return
    this.setState({dragging: false})
  }

  handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.props.onDrop(e.dataTransfer.files[0])
      e.dataTransfer.clearData()
      this.dragCounter = 0
    }
  }

  componentDidMount() {
    this.dragCounter = 0

    const div = this.dropRef.current
    div.addEventListener('dragenter', this.handleDragIn)
    div.addEventListener('dragleave', this.handleDragOut)
    div.addEventListener('dragover', this.handleDrag)
    div.addEventListener('drop', this.handleDrop)
  }

  componentWillUnmount() {
    const div = this.dropRef.current
    div.removeEventListener('dragenter', this.handleDragIn)
    div.removeEventListener('dragleave', this.handleDragOut)
    div.removeEventListener('dragover', this.handleDrag)
    div.removeEventListener('drop', this.handleDrop)
  }

  render() {
    const { dragging } = this.state
    const { onDrop } = this.props

    return (
      <div ref={this.dropRef}>
        <DropZone dragging={dragging} onChooseFile={onDrop} />
      </div>
    )
  }
}

DropZoneContainer.propTypes = {
  onDrop: PropTypes.func.isRequired
}

export default DropZoneContainer
