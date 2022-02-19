import React from 'react';

import styles from './Footer.module.css';

const Footer = ({ isDark, isRu }) => (
  <footer className={`${isDark ? 'dark' : ''} ${styles.footer}`}>
    <div className={styles.footer__wrapper}>
      {/* <SocialLinks styleClass="footer__links"/>*/}
      <p className={styles.footer__title}>
        copyright&copy;2018-{new Date().getFullYear()}
        <span className={styles.text}> China Xioa </span>{' '}
        {isRu ? 'все права защищены' : 'all rights reserved'}
      </p>
    </div>
  </footer>
);
export default Footer;
