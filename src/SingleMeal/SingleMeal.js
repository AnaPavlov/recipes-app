import React, { Component } from 'react';
import axios from 'axios';

import styles from './SingleMeal.module.css';
import MealCard from '../MealCard/MealCard';

class SingleMeal extends Component {
  state = {
    meal: null,
    similarMeals: null,
    randomMeals: null,
    id: null
  };

  componentDidMount = async () => {
    this.setState({
      id: this.props.match.params.id
    });
    this.fetchMeals();
  };

  componentDidUpdate() {
    if (this.state.id !== this.props.match.params.id) {
      this.setState({
        id: this.props.match.params.id
      });
      this.fetchMeals();
    }
  }

  fetchMeals = async () => {
    let id = this.props.match.params.id;
    if (id) {
      let res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      let meal = await res.data.meals[0];
      let res2 = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal.strCategory}`
      );
      let similar = await res2.data.meals;
      this.setState({
        meal: meal,
        similarMeals: similar
      });
      this.getRandomMeals();
      this.scrollToTop();
    }
  };

  getRandomMeals() {
    let similarMeals;
    const randomMeals = [];
    if (this.state.similarMeals) {
      similarMeals = [...this.state.similarMeals];
      let filteredMeals = similarMeals.filter(meal => {
        return meal.idMeal !== this.state.id;
      });
      for (let i = 0; i < 3; i++) {
        let length = filteredMeals.length;
        let randNum = Math.floor(Math.random() * length);
        randomMeals.push(filteredMeals[randNum]);
        filteredMeals.splice(randNum, 1);
      }
      this.setState({
        randomMeals: randomMeals
      });
    }
  }

  scrollToTop = () => {
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    });
  }

  handleMeal = id => {
    this.props.history.push('/recipes-app/meal/' + id);
    
  };

  render() {
    let meal, randomMeals;
    if (this.state.meal) {
      let mealInfo = this.state.meal;
      let ingredients = [];
      let quantity = [];
      let tags = mealInfo.strTags ? mealInfo.strTags.split(',') : null;
      console.log(tags);
      for (let i = 1; i < 21; i++) {
        let ingSufix = `strIngredient${i}`;
        let quantSufix = `strMeasure${i}`;
        if (mealInfo[ingSufix] !== '') {
          ingredients.push(mealInfo[ingSufix]);
        }
        if (mealInfo[quantSufix] !== '') {
          quantity.push(mealInfo[quantSufix]);
        }
      }
      meal = (
        <div className={styles.wrap}>
          <div className={styles.tags}>
            <h1>{mealInfo.strMeal}</h1>
            {tags ? (
              <ul>
                {tags.map(tag => {
                  return (
                    <li key={tag}>
                      {'#'}
                      {tag}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
          <section className={styles.main}>
            <div className={styles.img}>
              <img src={mealInfo.strMealThumb} alt="meal" />
            </div>
            <div className={styles.basicInfo}>
              <p>
                <span className={styles.bold}>Category: </span>
                {mealInfo.strCategory}
              </p>
              <p>
                <span className={styles.bold}>Country: </span>{' '}
                {mealInfo.strArea}
              </p>
              <p>
                <span className={styles.bold}>Video: </span>
                <a rel="noopener noreferrer" href={mealInfo.strYoutube} target="_blank">{mealInfo.strYoutube}</a>
              </p>
              <p>{mealInfo.strInstructions}</p>
            </div>
          </section>
          <section className={styles.ingredients}>
            <ul>
              <h3>Ingredients</h3>
              {ingredients.map(item => {
                return <li key={Math.random() * 10000}>{item}</li>;
              })}
            </ul>
            <ul>
              <h3>Measure</h3>
              {quantity.map(item => {
                return <li key={Math.random() * 10000}>{item}</li>;
              })}
            </ul>
          </section>
        </div>
      );
    }

    if (this.state.randomMeals) {
      randomMeals = this.state.randomMeals.map(meal => {
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
      <div className={styles.meal}>
        {meal}
        <div className={styles.suggestion}>
          <h3>Maybe you will also like:</h3>
          <div className={styles.randomMeals}>{randomMeals}</div>
        </div>
      </div>
    );
  }
}

export default SingleMeal;
