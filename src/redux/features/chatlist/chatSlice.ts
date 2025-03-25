import { createSlice } from '@reduxjs/toolkit';
import { chatListApi } from './chatlistApi';

interface Participant {
      _id: string;
      name: string;
      image: string;
}

export interface ChatItem {
      _id: string;
      participant: Participant;
      latestMessage: string;
      isRequest: boolean;
      createdAt: string;
      isRead: boolean;
}

interface ChatState {
      chatList: ChatItem[];
}

const initialState: ChatState = {
      chatList: [],
};

const chatSlice = createSlice({
      name: 'chat',
      initialState,
      reducers: {
            addChat: (state, action) => {
                  state.chatList.push(action.payload);
            },
      },
      extraReducers: (builder) => {
            builder.addMatcher(chatListApi.endpoints.getChatList.matchFulfilled, (state, { payload }) => {
                  console.log('payload', payload);
                  state.chatList = payload;
            });
      },
});

export const { addChat } = chatSlice.actions;

export default chatSlice.reducer;
