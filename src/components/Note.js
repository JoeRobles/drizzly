import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DragSource} from 'react-dnd';
import $ from 'jquery';

const style = {
  position: 'absolute',
  border: '1px solid gray',
  backgroundColor: '#ff0',
  padding: '0.5rem 1rem',
  cursor: 'move',
  height: '100px',
  width: '100px',
};

const noteSource = {
  beginDrag(props) {
    const {id, left, top} = props;

    return {id, left, top};
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
      title: this.props.title
    };

    this.setModalValues = this.setModalValues.bind(this);
  }

  setModalValues(event) {
    console.log('executed');
    this.setState({title: event.target.value});
    console.log(this.state.title);
    console.log(this.state.title);
    $('#modal-title').html(this.state.title);

  }

  render() {
    const {left, top, connectDragSource, isDragging, children} = this.props;
    if (isDragging) {
      return null;
    }

    return connectDragSource(
      <div onClick={this.setModalValues} value={this.props.title} href="#demo" data-toggle="adaptive-modal" style={{...style, left, top}}>
        {children}
      </div>
    );
  }
}

export default Note;
