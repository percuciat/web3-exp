/*
import {createAsyncThunk} from "@reduxjs/toolkit";
import apiClient from "../../../api";
import {addToken} from "../auth/action";

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
  });*/
