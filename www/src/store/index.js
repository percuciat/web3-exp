import { configureStore } from '@reduxjs/toolkit'
import authReducer  from './slices/auth'
import waxReducer  from './slices/wax'
import commonReducer  from './slices/common'
import mineReducer  from './slices/mine'

const store = configureStore({
  reducer: {
    auth: authReducer,
    common: commonReducer,
    wax: waxReducer,
    mine: mineReducer,
    /*profile: profileReducer*/
  },
});

export default store