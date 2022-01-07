import {createSlice} from '@reduxjs/toolkit'
import {loginUser, registerUser, sendToken, addToken, logoutUser, updateProfile} from './action'

const {actions, reducer} = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    isLoading: false,
    token: null,
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
        state.isAuth = false;
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.isLoading = false;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.isAuth = false;
        state.isLoading = false;
      })

      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.isLoading = false;
        state.errorsObj = null
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.errorsObj = action.payload;
        state.isLoading = false;
      })

      .addCase(sendToken.fulfilled, (state, action) => {
        // action.payload
        state.userData = action.payload;
        state.isLoading = false;
      })

      .addCase(sendToken.rejected, (state, action) => {
        state.userData = null;
        state.isLoading = false;
      })

      .addCase(addToken.fulfilled, (state, action) => {
        // action.payload
        state.token = action.payload;
      })

      .addCase(logoutUser.fulfilled, (state, action) => {
        // action.payload
        console.log('action.payload LOGOUT', action.payload)
        state.isAuth = false;
        state.userData = null;
        state.token = null;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        // action.payload
        console.log('action.payload LOGOUT', action.payload)
        state.userData.wallet = action.payload;
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