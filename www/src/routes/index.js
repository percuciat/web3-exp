import React from "react";
import {MainLayout} from "../layouts";
import {
  Empty404,
  LoginPage,
  HomePage,
  ProfilePage,
  RegisterPage,
  NavigationPage,
  LocationPage
} from "../pages";
import {Navigate, useLocation, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsAuth} from '../store/slices/auth';


function RequireAuth() {
  let location = useLocation();
  const auth = useSelector(selectIsAuth);

  if (!auth) {
    return <Navigate to="/login" state={{from: location}} replace/>;
  }

  return <Outlet/>;
}


const routes = [
  {
    element: <MainLayout/>,
    children: [
      {
        path: "/",
        element: <HomePage/>,
      },
      {
        element: <RequireAuth/>,
        children: [
          {
            path: "navigation",
            element: <NavigationPage/>,
          },
          {
            path: "profile",
            element: <ProfilePage/>,
          },
        ]
      },
      {
        path: "register",
        element: <RegisterPage/>
      },
      {
        path: "login",
        element: <LoginPage/>
      },
      {
        path: "*",
        element: <Empty404/>
      }
    ],
  }
];

export default routes;