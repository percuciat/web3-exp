import React from 'react';
import { useSelector } from 'react-redux';
import { Navigation } from 'containers';
import { selectUserData } from 'store/slices/user';

const NavigationPage = (props) => {
  const userData = useSelector(selectUserData);
  const status = userData?.status;

  return (
    <>
      <h5>Locations</h5>
      {status ? <Navigation /> : <h1>please verify your account</h1>}
    </>
  );
};

export default NavigationPage;
