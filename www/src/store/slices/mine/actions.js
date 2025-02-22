import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest } from 'utils/api';

export const startMine = createAsyncThunk(
  'mine/START_MINE',
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const response = await makeRequest('get', { url: 'api/mine' });
      return response;
    } catch (e) {
      // TODO показать ошибку не верификации по почте пользователя
      return rejectWithValue('token Not valid', e.response.data);
    }
  }
);
