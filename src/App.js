import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './App.module.css'

import Navbar from './Navbar/Navbar';
import Homepage from './Homepage/Homepage'
import Footer from './Footer/Footer';
import SingleMeal from './SingleMeal/SingleMeal';
import SingleCategory from './SingleCategory/SingleCategory';
import SearchPage from './SearchPage/SearchPage';
import MyMeals from './MyMeals/MyMeals'

class App extends Component {
  state = {};

  render() {
    return (
      <Router>
        <div className={styles.app}>
          <Navbar /> 
          <Switch>
          <Route path="/recipes-app" exact component={Homepage} /> 
            <Route path="/recipes-app/search/:name" exact component={SearchPage} />
            <Route path="/recipes-app/category/:name" component={SingleCategory} />
            <Route path="/recipes-app/meal/:id" component={SingleMeal} />
            <Route path="/recipes-app/mymeals/" component={MyMeals} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
