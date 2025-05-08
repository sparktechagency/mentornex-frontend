import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { baseApi } from './baseApi';
import meetingReducer from '../features/meeting/meetingSlice';
import authReducer from '../features/auth/authSlice';
import mentorFilterReducer from '../features/mentor-filter/mentorFilterSlice';
import chatReducer from '../features/chatlist/chatSlice';
import messageReducer from '../features/message/messageSlice';
import bookingReducer from '../features/booking/bookingSlice';
import notificationReducer from '../features/notification/notficationSlice';

const persistAuthConfig = {
      key: 'auth',
      storage,
};

const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);

export const baseReducer = {
      [baseApi.reducerPath]: baseApi.reducer,
      auth: persistedAuthReducer,
      meeting: meetingReducer,
      mentorFilter: mentorFilterReducer,
      chat: chatReducer,
      message: messageReducer,
      booking: bookingReducer,
      notification: notificationReducer,
};
