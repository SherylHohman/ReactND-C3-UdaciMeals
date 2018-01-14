import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addRecipe, removeFromCalendar} from '../actions'
import CalendarIcon from 'react-icons/lib/fa/calendar-plus-o';
import { capitalize } from '../utils/helpers';
import '../App.css';

class App extends Component {

  render() {
    console.log('Props:', this.props);
    return (
      <div className="container">
        <h3>Hello UdaciMeals !</h3>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return ({
    selectRecipe: (data) => dispatch(addRecipe(data)),
    remove: (data) => dispatch(removeFromCalendar(data)),
  })
}

function mapStoreToProps ( { calendar, food }) {
  const daysOfWeekOrdered=['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return {
    food,
    calendar: daysOfWeekOrdered.map((day) => ({
      day,
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        meals[meal] = calendar[day][meal]
          ? food[calendar[day][meal]]
          : null
        return meals
      }, {})
    })),
  }
};

export default connect(mapStoreToProps, mapDispatchToProps)(App);


// NOTES:  How code to Reformat Data works:
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
