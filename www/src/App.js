import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UALProvider } from 'ual-reactjs-renderer';
import { Anchor } from 'ual-anchor';
import { Wax } from '@eosdacio/ual-wax';
import { getUserData } from './store/slices/auth/action';
import { selectIsAuth, selectUserData, selectIsLoading } from './store/slices/auth/';
import routes from './routes';
import { OverlayngPortal } from 'highComponents';

const App = () => {
  const elementPage = useRoutes(routes);
  const dispatch = useDispatch();
  const auth = useSelector(selectIsAuth);
  const userData = useSelector(selectUserData);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (auth && !userData) {
      dispatch(getUserData());
    }
  }, [dispatch, auth, userData]);

  /*  if (isLoading) {
    return <OverlayngPortal />;
  } */

  const waxConfig = {
    chainId: 'f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12',
    rpcEndpoints: [
      {
        protocol: 'https',
        host: 'waxtestnet.greymass.com',
        port: '443',
      },
    ],
  };

  const anchor = new Anchor([waxConfig], {
    appName: 'my-example-dapp',
  });

  const wax = new Wax([waxConfig], {
    appName: 'my-example-dapp',
  });

  return (
    <div className="wrapperGlobal">
      <UALProvider chains={[wax]} authenticators={[wax, anchor]} appName={'Labyrinth'}>
        {elementPage}
      </UALProvider>
      {isLoading && <OverlayngPortal />}
    </div>
  );
};
export default App;
