import { useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { connectSocket, disconnectSocket } from '@/services/socket';
import { useAppDispatch } from '@/redux/hooks';
import { TMessage } from '@/redux/features/message/messageApi';
import { addChat, ChatItem } from '@/redux/features/chatlist/chatSlice';
import { addMessage } from '@/redux/features/message/messageSlice';

const SocketComponent = () => {
      const dispatch = useAppDispatch();

      const { user } = useAppSelector((state) => state.auth);

      useEffect(() => {
            if (!user?.id) return;

            const socket = connectSocket(user.id);

            console.log('Socket connected inside useEffect', user.id);

            // this one for new message add
            socket.on(`newMessage::${user.id}`, async (message: TMessage) => {
                  //   console.log('New message received:', message);

                  dispatch(addMessage(message));
            });

            // this one for chat update
            socket.on(`newChat::${user.id}`, (chat: ChatItem) => {
                  console.log('Chat updated:', chat);
                  dispatch(addChat(chat));
            });

            // this one for notification
            socket.on('notification', (notification) => {
                  console.log('New notification:', notification);
            });

            return () => {
                  disconnectSocket();
            };
      }, [user?.id, dispatch]);

      return null;
};

export default SocketComponent;
