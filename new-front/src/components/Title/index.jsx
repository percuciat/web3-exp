import React from 'react';
import styles from './Title.module.css';

const Title = (props) => {
  const { text } = props;
  return <div className={styles.title}>{text}</div>;
};

export default Title;
