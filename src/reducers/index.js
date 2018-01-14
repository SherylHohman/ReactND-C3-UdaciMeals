import { combineReducers } from 'redux';
import {
  ADD_RECIPE,
  REMOVE_FROM_CALENDAR
} from '../actions';

const sampleMenu = {
  "pizza": "crust, cheese, toppings",
  "movie popcorn": "popcorn, butter, oil, salt",
  "mimosa": "OJ, alcohol"
}

function food(state = sampleMenu, action) {
  switch (action.type){
    case ADD_RECIPE:
      const { recipe } = action;
      return ({
        ...state,
        [recipe.label]: action.recipe,  // ..so I can mentally "see" what I'm accessing -- just verifly this gives the same result, then delete and replace with below.
        // [recipe.label]: recipe,     // Udacidy codes it this way - it's cleaner!
      });
    default:
      return state;
  }
}

const initialCalendarState = {
    sunday: {
      breakfast: 'pizza',
      lunch: 'mimosa',
      dinner: 'movie popcorn',
    },
    monday: {
      breakfast: null,
      lunch: null,
      dinner: null,
    },
    tuesday: {
      breakfast: null,
      lunch: null,
      dinner: null,
    },
    wednesday: {
      breakfast: null,
      lunch: null,
      dinner: null,
    },
    thursday: {
      breakfast: null,
      lunch: null,
      dinner: null,
    },
    friday: {
      breakfast: null,
      lunch: null,
      dinner: null,
    },
    saturday: {
      breakfast: null,
      lunch: null,
      dinner: null,
    }
}

function calendar (state = initialCalendarState, action) {
  const { day, meal, recipe } = action;

  switch(action.type){
    case ADD_RECIPE:
      return ({
        ...state,
        [day]: {
          ...state[day],
          [meal]: recipe.label
        }

      });
    case REMOVE_FROM_CALENDAR:
      return ({
        ...state,
        [day]: {
          ...state[day],
          [meal]: null
        }
      });
    default:
      return state;
  }
}

export default combineReducers({
  food,
  calendar,
})


// Notes:
        // recipe.label is "pizza" - string typed in by user to label the recipe.  Hence it *must* be destructured from action as above.
        //  It's not a property name in itself, it's a variable holding
        //  the string name of the property to be added.

