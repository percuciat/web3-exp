import { configureStore } from '@reduxjs/toolkit'
import authReducer  from './slices/auth'
import mineReducer  from './slices/mine'
import profileReducer  from './slices/profile'

const store = configureStore({
  reducer: {
    auth: authReducer,
    /*mine: mineReducer,
    profile: profileReducer*/
  },
});

export default store