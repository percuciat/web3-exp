import React, { useEffect } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuth } from 'store/slices/auth';
import { withUAL } from 'ual-reactjs-renderer';
import { sendToken } from 'store/slices/auth/actions';

import { MainLayout } from 'layouts';
import {
  Empty404,
  FaqPage,
  RoadPage,
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
  /* const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sendToken());
  }, [dispatch]); */

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
      {
        path: '/faq',
        element: <FaqPage />,
      },
      {
        path: '/road',
        element: <RoadPage />,
      },
      {
        path: '*',
        element: <Empty404 />,
      },
    ],
  },
];

export default routes;
