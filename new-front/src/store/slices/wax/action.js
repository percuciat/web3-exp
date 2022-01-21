import {createAsyncThunk} from "@reduxjs/toolkit";
import {JsonRpc} from "eosjs";

export const updateAccountName = createAsyncThunk("wax/UPDATE_ACCOUNT_NAME", 
async (API_activeUser, {getState, dispatch, rejectWithValue}) => {
    try {
      const accountName = await API_activeUser.getAccountName();
      return accountName;
    } catch (e) {
      return rejectWithValue("Cannot update user", e.response.data)
    }
  });

export const updateAccountBalance = createAsyncThunk("wax/UPDATE_ACCOUNT_BALANCE", 
async (accName, {getState, dispatch, rejectWithValue}) => {
    try {
      const rpc = new JsonRpc("https://waxtestnet.greymass.com:443");
      const account = await rpc.get_account(accName);
      const accountBalance = account.core_liquid_balance;
      return accountBalance;
    } catch (e) {
      return rejectWithValue("Cannot update user", e.response.data)
    }
  });

export const makeTransaction = createAsyncThunk("wax/MAKE_TRANSACTION", 
async (API_activeUser, {getState, dispatch, rejectWithValue}) => {
    const {mine: {transactionData}, wax: {account}} = getState();
    console.log("account", account);

   const demoTransaction = {
      actions: [
        {
          account: "adenmytest11",
          name: "mine",
          data: {
            username: account.wallet,
            id: transactionData.id,
            nonce: transactionData.nonce
          },
          authorization: [
            {
              actor: account.wallet, 
              permission: account.permission
            }
          ]
        }
      ]
    };

    /* 


    web----
    {
"expiration":"2022-01-20T21:57:07"
"ref_block_num":61775
"ref_block_prefix":1777236280
"max_net_usage_words":0
"max_cpu_usage_ms":0
"delay_sec":0
"context_free_actions":[]
"actions":[
0:{
"account":"adenmytest11"
"name":"mine"
"authorization":[
0:{
"actor":"percuicatwax"
"permission":"owner"
}
]
"data":{
"username":"percuicatwax"
"id":34
"nonce":"e427927b12c43ddbfc85c93548c6c39c..."
}
}
]
"transaction_extensions":[]
    
    
    */
    /*
    
    cleos -u https://testnet.wax.eosdetroit.io push transaction '{
  "delay_sec": 0,
  "max_cpu_usage_ms": 0,
  "actions": [
    {
      "account": "adenmytest11",
      "name": "mine",
      "data": {
        "username": "percuicatwax",
        "id": 32,
        "nonce": "462e4e7d415dbae68b7b5c7af2c536a98c0c3c5c73184868d5021e69ed3068fe"
      },
      "authorization": [
        {
          "actor": "percuicatwax",
          "permission": "owner"
        }
      ]
    }
  ]
}'
    */

    
   /*  demoTransaction.actions[0].authorization.actor = account.wallet;
    demoTransaction.actions[0].authorization.permission = account.permission; */

    try {
      console.log("demoTransaction--", demoTransaction);
      const signTransaction = await API_activeUser.signTransaction(demoTransaction, {
        blocksBehind: 3,
        expireSeconds: 30
      });
      return signTransaction
      // dispatch(updateAccountBalance(account.accountName))
    } catch (e) {
      console.log("e signTransaction", e)
      return rejectWithValue("Cannot update user", e.response.data)
    }
  });

// export const refreshToken
