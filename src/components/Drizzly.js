import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'react/lib/update';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Note from './Note';

const styles = {
  width: '99%',
  height: '700',
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

export default class Drizzly extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      notes: {
        a: { top: 20, left: 80, title: 'Drag me around' },
        b: { top: 180, left: 20, title: 'Drag me too' },
      },
    };
  }

  moveNote(id, left, top) {
    this.setState(update(this.state, {
      notes: {
        [id]: {
          $merge: { left, top },
        },
      },
    }));
  }

  render() {
    const { connectDropTarget } = this.props;
    const { notes } = this.state;

    return connectDropTarget(
      <div style={styles}>
        {Object.keys(notes).map((key) => {
          const { left, top, title } = notes[key];
          return (
            <Note
              key={key}
              id={key}
              left={left}
              top={top}
            >
              {title}
            </Note>
          );
        })}
      </div>,
    );
  }
}