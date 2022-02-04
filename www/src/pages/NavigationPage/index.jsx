import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const NavigationPage = () => (
  <>
    <h5>Locations</h5>
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
    <Outlet />
  </>
);
export default NavigationPage;
