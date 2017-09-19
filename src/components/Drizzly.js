import React, {Component} from 'react';
import PropTypes from 'prop-types';
import update from 'react/lib/update';

import {DropTarget, DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import uuid from 'uuid';
import Note from './Note';

const styles = {
  width: '99%',
  height: '700px',
  border: '1px solid black',
  position: 'relative'
};

const noteTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);

    component.moveNote(item.id, left, top);
  }
};

@DragDropContext(HTML5Backend)

@DropTarget('note', noteTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))

class Drizzly extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.notes = {
      a: {top: 20, left: 80, title: 'Drag me around'},
      b: {top: 180, left: 20, title: 'Drag me too'},
    };
    this.state = {
      notes: this.notes,
      newNoteTitle: ''
    };

    this.newNoteTitle = this.newNoteTitle.bind(this);
    this.addNewNote = this.addNewNote.bind(this);
  }

  moveNote(id, left, top) {
    this.setState(update(this.state, {
      notes: {
        [id]: {
          $merge: {left, top},
        },
      },
    }));
  }

  newNoteTitle(event) {
    this.setState({newNoteTitle: event.target.value});
  }

  addNewNote() {
    let id = uuid();
    let note = {top: 10, left: 10, title: this.state.newNoteTitle};

    this.setState({
      notes: {
        [id]: note,
        ...this.state.notes
      },
      newNoteTitle: ''
    });
  }

  render() {
    const {connectDropTarget} = this.props;
    const {notes} = this.state;

    return connectDropTarget(
      <div>
        <div>
          <input
            onChange={this.newNoteTitle}
            placeholder="Enter note's title"
            type="text"
            value={this.state.newNoteTitle}/>
          <button onClick={this.addNewNote}>Add New Note</button>
        </div>
        <div style={styles}>
          {Object.keys(notes).map((key) => {
            const {left, top, title} = notes[key];
            return (
              <Note key={key} id={key} left={left} top={top} title={title}>{title}</Note>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Drizzly;
