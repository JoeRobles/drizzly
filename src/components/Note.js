import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DragSource} from 'react-dnd';
import FlipCard from 'react-flipcard';

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

  constructor(props){
    super(props);
    this.state = {
      title: this.props.title,
      content: this.props.content,
      isFlipped: false
    };

    this.getInitialState = this.getInitialState.bind(this);
    this.showBack = this.showBack.bind(this);
    this.showFront = this.showFront.bind(this);
    this.handleOnFlip = this.handleOnFlip.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  getInitialState() {
    return {
      isFlipped: false
    };
  }

  showBack() {
    this.setState({
      isFlipped: true
    });
  }

  showFront() {
    this.setState({
      isFlipped: false
    });
  }

  handleOnFlip(flipped) {
    if (flipped) {
      document.getElementById('root').focus();
    }
  }

  handleKeyDown(e) {
    if (this.state.isFlipped && e.keyCode === 27) {
      this.showFront();
    }
  }

  render() {
    const {left, top, connectDragSource, isDragging, children} = this.props;
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
          <div onClick={this.showBack}>
            {this.props.title}
          </div>
          <div ref="backButton" onClick={this.showFront}>
            {this.props.content}
          </div>
        </FlipCard>
      </div>
    );
  }
}

export default Note;
