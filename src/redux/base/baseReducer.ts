import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { baseApi } from './baseApi';
import meetingReducer from '../features/meeting/meetingSlice';
import authReducer from '../features/auth/authSlice';

const persistAuthConfig = {
      key: 'auth',
      storage,
};

const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);

export const baseReducer = {
      [baseApi.reducerPath]: baseApi.reducer,
      auth: persistedAuthReducer,
      meeting: meetingReducer,
};
