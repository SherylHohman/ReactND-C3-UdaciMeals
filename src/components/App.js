import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addRecipe, removeFromCalendar} from '../actions'
import logo from '../logo.svg';
import '../App.css';

class App extends Component {
  // may not have the syntax exactly right here ..
  // this is available simply because we `connect`ed App.
  // this could be added to an onClick handler, for instance

  selectRecipeMethod1 = (data) => {
    this.props.dispatch(addRecipe(data));
  };
  removeRecipeMethod1 = (data) => {
    this.props.dispatch(removeFromCalendar(data));
  };

  render() {
    console.log('Props:', this.props);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome !</h1>
        </header>
        <p className="App-intro">Here is your Sunday Breakfast: {`${this.props.calendar[0].breakfast}`}</p>
      </div>
    );
  }
}

function mapStoreToProps (calendar) {
  const daysOfWeekOrdered=['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return {
    calendar: daysOfWeekOrdered.map((day) => ({
      day,
      // A)
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        // B)
        meals[meal] = calendar[day][meal]
          ? calendar[day][meal]
          : null
        return meals
        // C)
      }, {})
    })),
  }
      // A)
      //  meal is the Object.key that we're reducing thru,
      //  meals is accumulator- grouping the 3 meals together into an
      //    object of meals. keys/meal will be: breakfast, lunch, dinner
      //  why we need to explicitely set to null, when initializer of
      //    calendar obj in store (src/reducers/index.js calendar
      //    initialCalendarState) already has them initialized at
      //    `null`, I'm not sure..

        // B)
        //  not using dot notation because named properties are a string value.
        //  The variable (meal) is the string value we're using as the property name!

    // C)
  // returns an array of objects, where each element of the array is an obj of form:
  //  calendar[0]: {
  //    day: sunday,
  //    meal: {
  //      breakfast: null,
  //      lunch: null,
  //      dinner: null
  //    }
  //  }

  //  `breakfast`, `lunch`, `dinner` were pulled from `Object.keys` off
  //    the store's calendar object.
  //  and the `day` is pulled from daysOfWeek AND calendar object.
  //  reason for this is that an array needs to be ordered. daysOfWeek
  //  provides this ordering. If it was simply pulled from the calendar object (using Object.keys, as we do for the meals), the days of the week would have no gauranteed order, which is inappropriate for a calendar!  We need the days to be consistently ordered.

};

export default connect(mapStoreToProps)(App);
