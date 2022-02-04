import React from 'react';
/* import { Spinner } from 'react-bootstrap/Spinner'; */
import styles from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles.spinWrapper}>
      <div className={styles.spinner}></div>
      {/*  <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner> */}
    </div>
  );
};

export default Spinner;
