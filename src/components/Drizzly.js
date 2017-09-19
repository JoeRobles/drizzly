import React, {Component} from 'react';
import PropTypes from 'prop-types';
import update from 'react/lib/update';
import {DropTarget, DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Note from './Note';
import uuid from 'uuid';

const styles = {
  width: '99%',
  height: '700px',
  border: '1px solid black',
  position: 'relative',
};

const noteTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);

    component.moveNote(item.id, left, top);
  },
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
      notes : this.notes,
      newNote: ''
    };

    this.newNoteContent = this.newNoteContent.bind(this);
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

  newNoteContent(event) {
    this.setState({newNote: event.target.value});
  }

  addNewNote() {
    let id = uuid();
    let note = {top: 10, left: 10, title: this.state.newNote};
    console.log(note);

    this.setState({
      notes: {
        [id]:note,
      ...this.state.notes},
      newNote: ''
    });
  }

  render() {
    const {connectDropTarget} = this.props;
    const {notes} = this.state;

    return connectDropTarget(
      <div>
        <div>
          <input
            onChange={this.newNoteContent}
            placeholder="Enter a new note's content"
            type="text"
            value={this.state.newNote}/>
          <button onClick={this.addNewNote}>New Note</button>
        </div>
        <div style={styles}>
          {Object.keys(notes).map((key) => {
            const {left, top, title} = notes[key];
            return (
              <Note
                key={key}
                id={key}
                left={left}
                top={top}>
                {title}
              </Note>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Drizzly;