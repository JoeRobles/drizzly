import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Drizzly from './components/Drizzly';

const hide = {
  display: 'none'
};

class App extends Component {
  render() {
    return (
      <div>
        <Drizzly/>
        <div style={hide} id="demo">
          <h2 id="modal-title">demo</h2>
        </div>
      </div>
    );
  }
}

export default App;
