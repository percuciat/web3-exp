import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://api.thelabyrinth.world',
  withCredentials: false,
});

export const setInstanceAxiosWithStore = (storeRedux) => {
  apiClient.interceptors.request.use(
    async (request) => {
      const tokenCurrent = apiClient.defaults.headers.common['Authorization'];
      if (tokenCurrent) {
        request.headers = { Authorization: `Bearer ${tokenCurrent}` };
      }
      return request;
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
