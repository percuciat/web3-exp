import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import waxReducer from './slices/wax';
import commonReducer from './slices/common';
import mineReducer from './slices/mine';
import checkToken from './middlewares/checkToken';

const store = configureStore({
  reducer: {
    auth: authReducer,
    common: commonReducer,
    wax: waxReducer,
    mine: mineReducer,
    /*profile: profileReducer*/
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: checkToken,
      },
      serializableCheck: false,
    }),
});

export default store;
