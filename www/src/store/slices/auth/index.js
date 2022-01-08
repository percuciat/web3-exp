import {createSlice} from '@reduxjs/toolkit'
import {loginUser, registerUser, sendToken, addToken, logoutUser, updateProfile} from './action'
import {Storage} from '../../../utils/storage'

const {actions, reducer} = createSlice({
  name: 'auth',
  initialState: {
    isAuth: !!Storage.getStorage('token'),
    isLoading: false,
    token: Storage.getStorage('token'),
    userData: null,
    errorsObj: null,
    isVerify: false,
  },
  reducers: {
    verifyUser(state) {
      state.isVerify = true
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuth = true;
        Storage.setStorage('token', action.payload);
        state.token = action.payload;
        state.isLoading = false;
      })

      .addCase(loginUser.rejected, (state, action) => {
        // state.isAuth = false;
        // state.errorsObj = action.payload;
        state.isLoading = false;
      })

      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuth = true;
        Storage.setStorage('token', action.payload);
        state.token = action.payload;
        state.isLoading = false;
        // state.errorsObj = null
      })

      .addCase(registerUser.rejected, (state, action) => {
        // state.errorsObj = action.payload;
        state.isLoading = false;
      })

      .addCase(sendToken.fulfilled, (state, action) => {
        // action.payload
        state.userData = action.payload;
        state.isLoading = false;
      })

      .addCase(sendToken.rejected, (state, action) => {
        // state.userData = null;
        state.isLoading = false;
      })

      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isAuth = false;
        state.userData = null;
        state.token = null;
        Storage.removeStorage('token');
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.userData.wallet = action.payload.wallet;
      })

      .addCase(updateProfile.rejected, (state, action) => {
        console.log('error update profile', action.payload)
      })
  }
});
export const {verifyUser} = actions;

export const selectIsVerify = (state) => state.auth.isVerify;
export const selectIsAuth = (state) => state.auth.isAuth;
export const selectUserData = (state) => state.auth.userData;
export const selectErrorsObj = (state) => state.auth.errorsObj;
export const selectToken = (state) => state.auth.token;
export const selectIsLoading = (state) => state.auth.isLoading;

export default reducer