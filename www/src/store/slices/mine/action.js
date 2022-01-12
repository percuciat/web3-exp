import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../../utils/api'
export const startMine = createAsyncThunk(
  'mine/START_MINE',
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const response = await api('get', 'api/mine')
      return response.data
    } catch (e) {
      // TODO показать ошибку не верификации по почте пользователя
      return rejectWithValue('token Not valid', e.response.data)
    }
  })
