import React from 'react';
import { withUAL } from 'ual-reactjs-renderer';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { isCorrectMediaScreen } from 'utils/common/isCorrectMediaScreen';
import { selectWidthScreen } from 'store/slices/common';
import { selectIsAuth } from 'store/slices/auth';
import { selectUserData } from 'store/slices/user';
import { MenuLinks, WaxBtn, WaxLoginInfo, WaxLogoutBtn } from 'components';
import Burger from './Burger';
import LoginBtn from './LoginBtn';
import Logo from './Logo';
import { TABLET_MEDIA } from 'consts';
import styles from './Header.module.css';

const Header = (props) => {
  const { ual } = props;
  const widthScreen = useSelector(selectWidthScreen);
  const auth = useSelector(selectIsAuth);
  const userData = useSelector(selectUserData);
  const status = userData?.status;

  const WaxBtnUAL = withUAL(WaxBtn);
  const WaxLoginInfoUAL = withUAL(WaxLoginInfo);
  const WaxLogoutBtnUAL = withUAL(WaxLogoutBtn);

  return (
    <header className={`${styles.header}`}>
      <Container>
        <nav className={`${styles.header__wrapper}`}>
          <Logo />
          <div className={styles.header__navigation}>
            <LoginBtn auth={auth} />
            {auth && status ? ual.activeUser ? <WaxLoginInfoUAL /> : <WaxBtnUAL /> : null}
            {isCorrectMediaScreen(widthScreen, TABLET_MEDIA.name) ? (
              <MenuLinks isAuth={auth} />
            ) : (
              <Burger />
            )}
            {auth && <WaxLogoutBtnUAL />}
          </div>
        </nav>
      </Container>
    </header>
  );
};

const HeaderUAL = withUAL(Header);

export default HeaderUAL;
