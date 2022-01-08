import {Link} from "react-router-dom";
import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {selectIsAuth} from "../../store/slices/auth";
import {logoutUser} from "../../store/slices/auth/action";

const Header = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectIsAuth);
  const handlerLogout = () => {
    dispatch(logoutUser())
  };
  return (
    <header>
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
              <>
                <li className="nav-item">
                  <Link to="login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="registration" className="nav-link">Registration</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="navigation" className="nav-link">Navigation</Link>
                </li>
                <li className="nav-item">
                  <Link to="profile" className="nav-link">Profile</Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link"
                        onClick={handlerLogout}>Logout</span>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  )
};

export default Header;