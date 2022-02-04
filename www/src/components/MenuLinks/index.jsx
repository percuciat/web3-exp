import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../store/slices/auth/action';
import { useDispatch } from 'react-redux';
import styles from './MenuLinks.module.css';
import { HashLink } from 'react-router-hash-link';

const anchorsMenu = [
  {
    name: 'About',
    hash: '#about',
  },
  {
    name: 'Road map',
    hash: '#road',
  },
  {
    name: 'Faq',
    hash: '#faq',
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

const MenuLinks = ({ asideLinks, closeMenuAfterLinking, isAuth }) => {
  const dispatch = useDispatch();
  const handlerLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <ul className={`${asideLinks ? styles.sidebar__links : styles.menu__headerLinks} `}>
      {anchorsMenu.map(({ hash, name }) => {
        return (
          <li key={name}>
            <HashLink to={hash} className={styles.menu__links}>
              {name}
            </HashLink>
          </li>
        );
      })}
      {isAuth && (
        <>
          {authMenu.map(({ link, name }) => {
            return (
              <li key={name}>
                <Link
                  to={link}
                  onClick={asideLinks && closeMenuAfterLinking}
                  className={styles.menu__links}
                >
                  {name}
                </Link>
              </li>
            );
          })}
          <li>
            <span className={styles.menu__links} onClick={handlerLogout}>
              Logout
            </span>
          </li>
        </>
      )}
    </ul>
  );
};

export default MenuLinks;
