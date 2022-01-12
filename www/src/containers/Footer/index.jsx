import React from 'react'

import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__wrapper}>
        {/* <SocialLinks styleClass="footer__links"/> */}
        <p className={styles.footer__title}>
          copyright&copy;2018-{new Date().getFullYear()}
          <span className={styles.text}> Aden-Max </span> all rights reserved
        </p>
      </div>
    </footer>
  )
}

export default Footer
