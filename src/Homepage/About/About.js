import React from 'react';

import styles from './About.module.css';
import img from '../../Assets/Images/about.jpg';

const About = () => {
  return (
    <div className={styles.about} id="about">
      <div className={styles.wrap}>
      <h1>About us</h1>
      <section>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        <div className={styles.img}>
          <img src={img} alt="" />
        </div>
      </section>
      </div>
    </div>
  );
};

export default About;
