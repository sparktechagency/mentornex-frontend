import { io, Socket } from 'socket.io-client';

interface ISocketEvents {
      [key: `newMessage::${string}`]: (message: any) => void;
      [key: `newChat::${string}`]: (chat: any) => void;
      notification: (notification: any) => void;
}

let socket: Socket<ISocketEvents> | null = null;

export const connectSocket = (userId: string): Socket<ISocketEvents> => {
      if (socket) {
            return socket;
      }

      socket = io(process.env.NEXT_PUBLIC_API_URL as string, {
            auth: { userId },
      });

      socket.on('connect', () => {
            console.log('Connected to the socket server');
      });

      socket.on('disconnect', () => {
            console.log('Disconnected from the socket server');
      });

      return socket;
};

export const getSocket = (): Socket<ISocketEvents> | null => socket;

export const disconnectSocket = () => {
      if (socket) {
            socket.disconnect();
            socket = null;
      }
};
