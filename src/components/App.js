import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { addRecipe } from '../actions/index.js';

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

  submitFood = () => {
    // note form of function above ! not: submitFood() {...} method. UGH.

    this.props.store.dispatch(addRecipe(
      {
        day: 'monday',
        meal: 'breakfast',
        recipe: {
          label: this.input.value
        }
      }
    ));

    // clear input form
    this.input.value = '';
  }

  render(){
    return (
      <div>
        <input
          type='text'
          ref={(input) => this.input = input}
          placeholder="Monday's Breakfast"
        />
        <button onClick={this.submitFood}>Submit</button>

        <pre>
          Monday's Breakfast: {this.state.calendar &&
                               this.state.calendar.monday.breakfast
                              }
        </pre>
      </div>
    );
  }


}

export default App;
