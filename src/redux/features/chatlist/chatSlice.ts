import { createSlice } from '@reduxjs/toolkit';
import { chatListApi } from './chatlistApi';

interface Participant {
      _id: string;
      name: string;
      image: string;
}

interface LatestMessage {
      _id: string;
      type: string; // Assuming 'type' can be 'text', 'file', etc.
}

export interface ChatItem {
      _id: string;
      participant: Participant;
      latestMessage: LatestMessage;
      isRequest: boolean;
      createdAt: string;
      updatedAt: string;
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
      reducers: {},
      extraReducers: (builder) => {
            builder.addMatcher(chatListApi.endpoints.getChatList.matchFulfilled, (state, action: { payload: { data: ChatItem[] } }) => {
                  state.chatList = action.payload.data;
            });
      },
});

export default chatSlice.reducer;
