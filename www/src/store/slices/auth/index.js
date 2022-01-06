import {createSlice} from '@reduxjs/toolkit'
import {loginUser} from './action'

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    isLoading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.isAuth = false;
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isAuth = true;
      state.isLoading = false;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.isAuth = false;
      state.isLoading = false;
    })
  }
});

export const selectIsAuth = (state) => state.auth.isAuth;
export const selectIsLoading = (state) => state.auth.isLoading;
export default reducer