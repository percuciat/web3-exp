import {createSlice} from '@reduxjs/toolkit'

const {actions, reducer} = createSlice({
  name: 'profile',
  initialState: {
    profile: false,
  },
  reducers: {
    verifyUser(state) {
      state.isVerify = true
    }
  },
});

export const selectIsVerify = (state) => state.auth.isVerify;
export const { verifyUser } = actions;

export default reducer