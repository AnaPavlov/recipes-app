import React, { Component } from 'react';

import styles from './Header.module.css';
import img from '../../Assets/Images/header.png'

class Header extends Component {

  render(props) {
    return (
      <div className={styles.header}>
          <div className={styles.wrap}>
        <section className={styles.info}>
            <div>
          <h1>Food recipes</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          </div>
          <button onClick={this.props.toggle}>Categories</button>
        </section>
        <section className={styles.img}>
            <img src={img} alt="food-header" />
        </section>
        </div>
      </div>
    );
  }
}

export default Header;
