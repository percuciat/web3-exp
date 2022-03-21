import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest } from 'utils/api';
import { apiClient } from 'utils/api/AxiosInstance';
import { resetUserData } from 'store/slices/user';
import { setNewToken } from './';

export const loginUser = createAsyncThunk(
  'auth/AUTH_LOGIN',
  async (dataForm, { dispatch, rejectWithValue }) => {
    const { email, password } = dataForm;
    try {
      const { token, refresh_token } = await makeRequest('post', {
        url: 'api/auth/login',
        data: { email, password },
      });
      dispatch(setNewToken(token));
      apiClient.defaults.headers.common['Authorization'] = token;
      return {
        token,
        refreshToken: refresh_token,
      };
    } catch (e) {
      console.log('ERROR sending token--', e);
      return rejectWithValue(e);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/AUTH_REGISTER',
  async (dataForm, { dispatch, rejectWithValue }) => {
    const { email, password, password_confirmation } = dataForm;
    try {
      const { token, refresh_token } = await makeRequest('post', {
        url: 'api/auth/register',
        data: { email, password, password_confirmation },
      });
      dispatch(setNewToken(token));
      apiClient.defaults.headers.common['Authorization'] = token;
      return {
        token,
        refreshToken: refresh_token,
      };
    } catch (e) {
      console.log('ERROR Register--', e);
      return rejectWithValue(e);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/AUTH_LOGOUT',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await makeRequest('get', { url: 'api/auth/logout' });
      dispatch(resetUserData());
      return response.data;
    } catch (e) {
      console.log('e LOGOUT', e);
      return rejectWithValue(e.response.data);
    }
  }
);
