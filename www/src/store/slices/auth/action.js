import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest } from 'utils/api';

export const getUserData = createAsyncThunk(
  'auth/AUTH_USER',
  async (dataToken, { getState, dispatch, rejectWithValue }) => {
    try {
      const answerAuth = await makeRequest('get', { url: 'api/user' });
      return answerAuth;
    } catch (e) {
      return rejectWithValue('token Not valid', e.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/AUTH_LOGIN',
  async (dataForm, { getState, dispatch, extra, rejectWithValue }) => {
    const { email, password } = dataForm;

    /*
     *  Console.log("extra-", extra)
     *  extra();
     */
    try {
      const response = await makeRequest('post', {
        url: 'api/auth/login',
        data: { email, password },
      });
      return response.token;
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
      const response = await makeRequest('post', {
        url: 'api/auth/register',
        data: { email, password, password_confirmation },
      });
      return response.token;
    } catch (e) {
      console.log('ERROR Register--', e);
      return rejectWithValue(e);
    }
  }
);

export const logoutUser = createAsyncThunk('auth/AUTH_LOGOUT', async (_, { rejectWithValue }) => {
  try {
    const response = await makeRequest('get', { url: 'api/auth/logout' });
    return response.data;
  } catch (e) {
    console.log('e LOGOUT', e);
    return rejectWithValue(e.response.data);
  }
});

export const getProfileData = createAsyncThunk(
  'auth/GET_PROFILE_DATA',
  async (wallet, { getState, dispatch, rejectWithValue }) => {
    try {
      const response = await makeRequest('get', { url: 'api/profile' });
      return response.data;
    } catch (e) {
      console.log('e updateProfile', e);
      return rejectWithValue(e.response.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/UPDATE_PROFILE',
  async (wallet, { getState, dispatch, rejectWithValue }) => {
    try {
      const response = await makeRequest('put', { url: 'api/profile', data: { wallet } });
      response.wallet = wallet;
      return response;
    } catch (e) {
      console.log('e updateProfile', e);
      return rejectWithValue(e.response.data);
    }
  }
);
