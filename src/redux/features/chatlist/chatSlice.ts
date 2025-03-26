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
      chatList: {
            messages: ChatItem[];
            requests: ChatItem[];
      };
}

const initialState: ChatState = {
      chatList: {
            messages: [],
            requests: [],
      },
};

const chatSlice = createSlice({
      name: 'chat',
      initialState,
      reducers: {
            addChat: (state, action) => {
                  if (action.payload.isRequest) {
                        state.chatList.requests.push(action.payload.message);
                  } else {
                        state.chatList.messages.push(action.payload.message);
                  }
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
