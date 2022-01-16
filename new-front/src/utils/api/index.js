import axios from "axios";
import {Storage} from "../storage";
import getPureMinutes from "../common/getPureMinutes";

const apiClient = axios.create({
  baseURL: "http://api.thelabyrinth.world",
  withCredentials: true
})

apiClient.interceptors.request.use((request) => {
  const token = Storage.getStorage("token")
  const tokenDate = Storage.getStorage("tokenDate")
  const isApiUrl = request.url.startsWith("http://api.thelabyrinth.world");
  const minutes = 50;
  if (token && isApiUrl) {
    request.headers.common.Authorization = `Bearer ${token}`;
    if (getPureMinutes() - tokenDate >= minutes) {
      const responseRefresh = apiClient.get("api/auth/refresh", {
        headers: {"Authorization": `Bearer ${token}`}
      })
      Storage.setStorage("token", responseRefresh.data.token)
      Storage.setStorage("tokenDate", getPureMinutes())
      request.headers.common.Authorization = `Bearer ${token}`;
    }
  }
  return request
})

export const makeRequest = (method, args) => {
  const {url, headers, data} = args

  return apiClient.request(method, {url, headers, data}).
    then((res) => {
      if (res.data.error) {
        throw new Error(res.data.error)
      }
      console.log("RES DATA", res.data)
      return res.data
    }).
    catch((e) => {
      console.log("Error AXIOS", e)
      throw e.message
    })
}
