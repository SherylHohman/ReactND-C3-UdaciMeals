import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../logo.svg';
import '../App.css';

class App extends Component {
  render() {
    console.log('Props:', this.props);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome !</h1>
        </header>
        <p className="App-intro">Here is your meal: {`${this.props.calendar.saturday.breakfast}`}</p>
      </div>
    );
  }
}

function mapStateToProps (calendar) {
  return calendar;
}

export default connect(mapStateToProps)(App);
