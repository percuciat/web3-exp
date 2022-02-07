import React, { useState } from 'react';
import { withUAL } from 'ual-reactjs-renderer';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Button, Modal } from 'react-bootstrap';
import { FaAlignRight } from 'react-icons/fa';
import { isCorrectMediaScreen } from 'utils/common/isCorrectMediaScreen';
import { selectWidthScreen, openMenu } from 'store/slices/common';
import { selectIsLoading, selectIsAuth, selectUserData } from 'store/slices/auth';
import { MenuLinks, WaxBtn, WaxLoginInfo, WaxLogoutBtn } from 'components';
import { OverlayngPortal } from 'highComponents';
import { LoginForm } from 'containers';
import { TABLET_MEDIA } from 'consts';
import styles from './Header.module.css';

const Header = (props) => {
  const { ual } = props;
  const dispatch = useDispatch();
  const widthScreen = useSelector(selectWidthScreen);
  const auth = useSelector(selectIsAuth);
  const userData = useSelector(selectUserData);
  const isLoading = useSelector(selectIsLoading);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleOpenMenu = () => {
    dispatch(openMenu());
    document.body.style.overflow = 'hidden';
  };
  const WaxBtnUAL = withUAL(WaxBtn);
  const WaxLoginInfoUAL = withUAL(WaxLoginInfo);
  const WaxLogoutBtnUAL = withUAL(WaxLogoutBtn);

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
            {auth && userData?.status !== 0 ? (
              ual.activeUser ? (
                <WaxLoginInfoUAL />
              ) : (
                <WaxBtnUAL />
              )
            ) : null}
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
            {auth && <WaxLogoutBtnUAL />}
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

const HeaderUAL = withUAL(Header);

export default HeaderUAL;
