import { SendOutlined } from '@ant-design/icons';
import { Avatar, Button, Input } from 'antd';
import Image from 'next/image';

const ChatWindow = () => {
      const messages = [
            { text: 'Hello!', mine: true, time: '10:00 AM', isImage: false },
            { text: 'Hi there!', mine: false, time: '10:01 AM', isImage: false },
            { text: 'How are you?', mine: true, time: '10:02 AM', isImage: false },
            { text: 'I am fine, thanks!', mine: false, time: '10:03 AM', isImage: false },
            { text: 'Great!', mine: true, time: '10:04 AM', isImage: false },
      ];
      return (
            <div className="">
                  <div className="p-4 bg-white border-b flex items-center gap-4">
                        <Avatar size={50} src="https://randomuser.me/api/portraits/women/18.jpg" />
                        <h3 className="font-medium">Dianne Russell</h3>
                  </div>

                  <div className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 128px)' }}>
                        {messages.map((msg: any, index: any) => (
                              <div key={index} className={`flex ${msg.mine ? 'justify-end' : 'justify-start'} mb-4`}>
                                    <div className={`max-w-xs p-3 rounded-lg ${msg.mine ? 'bg-orange-500 text-white' : 'bg-white border'}`}>
                                          {msg.isImage ? (
                                                <Image
                                                      width={150}
                                                      height={150}
                                                      src="https://picsum.photos/200/3000"
                                                      alt={msg.text}
                                                      className="rounded h-10 w-10"
                                                />
                                          ) : (
                                                <p>{msg.text}</p>
                                          )}
                                          <p className="text-xs text-gray-300 mt-1">{msg.time}</p>
                                    </div>
                              </div>
                        ))}
                  </div>

                  <div className="p-4 bg-white border-t flex items-center gap-2">
                        <Input
                              placeholder="Type something..."
                              //   value={message}
                              //   onChange={(e) => setMessage(e.target.value)}
                              //   onPressEnter={handleSendMessage}
                              className="flex-1"
                        />
                        <Button
                              type="primary"
                              icon={<SendOutlined />}
                              //   onClick={handleSendMessage}
                              className="bg-orange-500 border-none"
                        >
                              Send
                        </Button>
                  </div>
            </div>
      );
};

export default ChatWindow;
