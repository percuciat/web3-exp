import { Storage } from '../../utils/storage';
import { makeRequest } from '../../utils/api';
import getPureMinutes from '../../utils/common/getPureMinutes';

export default async function () {
  const tokenDate = Storage.getStorage('tokenDate');
  console.log('MIDDLEWARE');
  const response = await makeRequest('api/auth/refresh', 'get', {}, { authorization: true });

  /*
   * If (tokenDate && getPureMinutes() - tokenDate >= 1) {
   * const response = await makeRequest("api/auth/refresh", "get", {}, {authorization: true});
   * Storage.setStorage("tokenDate", response.data)
   * }
   */
}
