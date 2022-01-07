import {createAsyncThunk, createAction} from "@reduxjs/toolkit";
import apiClient from "../../../api";


export const addToken = createAsyncThunk('auth/ADD_TOKEN', function prepare(token) {
  return token
});


export const sendToken = createAsyncThunk(
  'auth/SEND_TOKEN',
  async (dataToken, {getState, dispatch, rejectWithValue}) => {
  if (dataToken) {
    dispatch(addToken(dataToken));
    const answerAuth = await apiClient.get('api/user', {headers: {"Authorization": `Bearer ${dataToken}`}});
    return answerAuth.data
  } else {
    return rejectWithValue('token Not valid')
  }
});


export const loginUser = createAsyncThunk(
  'auth/AUTH_LOGIN',
  async (dataForm, { getState, dispatch, rejectWithValue  }) => {
    const { email, password } = dataForm;
    try {
      const response = await apiClient.post('api/auth/login', {
        email,
        password
      });
      dispatch(sendToken(response.data.token))
    } catch (e) {
      console.log('ERROR sending token--', e);
      return rejectWithValue(e.response.data)
      /*return e*/
    }
  }
);


export const registerUser = createAsyncThunk(
  'auth/AUTH_REGISTER',
  async (dataForm, {dispatch, rejectWithValue}) => {
    const { email, password, password_confirmation } = dataForm;
    try {
      const response = await apiClient.post('api/auth/register', {
        email,
        password,
        password_confirmation
      });
      dispatch(sendToken(response.data.token))
    } catch (e) {
      console.log('ERROR Register--', e);
      return rejectWithValue(e.response.data)
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/AUTH_LOGOUT',
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.post('api/auth/logout');
      console.log('response.data LOGOUT', response.data);
      return response.data
    } catch (e) {
      console.log('ERROR Register--', e);
      return e
    }
  }
);

