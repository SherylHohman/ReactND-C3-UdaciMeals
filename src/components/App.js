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
      <div>
        <input
          type='text'
          ref={(input) => this.input = input}
          placeholder="Monday's Breakfast"
        />
        <button onClick={this.submitFood}>Submit</button>

        <pre>
          Monday's Breakfast: {this.state.calendar && this.state.calendar.monday.breakfast}
        </pre>
      </div>
    );
  }
}

export default App;
