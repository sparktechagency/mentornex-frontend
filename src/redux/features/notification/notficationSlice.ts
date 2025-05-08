import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notificationApi } from './notificationApi';

interface Notification {
      _id: string;
      type: 'success' | 'error' | 'info' | 'warning';
      message: string;
      description?: string;
      read?: boolean;
      createdAt: string;
}

interface NotificationState {
      notifications: Notification[];
}

const initialState: NotificationState = {
      notifications: [],
};

const notificationSlice = createSlice({
      name: 'notification',
      initialState,
      reducers: {
            addNotification: (state, action: PayloadAction<Notification>) => {
                  state.notifications.unshift(action.payload);
            },
      },
      extraReducers: (builder) => {
            builder.addMatcher(notificationApi.endpoints.getNotification.matchFulfilled, (state, { payload }) => {
                  console.log('payload', payload);
                  state.notifications = payload.data;
            });
      },
});

export const { addNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
