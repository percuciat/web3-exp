import axios from 'axios'
import { Storage } from '../storage'
import getPureMinutes from '../common/getPureMinutes'

/* const apiClient = axios.create({
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

export default makeRequest; */

const makeRequest = (method, ...args) => {
  const [url, options] = args
  const {
    data = {},
    headers = {},
    baseUrl = 'http://api.thelabyrinth.world'
  } = options
  return axios({
    method,
    baseUrl: 'http://api.thelabyrinth.world',
    url,
    headers,
    withCredentials: false,
    data
  })
    .then((res) => {
      if (res.data.error) {
        throw new Error(res.data.error)
      }
      console.log('RES DATA', res.data)
      return res.data
    })
    .catch((e) => {
      console.log('Error AXIOS', e)
      throw e.message
    })
}

export const api = (methodRequest, url, options) => {
  const token = Storage.getStorage('token')
  const tokenDate = Storage.getStorage('tokenDate')
  if (token) {
    options.headers = { Authorization: `Bearer ${token}` }
    if ((getPureMinutes() - tokenDate) >= 50) {
      const response = makeRequest('get', 'api/auth/refresh', options.headers)
      Storage.setStorage('token', response.data.token)
      Storage.setStorage('tokenDate', getPureMinutes())
      options.headers = { Authorization: `Bearer ${response.data.token}` }
    }
  }
  return makeRequest(methodRequest, url, options)
}
