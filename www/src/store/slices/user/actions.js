import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest } from 'utils/api';

export const getUserData = createAsyncThunk(
  'user/USER_DATA',
  async (dataToken, { rejectWithValue }) => {
    try {
      const answerAuth = await makeRequest('get', { url: 'api/user' });
      return answerAuth;
    } catch (e) {
      console.log('e-- Action', e);
      return rejectWithValue('token Not valid', e.response.data);
    }
  }
);

export const getProfileData = createAsyncThunk(
  'user/GET_PROFILE_DATA',
  async (wallet, { rejectWithValue }) => {
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
  'user/UPDATE_PROFILE',
  async (wallet, { rejectWithValue }) => {
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
