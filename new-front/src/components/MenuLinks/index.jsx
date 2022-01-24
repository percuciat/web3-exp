import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../store/slices/auth/action';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../store/slices/auth';
import styles from './MenuLinks.module.css';

const unAuthMenu = [
  {
    name: 'Login',
    link: 'login',
  },
  {
    name: 'Registration',
    link: 'registration',
  },
];

const authMenu = [
  {
    name: 'Navigation',
    link: 'navigation',
  },
  {
    name: 'Profile',
    link: 'profile',
  },
];

const MenuLinks = ({ asideLinks, closeMenuAfterLinking }) => {
  const auth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlerLogout = () => {
    dispatch(logoutUser());

    /*
     *  TODO добавить прослушку у роутера
     * asideLinks && closeMenuAfterLinking()
     */
  };
  // Navigate('/login', { replace: true })

  const menuList = auth ? authMenu : unAuthMenu;
  return (
    <ul className={`${asideLinks ? styles.sidebar__links : styles.menu__headerLinks} `}>
      {menuList.map(({ link, name }) => (
        <li key={name}>
          <Link
            to={link}
            onClick={asideLinks && closeMenuAfterLinking}
            className={styles.menu__links}
          >
            {name}
          </Link>
        </li>
      ))}
      {auth && (
        <li>
          <span className={styles.menu__links} onClick={handlerLogout}>
            Logout
          </span>
        </li>
      )}
    </ul>
  );
};

export default MenuLinks;
