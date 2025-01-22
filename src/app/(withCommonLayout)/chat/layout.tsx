'use client';
import ChatList from '@/components/pages/chat/ChatList';
const ChatLayout = ({ children }: { children: React.ReactNode }) => {
      return (
            <div className="container h-screen flex flex-col lg:flex-row my-20">
                  <div className="w-full lg:w-1/3 bg-white ">
                        <ChatList />
                  </div>
                  <div className="w-full lg:w-2/3 flex flex-col bg-gray-50">{children}</div>
            </div>
      );
};

export default ChatLayout;
