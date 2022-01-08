import axios from 'axios';
import { Storage } from '../storage';

const apiClient = axios.create({
  baseURL: 'http://api.thelabyrinth.world',
  withCredentials: false,
});

const makeRequest = (url, method, data = {}, header = {}) => {
  if (header && header.authorization) {
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