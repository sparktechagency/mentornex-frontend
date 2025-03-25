import { createSlice } from '@reduxjs/toolkit';
import { messageApi, TMessage } from './messageApi';

type TInitialState = {
      messages: TMessage[];
};

const messageSlice = createSlice({
      name: 'message',
      initialState: {
            messages: [] as TMessage[],
      } as TInitialState,
      reducers: {},
      extraReducers: (builder) => {
            builder.addMatcher(messageApi.endpoints.getMessages.matchFulfilled, (state, { payload }) => {
                  state.messages = payload.data;
            });
      },
});

export default messageSlice.reducer;
