import React, { Component } from 'react';

import axios from 'axios';
// import SingleMeal from '../SingleMeal/SingleMeal';
import styles from './SingleCategory.module.css';
import MealCard from '../MealCard/MealCard';

class SingleCategory extends Component {
  state = {
    meals: null,
    randomMeal: null,
    searchInp: '',
    filteredMeals: null
  };

  componentDidMount() {
    const category = this.props.match.params.name;
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then(res =>
        this.setState({
          meals: res.data.meals
        })
      )
      .then(res => this.randomMeal());
  }

  randomMeal() {
    let length, randIndex, randMeal;

    if (this.state.meals) {
      length = this.state.meals.length;
      randIndex = Math.floor(Math.random() * length);
      randMeal = this.state.meals[randIndex];
      this.setState({
        randomMeal: randMeal
      });
    }
  }

  handleMeal = id => {
    this.props.history.push('/recipes-app/meal/' + id);
    this.setState({
      filteredMeals: null
    });
  };

  filterResults(searchInp) {
    const allMeals = [...this.state.meals];
    let filteredMeals = allMeals.filter(meal => {
      return meal.strMeal.toLowerCase().search(searchInp.toLowerCase()) !== -1;
    });
    this.setState({
      filteredMeals: filteredMeals
    });
  }

  handleSearch = e => {
    this.setState({
      searchInp: e.target.value
    });
    this.filterResults(e.target.value);
  };

  render() {
    let recommendation, allMeals;
    if (this.state.randomMeal) {
      const { randomMeal } = this.state;
      recommendation = (
        <MealCard
          onClick={() => this.handleMeal(randomMeal.idMeal)}
          img={randomMeal.strMealThumb}
          name={randomMeal.strMeal}
        />
      );
    }

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

    if (this.state.filteredMeals) {
      allMeals = this.state.filteredMeals.map(meal => {
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
      <div className={styles.singleCategory}>
        <section>
          <h1>Our recommendation:</h1>
          <div className={styles.recommendation}>
            {recommendation}
            <div className={styles.search}>
              <input
                type={styles.search}
                placeholder="Search by name..."
                onChange={this.handleSearch}
                value={this.state.searchInp}
              />
            </div>
          </div>
          <hr />
          <h3>Checkout other meals from this category:</h3>
          <div className={styles.allMeals}>{allMeals}</div>
        </section>
      </div>
    );
  }
}

export default SingleCategory;
