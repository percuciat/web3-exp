import axios from 'axios';
import { Storage } from '../storage';
import getPureMinutes from "../common/getPureMinutes";

const apiClient = axios.create({
  baseURL: 'http://api.thelabyrinth.world',
  withCredentials: false,
});

const makeRequest = async (url, method, data = {}, header = {}) => {
  const tokenDate = Storage.getStorage('tokenDate');
  if (header && header.authorization) {
    header = {headers: {"Authorization": `Bearer ${Storage.getStorage('token')}`}}
  }
  // TODO вынести отдельно ?
  if (tokenDate && (getPureMinutes() - tokenDate) >= 1) {
    const response = await apiClient.get('api/auth/refresh', header);
    Storage.setStorage('token', response.data.token);
    Storage.setStorage('tokenDate', getPureMinutes());
    header = {headers: {"Authorization": `Bearer ${Storage.getStorage('token')}`}}
  }
  switch (method) {
    case 'get':
      return apiClient.get(url, header);
    case 'put':
      return apiClient.put(url, data, header);
    case 'post':
      return apiClient.post(url, data, header);
  }
};


export default makeRequest;