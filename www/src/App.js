import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UALProvider } from 'ual-reactjs-renderer';
import { Anchor } from 'ual-anchor';
import { Wax } from '@eosdacio/ual-wax';
import { sendToken } from './store/slices/auth/action';
import { selectIsAuth, selectUserData } from './store/slices/auth/';
import routes from './routes';

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectIsAuth);
  const user = useSelector(selectUserData);
  const elementPage = useRoutes(routes);
  useEffect(() => {
    if (auth && !user) {
      dispatch(sendToken());
    }
  }, []);

  // Wax test
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
    // Required: The app name, required by anchor-link. Short string identifying the app
    appName: 'my-example-dapp',
  });

  const wax = new Wax([waxConfig], {
    // Required: The app name, required by anchor-link. Short string identifying the app
    appName: 'my-example-dapp',
  });

  return (
    <div className="wrapperGlobal">
      <UALProvider chains={[wax]} authenticators={[wax, anchor]} appName={'Labyrinth'}>
        {elementPage}
      </UALProvider>
    </div>
  );
};
export default App;
