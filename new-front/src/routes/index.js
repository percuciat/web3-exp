import React, { useEffect } from 'react';
import { MainLayout } from '../layouts';
import {
  Empty404,
  LoginPage,
  HomePage,
  ProfilePage,
  RegisterPage,
  NavigationPage,
  LabyrinthPage,
  PotatoPage,
  GovernmentPage,
  SquarePage,
} from '../pages';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../store/slices/auth';

function RequireAuth() {
  const location = useLocation();
  const auth = useSelector(selectIsAuth);

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
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
        element: <RequireAuth />,
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
        path: 'registration',
        element: <RegisterPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: '*',
        element: <Empty404 />,
      },
    ],
  },
];

export default routes;
