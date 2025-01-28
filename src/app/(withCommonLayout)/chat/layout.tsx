'use client';
import ChatList from '@/components/pages/chat/ChatList';
import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
      const [isChatActive, setIsChatActive] = useState(false);

      return (
            <div className="container min-h-screen flex flex-col lg:flex-row my-20">
                  <div className={`w-full lg:w-1/3 bg-white ${isChatActive ? 'hidden lg:block' : ''}`}>
                        <ChatList setIsChatActive={setIsChatActive} />
                  </div>

                  <div className={`${isChatActive ? '' : 'hidden lg:block'} w-full lg:w-2/3 flex flex-col bg-gray-50`}>
                        <button className={`lg:hidden ${isChatActive ? 'block' : ''}`} onClick={() => setIsChatActive(false)}>
                              <IoIosArrowBack className="text-2xl" />
                        </button>
                        {children}
                  </div>
            </div>
      );
};

export default ChatLayout;
