import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from 'store/slices/auth/action';
import { selectIsLoading } from 'store/slices/auth';
import { OverlayngPortal } from 'highComponents';

const WaxLogoutBtn = ({ ual: { activeUser, activeAuthenticator, logout } }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const handler = () => {
    dispatch(logoutUser());
    if (activeUser && activeAuthenticator) {
      logout();
    }
  };
  return (
    <>
      <button className="btn btn-danger">
        <span className="ual-generic-button red" onClick={handler}>
          Logout
        </span>
      </button>
      {isLoading && <OverlayngPortal />}
    </>
  );
};

export default WaxLogoutBtn;
