import { createAsyncThunk } from '@reduxjs/toolkit'
import { JsonRpc } from 'eosjs'

export const updateAccountName = createAsyncThunk(
  'wax/UPDATE_ACCOUNT_NAME',
  async (API_activeUser, { getState, dispatch, rejectWithValue }) => {
    try {
      const accountName = await API_activeUser.getAccountName()
      return accountName
    } catch (e) {
      return rejectWithValue('Cannot update user', e.response.data)
    }
  })

export const updateAccountBalance = createAsyncThunk(
  'wax/UPDATE_ACCOUNT_BALANCE',
  async (accName, { getState, dispatch, rejectWithValue }) => {
    try {
      const rpc = new JsonRpc('https://waxtestnet.greymass.com:443')
      const account = await rpc.get_account(accName)
      const accountBalance = account.core_liquid_balance
      return accountBalance
    } catch (e) {
      return rejectWithValue('Cannot update user', e.response.data)
    }
  })

export const makeTransaction = createAsyncThunk(
  'wax/MAKE_TRANSACTION',
  async (API_activeUser, { getState, dispatch, rejectWithValue }) => {
    const { mine: { transactionData } } = getState()
    console.log('transactionData--', transactionData)
    const demoTransaction = {
      actions: [{
        account: 'adenmytest11',
        name: 'mine',
        authorization: [{
          actor: '', // use account that was logged in
          permission: 'owner'
        }],
        data: {
          id: transactionData.id,
          nonce: transactionData.nonce
        }
      }]
    }
    const { wax: { account } } = getState()
    demoTransaction.actions[0].authorization[0].actor = account.accountName

    try {
      console.log('demoTransaction--', demoTransaction)
      const signTransaction = await API_activeUser.signTransaction(demoTransaction, {
        blocksBehind: 3,
        expireSeconds: 30
      })
      return signTransaction
      // dispatch(updateAccountBalance(account.accountName))
    } catch (e) {
      console.log('e signTransaction', e)
      return rejectWithValue('Cannot update user', e.response.data)
    }
  })

// export const refreshToken
