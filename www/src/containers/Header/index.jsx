import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Button, Modal } from 'react-bootstrap';
import { isCorrectMediaScreen } from '../../utils/common/isCorrectMediaScreen';
import { selectWidthScreen, openMenu } from '../../store/slices/common';
import { selectIsLoading, selectIsAuth } from '../../store/slices/auth';
import MenuLinks from '../../components/MenuLinks';
import { OverlayngPortal } from '../../highComponents';
import { LoginForm } from 'containers';
import { FaAlignRight } from 'react-icons/fa';
import { TABLET_MEDIA } from '../../consts';
import styles from './Header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const widthScreen = useSelector(selectWidthScreen);
  const auth = useSelector(selectIsAuth);
  const isLoading = useSelector(selectIsLoading);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
          <div className={styles.header__navigation}>
            {!auth && (
              <Button className={styles.loginBtn} onClick={handleShow}>
                Play now
              </Button>
            )}
            {isCorrectMediaScreen(widthScreen, TABLET_MEDIA.name) && <MenuLinks isAuth={auth} />}
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
          </div>
        </nav>
      </Container>
      <Modal contentClassName={styles.headerModal} show={show} onHide={handleClose} centered>
        <button className={styles.closeModalBtn} title="Close" onClick={handleClose}>
          &#10006;
        </button>
        <LoginForm callback={handleClose} />
      </Modal>
      {isLoading && <OverlayngPortal />}
    </header>
  );
};

export default Header;
