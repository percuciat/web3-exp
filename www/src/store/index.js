import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import waxReducer from './slices/wax';
import commonReducer from './slices/common';
import mineReducer from './slices/mine';
import userReducer from './slices/user';
import checkToken from './middlewares/checkToken';
import { setInstanceAxiosWithStore } from 'utils/api/AxiosInstance';
/* import { apiRTQ } from './slices/auth'; */

const store = configureStore({
  reducer: {
    /*  [apiRTQ.reducerPath]: apiRTQ.reducer, */
    auth: authReducer,
    common: commonReducer,
    wax: waxReducer,
    mine: mineReducer,
    user: userReducer,
    /*profile: profileReducer*/
  },
  /*  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiRTQ.middleware), */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: checkToken,
      },
      serializableCheck: false,
    }),
});

export default store;
