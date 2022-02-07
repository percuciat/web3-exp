import React, { useEffect } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from 'store/slices/auth';
import { withUAL } from 'ual-reactjs-renderer';

import { MainLayout } from 'layouts';
import {
  Empty404,
  LoginPage,
  HomePage,
  ProfilePage,
  NavigationPage,
  LabyrinthPage,
  PotatoPage,
  GovernmentPage,
  SquarePage,
} from '../pages';

const RoutesUAL = withUAL(RequireAuth);

function RequireAuth(props) {
  const { ual } = props;
  const location = useLocation();
  const auth = useSelector(selectIsAuth);
  /* console.log('ual--', ual); */
  /* if (!ual.activeUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } */

  if (!auth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet context={{ ual, withUAL }} />;
}

const routes = [
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        element: <RoutesUAL />,
        children: [
          {
            path: 'navigation',
            element: <NavigationPage />,
            children: [
              {
                path: 'labyrinth',
                element: <LabyrinthPage />,
              },
              {
                path: 'potato',
                element: <PotatoPage />,
              },
              {
                path: 'government',
                element: <GovernmentPage />,
              },
              {
                path: 'square',
                element: <SquarePage />,
              },
            ],
          },
          {
            path: 'profile',
            element: <ProfilePage />,
          },
        ],
      },
      /*  {
        path: 'login',
        element: <LoginPage />,
      }, */
      {
        path: '*',
        element: <Empty404 />,
      },
    ],
  },
];

export default routes;
