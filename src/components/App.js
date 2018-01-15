import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import FoodList from './FoodList';
import ShoppingList from './ShoppingList';
import { addRecipe, removeFromCalendar, selectRecipe} from '../actions';
import { fetchRecipes } from '../utils/api';
import { capitalize } from '../utils/helpers';
import CalendarIcon   from 'react-icons/lib/fa/calendar-plus-o';
import ArrowRightIcon from 'react-icons/lib/fa/arrow-circle-right';
import Loading from 'react-loading';

class App extends Component {

  state = {
    foodModalOpen: false,
    meal: null,
    day: null,
    food: null,
    loadingFood: false,
    ingredientsModalOpen: false,
    loadingFood: false,
  }

  openFoodModal = ({ meal, day }) => {
    this.setState(() => ({
      foodModalOpen: true,
      meal,
      day,
    }))
  }
  closeFoodModal = () => {
    this.setState(() => ({
      foodModalOpen: false,
      meal: null,
      day: null,
      food: null,
    }))
  }

  searchFood = (e) => {
    if (!this.input.value) {
      return
    }

    e.preventDefault()

    this.setState(() => ({ loadingFood: true }))

    fetchRecipes(this.input.value)
      .then((food) => this.setState(() => ({
        food,
        loadingFood: false,
      })))
  }

  openIngredientsModal = () => this.setState(() => (
    { ingredientsModalOpen: true })
  )
  closeIngredientsModal = () => this.setState(() => (
    { ingredientsModalOpen: false })
  )
  generateShoppingList = () => {
    return this.props.calendar.reduce((result, { meals }) => {
      const { breakfast, lunch, dinner } = meals

      breakfast && result.push(breakfast)
      lunch && result.push(lunch)
      dinner && result.push(dinner)

      return result
    }, [])
    .reduce((ingredients, { ingredientLines }) => ingredients.concat(ingredientLines), [])
  }

  render() {
    const mealOrder = ['breakfast', 'lunch', 'dinner'];
    const { foodModalOpen, loadingFood, food, ingredientsModalOpen } = this.state
    const { calendar, remove, selectRecipe } = this.props;
    console.log(this.props, this.state);

    return (
      <div className="container">

        <div className='nav'>
          <h1 className='header'>UdaciMeals</h1>
          <button
            className='shopping-list'
            onClick={this.openIngredientsModal}>
              Shopping List
          </button>
        </div>

        <ul className="meal-types">
          {mealOrder.map((mealType) => (
            <li key={mealType} className='subheader'>
              {capitalize(mealType)}
            </li>
          ))}
        </ul>

        <div className="calendar">

          <div className="days">
            {calendar.map(({ day }) => (
              <h3 key={day} className="subheader">
                {capitalize(day)}
              </h3>
            ))}
          </div>

          <div className="icon-grid">
            {calendar.map(({ day, meals }) => (
              <ul key={day}>
                {mealOrder.map((meal) => (
                  <li key={meal} className="meal">
                    {meals[meal]
                      ? <div className="food-item">
                          <img src={meals[meal].image} alt={meals[meal].label}/>
                          <button onClick={() => remove({meal, day})}>
                            Clear
                          </button>
                        </div>
                      : <button
                          className='icon-btn'
                          onClick={() => this.openFoodModal({meal, day})}
                          >
                          <CalendarIcon size={30} />
                        </button>
                    }
                  </li>
                ))}
              </ul>
            ))}
          </div>

        </div>


        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={foodModalOpen}
          onRequestClose={this.closeFoodModal}
          contentLabel='Modal'
        >
          <div>
            {loadingFood === true
              ? <Loading delay={200} type='spin' color='#222' className='loading' />
              : <div className='search-container'>
                  <h3 className='subheader'>
                    Find a meal for {capitalize(this.state.day)} {this.state.meal}.
                  </h3>
                  <div className='search'>
                    <input
                      className='food-input'
                      type='text'
                      placeholder='Search Foods'
                      ref={(input) => this.input = input}
                    />
                    <button
                      className='icon-btn'
                      onClick={this.searchFood}>
                        <ArrowRightIcon size={30}/>
                    </button>
                  </div>
                  {food !== null && (
                    <FoodList
                      food={food}
                      onSelect={(recipe) => {
                        selectRecipe({ recipe, day: this.state.day, meal: this.state.meal })
                        this.closeFoodModal()
                      }}
                    />)}
                </div>}
          </div>
        </Modal>

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={ingredientsModalOpen}
          onRequestClose={this.closeIngredientsModal}
          contentLabel='Modal'
        >
          {ingredientsModalOpen && <ShoppingList list={this.generateShoppingList()}/>}
        </Modal>


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
