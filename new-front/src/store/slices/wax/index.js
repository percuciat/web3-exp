import { createSlice } from '@reduxjs/toolkit';
import { updateAccountName, updateAccountBalance, makeTransaction } from './action';

const { actions, reducer } = createSlice({
  name: 'wax',
  initialState: {
    account: {
      isActiveUser: false,
      wallet: '',
      balance: null,
      permission: null,
    },
    isLoading: false,
  },
  reducers: {
    setActiveUser(state, action) {
      state.account = payload.payload;
    },
    updateUser(state, payload) {
      state.account.isActiveUser = true;
      state.account.wallet = payload.payload.accountName;
      state.account.permission = payload.payload.requestPermission;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(updateAccountName.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateAccountName.fulfilled, (state, action) => {
        state.account.accountName = action.payload;
        state.account.isActiveUser = true;
        state.isLoading = false;
      })
      .addCase(updateAccountName.rejected, (state, action) => {
        state.isLoading = false;
        console.log('REJECTED UPDATE USER--', action);
      })

      .addCase(updateAccountBalance.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateAccountBalance.fulfilled, (state, action) => {
        state.account.balance = action.payload;
        state.isLoading = false;
      })
      .addCase(updateAccountBalance.rejected, (state, action) => {
        console.log('REJECTED UPDATE BALANCE--', action);
        state.isLoading = false;
      })

      .addCase(makeTransaction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(makeTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(makeTransaction.rejected, (state, action) => {
        console.log('REJECTED UPDATE BALANCE--', action);
        state.isLoading = false;
      });
  },
});

export const selectIsActiveUser = (state) => state.wax.account.isActiveUser;
export const selectAccountWallet = (state) => state.wax.account.wallet;
export const selectAccountBalance = (state) => state.wax.account.balance;

export const { setActiveUser, updateUser } = actions;

export default reducer;
