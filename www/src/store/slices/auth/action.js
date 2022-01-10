import {createAsyncThunk} from "@reduxjs/toolkit";
import makeRequest from "../../../utils/api";

export const sendToken = createAsyncThunk(
  'auth/AUTH_USER',
  async (dataToken, {getState, dispatch, rejectWithValue}) => {
    try {
      const answerAuth = await makeRequest('api/user', 'get', {}, {authorization: true});
      return answerAuth.data
    } catch (e) {
      return rejectWithValue('token Not valid', e.response.data)
    }
});

// export const refreshToken

export const loginUser = createAsyncThunk(
  'auth/AUTH_LOGIN',
  async (dataForm, { getState, dispatch, extra, rejectWithValue  }) => {
    const { email, password } = dataForm;
    console.log('extra-', extra)
    extra();
    try {
      const response = await makeRequest('api/auth/login', 'post', {
        email,
        password
      });
      return response.data.token
    } catch (e) {
      console.log('ERROR sending token--', e);
      return rejectWithValue(e.response.data)
    }
  }
);


export const registerUser = createAsyncThunk(
  'auth/AUTH_REGISTER',
  async (dataForm, {dispatch, rejectWithValue}) => {
    const { email, password, password_confirmation } = dataForm;
    try {
      const response = await makeRequest('api/auth/register', 'post', {
        email,
        password,
        password_confirmation
      });
      return response.data.token
    } catch (e) {
      console.log('ERROR Register--', e);
      return rejectWithValue(e.response.data)
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/AUTH_LOGOUT',
  async (_, {rejectWithValue}) => {
    try {
      const response = await makeRequest('api/auth/logout', 'get', {}, {authorization: true});
      return response.data
    } catch (e) {
      console.log('e LOGOUT', e)
      return rejectWithValue(e.response.data)
    }
  }
);


export const getProfileData = createAsyncThunk(
  'auth/GET_PROFILE_DATA',
  async (wallet, {getState,  dispatch, rejectWithValue}) => {
    try {
      const response = await makeRequest('api/profile', 'get', {}, {authorization: true});
      console.log('GET_PROFILE_DATA--', response)
      return response.data
    } catch (e) {
      console.log('e updateProfile', e)
      return rejectWithValue(e.response.data)
    }
  });

export const updateProfile = createAsyncThunk(
  'auth/UPDATE_PROFILE',
  async (wallet, {getState,  dispatch, rejectWithValue}) => {
    try {
      const response = await makeRequest('api/profile', 'put', {wallet}, {authorization: true});
      response.data.wallet = wallet;
      return response.data
    } catch (e) {
      console.log('e updateProfile', e)
      return rejectWithValue(e.response.data)
    }
  });
