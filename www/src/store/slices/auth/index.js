import {createSlice} from '@reduxjs/toolkit'
import {loginUser, registerUser, sendToken, addToken, logoutUser} from './action'

const {actions, reducer} = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    isLoading: false,
    token: null,
    userData: null,
    errorsObj: null
  },
  reducers: {
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
        console.log('REJECTED REGISTER', action.payload)
        state.errorsObj = action.payload;
        state.isLoading = false;
        /* state.isAuth = false;
        state.isLoading = false;*/
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
  }
});

export const selectIsAuth = (state) => state.auth.isAuth;
export const selectUserData = (state) => state.auth.userData;
export const selectErrorsObj = (state) => state.auth.errorsObj;
export const selectToken = (state) => state.auth.token;
export const selectIsLoading = (state) => state.auth.isLoading;
export default reducer