import React from 'react';
import { useDispatch } from 'react-redux';
import { openMenu } from 'store/slices/common';
import { FaAlignRight } from 'react-icons/fa';
import styles from './Burger.module.css';

const Burger = (props) => {
  const dispatch = useDispatch();
  const handleOpenMenu = () => {
    dispatch(openMenu());
    document.body.style.overflow = 'hidden';
  };
  return (
    <button title="Menu" className={styles.toggleBtn} onClick={handleOpenMenu}>
      <FaAlignRight />
    </button>
  );
};

export default Burger;
