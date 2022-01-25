import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectIsLoading } from '../../store/slices/auth';
import { Navigate } from 'react-router-dom';
import { OverlayngPortal } from '../../highComponents';
import { LoginForm } from '../../containers';

/*
 *  Test@test.ru
 * qwerty12
 */

const LoginPage = (props) => {
  const auth = useSelector(selectIsAuth);
  const isLoading = useSelector(selectIsLoading);
  if (auth) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <>
      <LoginForm />
      {isLoading && <OverlayngPortal />}
    </>
  );
};

export default LoginPage;
