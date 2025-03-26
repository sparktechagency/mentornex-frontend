import { createSlice } from '@reduxjs/toolkit';
import { messageApi, TMessage } from './messageApi';
import { ChatItem } from '@/redux/features/chatlist/chatSlice';

type TInitialState = {
      messages: TMessage[];
      selectedChat: ChatItem | null;
      selectedChatId: string | null;
};

const messageSlice = createSlice({
      name: 'message',
      initialState: {
            messages: [] as TMessage[],
            selectedChat: null,
            selectedChatId: null,
      } as TInitialState,
      reducers: {
            addMessage: (state, action) => {
                  state.messages.push(action.payload);
            },

            setSelectedChat: (state, action) => {
                  state.selectedChat = action.payload;
            },
            setSelectedChatId: (state, action) => {
                  state.selectedChatId = action.payload;
            },
      },
      extraReducers: (builder) => {
            builder.addMatcher(messageApi.endpoints.getMessages.matchFulfilled, (state, { payload }) => {
                  state.messages = payload.data;
            });
      },
});

export const { addMessage, setSelectedChat, setSelectedChatId } = messageSlice.actions;
export default messageSlice.reducer;
