import { combineReducers } from 'redux';
import {
  ADD_RECIPE,
  REMOVE_FROM_CALENDAR
} from '../actions';

const sampleMenu = {
  // leftover Pizza isn't actually in Edamam..
  "Leftover Pizza": {
    label: "Leftover Pizza",
    image: "https://www.edamam.com/web-img/bc8/bc803d882221f2c29d280bd9f6155ab0.jpg",
    ingredientLines: [
      "cheese",
      "crust",
      "toppings",
    ]
  },
  "The Bitter Mimosa Recipe": {
    label: "The Bitter Mimosa Recipe",
    image: "https://www.edamam.com/web-img/f5d/f5da659cdd28b390f172b34c8ec56092.jpg",
    ingredientLines: [
      "1/2 ounce Cynar",
      "3 ounces freshly squeezed pink grapefruit juice from 1 to 2 grapefruits",
      "3 ounces chilled sparkling wine"
    ],
  },

  "Herbed Buttermilk Popcorn recipes": {
    label: "Herbed Buttermilk Popcorn recipes",
    image: "https://www.edamam.com/web-img/852/8527512be888b22a6c73108944d40d44",
    ingredientLines: [
      "1 tablespoon powdered buttermilk",
      "1 teaspoon garlic powder",
      "1 teaspoon onion powder",
      "1 teaspoon lemon pepper",
      "1/2 teaspoon dried dill weed",
      "1/2 teaspoon powdered chicken bouillon or kosher salt",
      "1 tablespoon corn oil",
      "1/3 cup popcorn kernals",
      "2 tablespoons unsalted butter"
    ],
  }
}

const sampleCalendar = {
  sunday: {
    breakfast: "Leftover Pizza",
    lunch: "The Bitter Mimosa Recipe",
    dinner: "Herbed Buttermilk Popcorn recipes",
  },
}

function food(state = sampleMenu, action) {
  switch (action.type){
    case ADD_RECIPE:
      const { recipe } = action;
      return ({
        ...state,
        [recipe.label]: recipe
      });
    default:
      return state;
  }
}

const initialCalendarState = {
    sunday: {
      breakfast: null,
      lunch: null,
      dinner: null
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

function calendar (state = { ...initialCalendarState, ...sampleCalendar }, action) {
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
    // recipe.label is "pizza" - string typed in by user to label the recipe.
    //   Hence it *must* be destructured from action as above.
    //   It's not a property name in itself.
    //   It's a variable holding
    //   the string name of the property to be added.

