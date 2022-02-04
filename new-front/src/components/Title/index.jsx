import React from 'react';
import styles from './Title.module.css';

const Title = (props) => {
  const { id, text } = props;
  return (
    <div id={id} className={styles.title}>
      {text}
    </div>
  );
};

export default Title;
