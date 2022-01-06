import {createAsyncThunk} from "@reduxjs/toolkit";
import apiClient from "../../../api";

export const loginUser = createAsyncThunk(
  'auth/AUTH_LOGIN',
  async (dataForm, thunkAPI) => {
    const { email, password } = dataForm;
    try {
      const response = await apiClient.post('api/auth/login', {
        email,
        password
      });
      const token = response.data.token;
      const answerAuth = await apiClient.get('api/user', {headers: {"Authorization": `Bearer ${token}`}});
      console.log('answer AUTH---', answerAuth);
      return answerAuth.data
    } catch (e) {
      console.log('ERROR sending token--', e);
      return e
    }
  }
);


