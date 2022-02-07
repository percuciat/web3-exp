import React from 'react';
import { Portal, Spinner } from 'components';
import styles from './OverlayngPortal.module.css';

const OverlayngPortal = (props) => {
  return (
    <Portal>
      <div className={styles.wrapper}>
        <Spinner />
      </div>
    </Portal>
  );
};

export default OverlayngPortal;
