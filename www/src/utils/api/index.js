import { apiClient } from './AxiosInstance';

/* 
export const axiosBaseQuery = ({ baseUrl } = { baseUrl: '' }) => {
  return async ({ url, method, data }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };
}; */

export const makeRequest = (method, args) => {
  const { url, headers, data } = args;
  return apiClient
    .request({ url, method, headers, data })
    .then((res) => {
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      return res.data;
    })
    .catch((e) => {
      throw e.data;
    });
};
