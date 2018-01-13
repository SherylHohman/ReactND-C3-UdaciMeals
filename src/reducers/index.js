import {
  ADD_RECIPE,
  REMOVE_FROM_CALENDAR
} from '../actions';

function food(state = {}, action) {
  switch (action.type){
    case ADD_RECIPE:
      const { recipe } = action;
      return ({
        ...state,

        [recipe.label]: action.recipe,  // ..so I can mentally "see" what I'm accessing
        // [recipe.label]: recipe,     // Udacidy codes it this way - it's cleaner!

        // recipe.label is "pizza" - string typed in by user to label the recipe.  Hence it *must* be destructured from action as above.
        //  It's not a property name in itself, it's a variable holding
        //  the string name of the property to be added.

      });
    default:
      return state;
  }
}

const initialCalendarState = {
    sunday: {
      breakfast: null,
      lunch: null,
      dinner: null,
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

export default calendar
