import { createSlice } from '@reduxjs/toolkit'
import { updateAccountName, updateAccountBalance, makeTransaction } from './action'

const { actions, reducer } = createSlice({
  name: 'wax',
  initialState: {
    account: {
      isActiveUser: false,
      accountName: '',
      accountBalance: null
    },
    isLoading: false
  },
  reducers: {
    setActiveUser (state, payload) {
      console.log('payload--', payload)
      state.account = payload.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateAccountName.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(updateAccountName.fulfilled, (state, action) => {
        state.account.accountName = action.payload
        state.account.isActiveUser = true
        state.isLoading = false
      })
      .addCase(updateAccountName.rejected, (state, action) => {
        state.isLoading = false
        console.log('REJECTED UPDATE USER--', action)
      })

      .addCase(updateAccountBalance.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(updateAccountBalance.fulfilled, (state, action) => {
        state.account.accountBalance = action.payload
        state.isLoading = false
      })
      .addCase(updateAccountBalance.rejected, (state, action) => {
        console.log('REJECTED UPDATE BALANCE--', action)
        state.isLoading = false
      })

      .addCase(makeTransaction.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(makeTransaction.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(makeTransaction.rejected, (state, action) => {
        console.log('REJECTED UPDATE BALANCE--', action)
        state.isLoading = false
      })
  }
})

export const selectIsActiveUser = (state) => {
  return state.wax.account.isActiveUser
}
export const selectAccountName = (state) => state.wax.account.accountName
export const selectAccountBalance = (state) => state.wax.account.accountBalance

export const { setActiveUser } = actions

export default reducer
