import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

class App extends Component {
  state = {
    calendar: null
  }

  componentDidMount(){
    const { store } = this.props;

    // anytime store is modified, call setState to update the calendar `state` for this component
    store.subscribe(() => {
      this.setState(() => ({
        calendar: store.getState()
      }))
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
