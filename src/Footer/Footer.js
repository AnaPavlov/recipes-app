import React from 'react';

import logo from '../Assets/Images/logo.png';
import fb from '../Assets/Icons/fb.png';
import insta from '../Assets/Icons/insta.png';
import styles from './Footer.module.css';

const Footer = () => {

  const openInNewTab = (url) => {
    var win = window.open(url, '_blank');
    win.focus();
  }

  return (
    <div className={styles.footer}>
      <div className={styles.wrap}>
        <section>
          <div className={styles.logo}>
            <img src={logo} alt="" />
          </div>
          <div className={styles.social}>
          <a rel="noopener noreferrer" href="http://www.facebook.com" target="_blank"><img src={fb} alt="" /></a>
          <a rel="noopener noreferrer" href="http://www.instagram.com" target="_blank"><img src={insta} alt="" /></a>
          </div>
        </section>
      </div>
      <div className={styles.copyright}>
        <small>Copyright - Golux Technologies 2019 - Ana Pavlovic</small>
      </div>
    </div>
  );
};

export default Footer;
