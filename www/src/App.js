import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UALProvider } from 'ual-reactjs-renderer';
import { Anchor } from 'ual-anchor';
import { Wax } from '@eosdacio/ual-wax';
import { useAuth } from './hooks/useAuth';
import { selectIsLoading, setNewToken, selectAuthToken } from './store/slices/auth/';
import { selectUserData } from './store/slices/user/';
import routes from './routes';
import { OverlayngPortal } from 'highComponents';
import { apiClient } from 'utils/api/AxiosInstance';
import { Storage } from './utils/storage';
import setRefreshToken from './utils/common/setRefreshToken';
import { timeExpire } from 'consts';

const App = () => {
  const elementPage = useRoutes(routes);
  const dispatch = useDispatch();
  const auth = useAuth();
  const authToken = useSelector(selectAuthToken);
  const isLoading = useSelector(selectIsLoading);

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

  /* Refresh token */
  useEffect(() => {
    const tokenDate = Storage.getStorage('tokenDate');
    let tokenCurrent = apiClient.defaults.headers.common['Authorization'];
    const timer = setTimeout(async () => {
      if (tokenCurrent && tokenDate && Date.now() >= tokenDate) {
        const tokenRefresh = Storage.getStorage('tokenRefresh');
        const {
          data: { token: newToken, refresh_token },
        } = await apiClient.post('/api/auth/refresh', {
          token: tokenCurrent,
          refresh_token: tokenRefresh,
        });
        setRefreshToken(refresh_token);
        tokenCurrent = newToken;
        apiClient.defaults.headers.common['Authorization'] = tokenCurrent;
        dispatch(setNewToken(tokenCurrent));
      }
    }, timeExpire + 5000);
    return () => clearTimeout(timer);
  }, [dispatch, authToken]);

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
