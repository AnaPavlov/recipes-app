import React, { Component } from 'react';

import styles from './MealCard.module.css';

class MealCard extends Component {
  render() {
    return (
        <div className={styles.meal} onClick={this.props.onClick}>
          <img src={this.props.img} alt="meal" />
          <h3>{this.props.name}</h3>
        </div>
    );
  }
}

export default MealCard;
