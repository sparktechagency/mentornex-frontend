import { configureStore } from '@reduxjs/toolkit';
import meetingReducer from './features/meeting/meetingSlice';
import { baseApi } from './base/baseApi';

export const store = configureStore({
      reducer: {
            [baseApi.reducerPath]: baseApi.reducer,
            meeting: meetingReducer,
      },
      middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                  serializableCheck: false,
            }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
