import React, { Component } from 'react';
import axios from 'axios';

import MealCard from '../MealCard/MealCard';
import styles from './MyMeals.module.css';

class MyMeals extends Component {
  state = {
    meals: null
  };

  componentDidMount() {
    axios
      .get('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken')
      .then(res =>
        this.setState({
          meals: res.data.meals
        })
      );
  }

  handleMeal = id => {
    this.props.history.push('/recipes-app/meal/' + id);
  };

  render(props) {
    if (localStorage.getItem("user") === null) {
      this.props.history.push('/recipes-app');
    }
    let allMeals;
    if (this.state.meals) {
      allMeals = this.state.meals.map(meal => {
        return (
          <MealCard
            onClick={() => this.handleMeal(meal.idMeal)}
            key={meal.idMeal}
            img={meal.strMealThumb}
            name={meal.strMeal}
          />
        );
      });
    }
    return (
      <div className={styles.myMeals}>
          <h1>My Meals</h1>
        <div className={styles.wrap}>{allMeals}</div>
      </div>
    );
  }
}

export default MyMeals;
