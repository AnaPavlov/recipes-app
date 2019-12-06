import React, { Component } from 'react';
import axios from 'axios';

import MealCard from '../MealCard/MealCard';
import styles from './SearchPage.module.css';

class SearchPage extends Component {
  state = {
    urlSearchParam: null,
    randomMeal: null,
    categories: null,
    searchResult: null,
    filteredResult: null,
    selectedOption: 'Categories'
  };

  componentDidMount() {
    this.setState({
      urlSearchParam: this.props.match.params.name
    });
    this.getRandomMeal();
    this.getCategoriesList();
    this.getSearchResults();
  }

  componentDidUpdate() {
    if (this.state.urlSearchParam !== this.props.match.params.name) {
      this.setState({
        urlSearchParam: this.props.match.params.name,
        selectedOption: 'Categories',
        filteredResult: null
      });
      this.getSearchResults();
    }
  }

  getRandomMeal = async () => {
    let res = await axios.get(
      'https://www.themealdb.com/api/json/v1/1/random.php'
    );
    let randomMeal = await res.data.meals[0];
    this.setState({
      randomMeal: randomMeal
    });
  };

  getCategoriesList = async () => {
    let res = await axios.get(
      'https://www.themealdb.com/api/json/v1/1/categories.php'
    );
    let categories = await res.data.categories;
    this.setState({
      categories: categories
    });
  };

  getSearchResults = async () => {
    let urlSearchParam =
      this.state.urlSearchParam || this.props.match.params.name;
    if (urlSearchParam) {
      let res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${urlSearchParam}`
      );
      let searchResult = await res.data.meals;
      this.setState({
        searchResult: searchResult
      });
    }
  };

  handleMeal = id => {
    this.props.history.push('/recipes-app/meal/' + id);
  };

  handleChange = e => {
    this.setState({
      selectedOption: e.target.value
    });
    this.filterResults(e.target.value);
  };

  filterResults(selectedCategory) {
    if (this.state.searchResult) {
      let filtered = [...this.state.searchResult].filter(meal => {
        return meal.strCategory === selectedCategory;
      });
      this.setState({
        filteredResult: filtered
      });
    }
  }

  render() {
    let recommendation, allMeals, categories;
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

    if (this.state.categories) {
      categories = this.state.categories.map(category => {
        return (
          <option
            onChange={this.handleSelect}
            value={category.strCategory}
            key={category.strCategory}
          >
            {category.strCategory}
          </option>
        );
      });
    }

    if (this.state.searchResult) {
      allMeals = this.state.searchResult.map(meal => {
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

    if (this.state.filteredResult) {
        allMeals = this.state.filteredResult.map(meal => {
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
      <div className={styles.search}>
        <section>
          <h1>Our recommendation:</h1>
          <div className={styles.recommendation}>
            {recommendation}
            <div className={styles.dropdown}>
              <select
                onChange={this.handleChange}
                value={this.state.selectedOption}
              >
                <option value="Categories" disabled>Categories</option>
                {categories}
              </select>
            </div>
          </div>
          <hr />
          <h3>You've searched for:</h3>
          <div className={styles.allMeals}>{allMeals}</div>
        </section>
      </div>
    );
  }
}

export default SearchPage;
