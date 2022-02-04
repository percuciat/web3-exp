import axios from 'axios';
import { Storage } from '../storage';
import getPureMinutes from '../common/getPureMinutes';

const apiClient = axios.create({
  baseURL: 'http://api.thelabyrinth.world',
  withCredentials: false,
});

apiClient.interceptors.request.use(
  (request) => {
    const token = Storage.getStorage('token');
    const tokenDate = Storage.getStorage('tokenDate');
    if (token) {
      request.headers = { Authorization: `Bearer ${token}` };
    }
    console.log('AXIOS interceptor request:', request);
    return request;
  },
  (error) => {
    console.log('error AXIOS interceptor request:', error);
    /*  console.log('error Axios', error);
    const token = Storage.getStorage('token');
    const tokenDate = Storage.getStorage('tokenDate');
    if (error.status === '403') {
      const responseRefresh = apiClient.get('api/auth/refresh', {
        headers: { Authorization: `Bearer ${token}` },
      });
      Storage.setStorage('token', responseRefresh.data.token);
      Storage.setStorage('tokenDate', getPureMinutes());
      request.headers.common.Authorization = `Bearer ${token}`;
    } */

    return Promise.reject(error);
  }
);
let f = false;

apiClient.interceptors.response.use(
  (response) => {
    console.log('AXIOS interceptor response:', response);
    return response;
  },
  async function (error) {
    console.log('error AXIOS interceptor response:', error.response);
    /*  const originalRequest = error.config;
    if (error.response.status === 403 && !f) {
      const token = Storage.getStorage('token');
      f = true;
      const responseRefresh = await apiClient.get('api/auth/refresh', {
        headers: { Authorization: `Bearer ${token}` },
      });
      Storage.setStorage('token', responseRefresh.data.token);
      Storage.setStorage('tokenDate', getPureMinutes());
      const access_token = await refreshAccessToken();
      apiClient.headers.common.Authorization = `Bearer ${token}`;
      return apiClient(originalRequest);
    } */
    return Promise.reject(error.response);
  }
);

export const makeRequest = (method, args) => {
  const { url, headers, data } = args;
  return apiClient
    .request({ url, method, headers, data })
    .then((res) => {
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      return res.data;
    })
    .catch((e) => {
      throw e.data;
    });
};
