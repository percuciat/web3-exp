import { createSlice, current } from '@reduxjs/toolkit';
import { getUserData, getProfileData, updateProfile } from './actions';

const { actions, reducer } = createSlice({
  name: 'user',
  initialState: {
    isLoading: false,
    userData: null,
    errorsObj: null,
    userProfile: null,
  },
  reducers: {
    resetUserData(state) {
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isLoading = false;
      })

      .addCase(getUserData.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.userData.wallet = action.payload.wallet;
      })

      .addCase(updateProfile.rejected, (state, action) => {
        console.log('error update profile', action.payload);
        state.isLoading = false;
      })

      .addCase(getProfileData.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getProfileData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userProfile = action.payload;
      })

      .addCase(getProfileData.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { resetUserData } = actions;
export const selectUserProfile = (state) => state.user.userProfile;
export const selectUserData = (state) => state.user.userData;
export const selectIsLoading = (state) => state.user.isLoading;

export default reducer;
