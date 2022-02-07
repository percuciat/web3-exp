import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from 'store/slices/auth';
import { MenuLinks } from 'components';
import { FaTimes } from 'react-icons/fa';
import { closeMenu } from 'store/slices/common';
import useOnClickOutside from 'hooks/useOnClickOutside';
import styles from './Sidebar.module.css';

const Sidebar = ({ toggleSidebar, isDark }) => {
  const dispatch = useDispatch();
  const auth = useSelector(selectIsAuth);
  const ref = useRef();
  const handleCloseMenu = () => {
    dispatch(closeMenu());
    document.body.style.overflow = 'auto';
  };
  useOnClickOutside(ref, handleCloseMenu);
  return (
    <aside className={`${isDark ? 'darkSecondary' : ''} ${styles.sidebar}`}>
      <div ref={ref} className={styles.sidebar__content}>
        <nav className={styles.sidebar__container}>
          <MenuLinks asideLinks={true} closeMenuAfterLinking={handleCloseMenu} isAuth={auth} />
        </nav>
        <button className={styles.close__btn} onClick={handleCloseMenu} title="Close menu">
          <FaTimes />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
