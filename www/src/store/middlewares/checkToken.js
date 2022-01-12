import { Storage } from '../../utils/storage'
import { api } from '../../utils/api'
import getPureMinutes from '../../utils/common/getPureMinutes'

export default async function () {
  const tokenDate = Storage.getStorage('tokenDate')
  console.log('MIDDLEWARE')
  if (tokenDate && (getPureMinutes() - tokenDate) >= 1) {
    const response = await api('get', 'api/auth/refresh')
    Storage.setStorage('tokenDate', response.data)
  }
}
