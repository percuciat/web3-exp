import React from 'react';
import { Link, Outlet, useOutletContext } from 'react-router-dom';
import { WaxBtn } from 'components';

const Navigation = (props) => {
  const { ual, withUAL } = useOutletContext();
  const WaxBtnUAL = withUAL(WaxBtn);
  return (
    <>
      {ual.activeUser ? (
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
      )}
    </>
  );
};

export default Navigation;
