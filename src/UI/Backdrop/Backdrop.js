import React from 'react';

import styles from './Backdrop.module.css';

const backdrop = props => {
  return props.isVisible ? (
    <div onClick={props.onClick} className={styles.Backdrop}></div>
  ) : null;
};

export default backdrop;