import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

function Logo() {
  return (
    <div className="nav-item">
      <Link to="/" className={styles.logo__link}>
        The Labyrinth
      </Link>
    </div>
  );
}

export default Logo;
