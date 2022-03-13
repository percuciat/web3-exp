import { Storage } from '../storage';
/**
 * params (int) ms
 */
const timeExpire = 1800000;

export default function setRefreshToken(dataToken) {
  Storage.setStorage('tokenRefresh', dataToken);
  Storage.setStorage('tokenDate', Date.now() + timeExpire);
}
