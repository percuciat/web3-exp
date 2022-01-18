import axios from "axios";
import {Storage} from "../storage";
import getPureMinutes from "../common/getPureMinutes";

const apiClient = axios.create({
  baseURL: "http://api.thelabyrinth.world",
  withCredentials: false
});

apiClient.interceptors.request.use((request) => {
  const token = Storage.getStorage("token")
  const tokenDate = Storage.getStorage("tokenDate")
  const minutes = 50;
  if (token) {
    request.headers = {"Authorization": `Bearer ${token}` };

    /*
      If ((getPureMinutes() - tokenDate) >= minutes) {
      console.log("refr");
      const responseRefresh = apiClient.get("api/auth/refresh", {
        headers: {"Authorization": `Bearer ${token}`}
      })
      Storage.setStorage("token", responseRefresh.data.token)
      Storage.setStorage("tokenDate", getPureMinutes())
      request.headers.common.Authorization = `Bearer ${token}`;
      } 
     */
  }
  return request
}, (error) => Promise.reject(error))

export const makeRequest = (method, args) => {
  const {url, headers, data} = args;
  return apiClient.request({url, method, headers, data}).
    then((res) => {
      if (res.data.error) {
        throw new Error(res.data.error)
      }
      console.log(`REQUEST to ${url}`, res.data)
      return res.data
    }).
    catch((e) => {
      console.log("Error AXIOS", e)
      throw e.message
    })
}
