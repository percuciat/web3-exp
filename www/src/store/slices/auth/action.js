import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../../utils/api'

export const sendToken = createAsyncThunk(
  'auth/AUTH_USER',
  async (dataToken, { getState, dispatch, rejectWithValue }) => {
    try {
      const answerAuth = await api('get', 'api/user')
      return answerAuth.data
    } catch (e) {
      return rejectWithValue('token Not valid', e.response.data)
    }
  })

export const loginUser = createAsyncThunk(
  'auth/AUTH_LOGIN',
  async (dataForm, { getState, dispatch, rejectWithValue }) => {
    const { email, password } = dataForm
    /* console.log('extra-', extra)
    extra() */
    try {
      const response = await api('post', 'api/auth/login', {}, {email, password})
      return response.token
    } catch (e) {
      console.log('ERROR sending token--', e)
      return rejectWithValue(e.response.data)
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/AUTH_REGISTER',
  async (dataForm, { dispatch, rejectWithValue }) => {
    const { email, password, password_confirmation } = dataForm
    try {
      const response = await api('post', 'api/auth/register', {}, {
          email,
          password,
          password_confirmation
      })
      return response.token
    } catch (e) {
      console.log('ERROR Register--', e)
      return rejectWithValue(e.response.data)
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/AUTH_LOGOUT',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api('get', 'api/auth/logout')
      return response.data
    } catch (e) {
      console.log('e LOGOUT', e)
      return rejectWithValue(e.response.data)
    }
  }
)

export const getProfileData = createAsyncThunk(
  'auth/GET_PROFILE_DATA',
  async (wallet, { getState, dispatch, rejectWithValue }) => {
    try {
      const response = await api('get', 'api/profile')
      console.log('GET_PROFILE_DATA--', response)
      return response.data
    } catch (e) {
      console.log('e updateProfile', e)
      return rejectWithValue(e.response.data)
    }
  })

export const updateProfile = createAsyncThunk(
  'auth/UPDATE_PROFILE',
  async (wallet, { getState, dispatch, rejectWithValue }) => {
    try {
      const response = await api('put', 'api/profile', { data: { wallet } })
      response.data.wallet = wallet
      return response.data
    } catch (e) {
      console.log('e updateProfile', e)
      return rejectWithValue(e.response.data)
    }
  })
