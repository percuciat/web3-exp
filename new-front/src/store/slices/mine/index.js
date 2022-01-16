import {createSlice} from '@reduxjs/toolkit'
import {startMine} from "./action";

const {actions, reducer} = createSlice({
  name: 'mine',
  initialState: {
    isVerify: false,
    transactionData: {}
  },
  reducers: {
    verifyUser(state) {
      state.isVerify = true
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(startMine.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(startMine.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactionData = action.payload
      })

      .addCase(startMine.rejected, (state, action) => {
        state.isLoading = false;
        console.log('START MINE REJECTED')
      })
  }
});

export const selectIsVerify = (state) => state.mine.isVerify;
export const { verifyUser } = actions;

export default reducer