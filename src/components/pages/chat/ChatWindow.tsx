'use client';
import { TMessage, useGetMessagesQuery } from '@/redux/features/message/messageApi';
import { useAppSelector } from '@/redux/hooks';
import { getImageUrl } from '@/utils/getImageUrl';
import { Avatar, Badge, Button, Input, Upload } from 'antd';
import Image from 'next/image';

import { IoIosAttach } from 'react-icons/io';

const ChatWindow = ({ id }: { id: string }) => {
      const { data: messageData } = useGetMessagesQuery(id, { skip: !id });
      const { user } = useAppSelector((state) => state.auth);
      console.log(messageData?.data);
      // const messages = [
      //       { text: 'Hello!', mine: true, time: '10:00 AM', isImage: false },
      //       { text: 'Hi there!', mine: false, time: '10:01 AM', isImage: false },
      //       { text: 'How are you?', mine: true, time: '10:02 AM', isImage: false },
      //       { text: 'I am fine, thanks!', mine: false, time: '10:03 AM', isImage: false },
      //       { text: 'Great!', mine: true, time: '10:04 AM', isImage: false },
      //       { text: 'How can I help you?', mine: false, time: '10:05 AM', isImage: false },
      //       { text: 'I need help with my project', mine: true, time: '10:06 AM', isImage: false },
      //       { text: 'Sure, let me get back to you', mine: false, time: '10:07 AM', isImage: false },
      //       { text: 'I will get right back to you', mine: true, time: '10:08 AM', isImage: false, image: 'https://picsum.photos/200/3000' },
      // ];

      console.log(user?.id);
      return (
            <div className="">
                  <div className="p-4 bg-white  flex items-center gap-4">
                        <Badge
                              style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '6px',
                              }}
                              offset={[-5, 40]}
                              dot
                              color="green"
                        >
                              <Avatar
                                    size={50}
                                    style={{ border: '1px solid gray' }}
                                    src="https://randomuser.me/api/portraits/women/18.jpg"
                              />
                        </Badge>
                        <h3 className="font-medium">Dianne Russell</h3>
                  </div>

                  <div className="flex-1 bg-[#F5F5F6] p-4 h-[60vh] overflow-y-auto custom-scrollbar">
                        {messageData?.data.map((msg: TMessage, index: any) => (
                              <div key={index} className={`flex ${msg.receiver._id === user?.id ? 'justify-end' : 'justify-start'} mb-4`}>
                                    <div
                                          className={`max-w-xs p-3 rounded-lg ${
                                                msg.isRead ? 'bg-orange-500 text-white' : 'bg-white border text-title '
                                          }`}
                                    >
                                          <p>{msg.message}</p>
                                          {msg.files && msg.files.length > 0 && (
                                                <Image
                                                      width={150}
                                                      height={150}
                                                      src={getImageUrl(msg.files[0])}
                                                      alt={'user'}
                                                      className="rounded w-44 my-2 h-44"
                                                />
                                          )}
                                          <p className="text-xs mt-1">{new Date(msg.createdAt).toLocaleString()}</p>
                                    </div>
                              </div>
                        ))}
                  </div>

                  <div className="p-4 bg-white border-t flex items-center gap-2">
                        <Upload accept="image/*" maxCount={1}>
                              <Button shape="circle" icon={<IoIosAttach color="#9F9F9F" size={24} />} />
                        </Upload>
                        <Input.Search
                              style={{
                                    backgroundColor: '#F5F5F6',
                                    borderRadius: '8px',
                              }}
                              variant="borderless"
                              placeholder="Type a message"
                              allowClear
                              enterButton="Send"
                              size="large"
                        />
                  </div>
            </div>
      );
};

export default ChatWindow;
