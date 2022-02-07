import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet, useOutletContext } from 'react-router-dom';
import { WaxBtn } from 'components';
import { selectUserData } from 'store/slices/auth';
const NavigationPage = (props) => {
  const userData = useSelector(selectUserData);
  const { ual, withUAL } = useOutletContext();
  const WaxBtnUAL = withUAL(WaxBtn);

  return (
    <>
      <h5>Locations</h5>
      {userData.status !== 0 ? (
        ual.activeUser ? (
          <>
            <ul>
              <li>
                <Link to="labyrinth">Labyrinth</Link>
              </li>
              <li>
                <Link to="square">Central Square</Link>
              </li>
              <li>
                <Link to="potato">Potato fields</Link>
              </li>
              <li>
                <Link to="government">Government</Link>
              </li>
            </ul>
            <Outlet context={{ ual, withUAL }} />
          </>
        ) : (
          <WaxBtnUAL />
        )
      ) : (
        <h1>please verify your account</h1>
      )}
    </>
  );
};

export default NavigationPage;
