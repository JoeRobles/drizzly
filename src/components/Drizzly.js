import React, {Component} from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './Container';

class Drizzly extends Component {

  render() {
    const style = {
      display: "flex",
      justifyContent: "space-around",
      paddingTop: "20px"
    };

    const list = [
      {id: 1, text: "Item 1"},
      {id: 2, text: "Item 2"},
      {id: 3, text: "Item 3"}
    ];

    return (
      <div style={{...style}}>
        <Container id={1} list={list}/>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Drizzly);