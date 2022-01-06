import React from "react";
import {
  Link,
  Outlet
} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../store/slices/auth";

const MainLayout = () => {
  const auth = useSelector(selectIsAuth);
  return (
    <section>
      <nav className="navbar navbar-expand-md navbar-light">
        <div className="container">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link logo-link">
                The Labyrinth
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {!auth ? (
              <li className="nav-item">
                <Link to="login" className="nav-link">Login</Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="protected" className="nav-link">Protected</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <main className="py-4">
        <Outlet/>
      </main>
    </section>
  );
};

export default MainLayout;