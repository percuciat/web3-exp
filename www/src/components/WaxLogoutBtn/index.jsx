import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from 'store/slices/auth/action';

const WaxLogoutBtn = ({ ual: { activeUser, activeAuthenticator, logout } }) => {
  const dispatch = useDispatch();
  const handler = () => {
    dispatch(logoutUser());
    if (activeUser && activeAuthenticator) {
      logout();
    }
  };
  return (
    <button className="btn btn-danger">
      <span className="ual-generic-button red" onClick={handler}>
        Logout
      </span>
    </button>
  );
};

export default WaxLogoutBtn;
