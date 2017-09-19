import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Drizzly from './components/Drizzly';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to Drizzly</h2>
        </div>
        <div className="App-intro">
          <Drizzly/>
        </div>
      </div>
    );
  }
}

export default App;
