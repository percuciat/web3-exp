import { Storage } from '../storage';
/**
 * params (int) ms 1000(ms) * 60(sec) * 30 (min) 1800000
 */
const timeExpire = 60000;

export default function setRefreshToken(dataToken) {
  Storage.setStorage('tokenRefresh', dataToken);
  Storage.setStorage('tokenDate', Date.now() + timeExpire);
}
