import axios from 'axios';
import { Storage } from '../storage';
import setRefreshToken from '../common/setRefreshToken';

let f = false;

export const apiClient = axios.create({
  baseURL: 'http://api.thelabyrinth.world',
  withCredentials: false,
});

export const setInstanceAxiosWithStore = (storeRedux) => {
  apiClient.interceptors.request.use(
    async (request) => {
      if (!f) {
        console.log('store ---', storeRedux.getState());
        f = true;
        let tokenCurrent = apiClient.defaults.headers.common['Authorization'];

        const tokenDate = Storage.getStorage('tokenDate');
        if (tokenCurrent) {
          if (new Date() >= tokenDate) {
            const tokenRefresh = Storage.getStorage('tokenRefresh');
            const { token: newToken, refresh_token } = await apiClient.post('/api/auth/refresh', {
              data: {
                token: tokenCurrent,
                refresh_token: tokenRefresh,
              },
            });
            setRefreshToken(refresh_token);
          }
          request.headers = { Authorization: `Bearer ${tokenCurrent}` };
        }
        return request;
      }
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  apiClient.interceptors.response.use(
    (response) => {
      console.log('AXIOS interceptor response:', response);
      return response;
    },
    async function (error) {
      console.log('error AXIOS interceptor response:', error);
      return Promise.reject(error.response);
    }
  );
};
