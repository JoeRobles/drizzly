import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DragSource} from 'react-dnd';
import FlipCard from 'react-flipcard';
import Modal from './Modal';

const style = {
  position: 'absolute',
  cursor: 'move',
  height: '100px',
  width: '100px',
};

const noteSource = {
  beginDrag(props) {
    const {id, left, top, title, content} = props;

    return {id, left, top, title, content};
  },
};

@DragSource('note', noteSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))

class Note extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      content: this.props.content,
      isFlipped: false,
      isModalOpen: false
    };

    this.showBack = this.showBack.bind(this);
    this.showFront = this.showFront.bind(this);
    this.handleOnFlip = this.handleOnFlip.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  showBack() {
    this.setState({
      isFlipped: true
    }, () => {
      setTimeout(this.openModal, 700);
    });
  }

  showFront() {
    this.setState({
      isFlipped: false
    });
  }

  handleOnFlip(flipped) {
    document.getElementById('root').focus();
  }

  handleKeyDown(e) {
    if (this.state.isFlipped && e.keyCode === 27) {
      this.showFront();
    }
  }

  openModal() {
    this.setState({isModalOpen: true});
  }

  closeModal() {
    this.setState({
      isModalOpen: false
    }, () => {
      setTimeout(this.showFront, 700);
    });
  }

  render() {
    const {left, top, connectDragSource, isDragging} = this.props;
    if (isDragging) {
      return null;
    }

    return connectDragSource(
      <div className="note" style={{...style, left, top}}>
        <FlipCard
          disabled={true}
          flipped={this.state.isFlipped}
          onFlip={this.handleOnFlip}
          onKeyDown={this.handleKeyDown}>
          <div onClick={this.showBack}>  {this.props.title} </div>
          <div> {this.props.content} </div>

        </FlipCard>
        {this.state.isModalOpen && (<div className="modal">
          <Modal isOpen={this.state.isModalOpen}
                 transitionName="modal-anim">
            <div ref="backButton" onClick={this.closeModal} className="body">
              {this.props.content}
            </div>
          </Modal>
        </div>)}



      </div>
    );
  }
}

export default Note;
