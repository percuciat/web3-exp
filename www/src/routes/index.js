import React from "react";
import {MainLayout} from "../layouts";
import {Empty404, LoginPage, HomePage, Protected} from "../pages";
import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsAuth} from '../store/slices/auth';


function RequireAuth({children}) {
  let location = useLocation();
  const auth = useSelector(selectIsAuth);

  if (!auth) {
    return <Navigate to="/login" state={{from: location}} replace/>;
  }

  return children;
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
        path: "protected",
        element: (
          <RequireAuth>
            <Protected/>
          </RequireAuth>
        )
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