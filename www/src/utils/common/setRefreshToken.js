import { Storage } from '../storage';
import { timeExpire } from 'consts';
/**
 * params (int) ms 1000(ms) * 60(sec) * 30 (min) 1800000
 */

export default function setRefreshToken(dataToken) {
  Storage.setStorage('tokenRefresh', dataToken);
  Storage.setStorage('tokenDate', Date.now() + timeExpire);
}
