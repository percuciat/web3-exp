import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import { isCorrectMediaScreen } from '../../utils/common/isCorrectMediaScreen';
import { selectWidthScreen, openMenu } from '../../store/slices/common';
import MenuLinks from '../../components/MenuLinks';
import { FaAlignRight } from 'react-icons/fa';
import { TABLET_MEDIA } from '../../consts';
import styles from './Header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const widthScreen = useSelector(selectWidthScreen);

  const handleOpenMenu = () => {
    dispatch(openMenu());
    document.body.style.overflow = 'hidden';
  };

  return (
    <header className={`${styles.header}`}>
      <Container>
        <nav className={`${styles.header__wrapper}`}>
          <div className="nav-item">
            <Link to="/" className={styles.logo__link}>
              The Labyrinth
            </Link>
          </div>
          {isCorrectMediaScreen(widthScreen, TABLET_MEDIA.name) && <MenuLinks />}
          {!isCorrectMediaScreen(widthScreen, TABLET_MEDIA.name) && (
            <button
              type="button"
              title="Menu"
              className={styles.toggleBtn}
              onClick={handleOpenMenu}
            >
              <FaAlignRight />
            </button>
          )}
        </nav>
      </Container>
    </header>
  );
};

export default Header;
