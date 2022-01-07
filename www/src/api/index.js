import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://api.thelabyrinth.world',
  withCredentials: false,
});

export default apiClient;