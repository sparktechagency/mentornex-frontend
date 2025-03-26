'use client';
import { useGetChatListQuery } from '@/redux/features/chatlist/chatlistApi';
import { ChatItem } from '@/redux/features/chatlist/chatSlice';
import { setSelectedChat } from '@/redux/features/message/messageSlice';
import { useGetUserProfileQuery } from '@/redux/features/user/userApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getImageUrl } from '@/utils/getImageUrl';
import { Avatar, Badge, Flex, Input, Tabs } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
const { TabPane } = Tabs;

const ChatList = ({ setIsChatActive }: { setIsChatActive: (active: boolean) => void }) => {
      const [search, setSearch] = useState('');
      useGetChatListQuery([
            {
                  name: 'searchTerm',
                  value: search,
            },
      ]);

      const { chatList } = useAppSelector((state) => state.chat);

      const { selectedChatId } = useAppSelector((state) => state.message);
      const { data: profile } = useGetUserProfileQuery([]);

      const dispatch = useAppDispatch();

      const router = useRouter();

      return (
            <div className="w-full h-[80vh] overflow-y-auto hide-scrollbar bg-white  rounded-lg ">
                  <div className="p-4 ">
                        <Flex gap={8}>
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
                                    <Avatar size={50} style={{ border: '1px solid gray' }} src={getImageUrl(profile?.image as string)} />
                              </Badge>

                              <Input
                                    onChange={(e) => setSearch(e.target.value)}
                                    prefix={<BsSearch className="text-subtitle mx-1" size={20} />}
                                    placeholder="Search"
                                    allowClear
                                    style={{ width: '100%', borderRadius: '90px' }}
                              />
                        </Flex>
                  </div>

                  <div className="h-[62px] mb-2">
                        <Tabs defaultActiveKey="1" centered>
                              <TabPane tab="Messages" key="1">
                                    <div className="p-2 h-[60vh] overflow-y-auto custom-scrollbar o custom-scrollbar">
                                          {chatList?.messages?.map((chat: ChatItem, index: number) => (
                                                <div
                                                      key={index}
                                                      onClick={() => {
                                                            dispatch(setSelectedChat(chat));
                                                            router.push(`/chat/${chat?._id}`);
                                                            setIsChatActive(true);
                                                      }}
                                                      className={`${
                                                            chat?._id === selectedChatId ? 'bg-gray-200' : ''
                                                      } flex items-center gap-4 my-1 p-4 cursor-pointer rounded-lg border-b`}
                                                >
                                                      {/* <Badge
                                                            style={{
                                                                  width: '12px',
                                                                  height: '12px',
                                                                  borderRadius: '6px',
                                                            }}
                                                            offset={[-5, 40]}
                                                            dot
                                                            color={chat?.isRequest ? 'red' : 'green'}
                                                      > */}
                                                      <Avatar size={50} src={getImageUrl(chat?.participant?.image)} />
                                                      {/* </Badge> */}
                                                      <div className="flex-1">
                                                            <h3 className="font-medium ellipsis truncate max-w-[20ch]">
                                                                  {chat?.participant?.name}
                                                            </h3>
                                                            <p className="text-sm text-gray-600 truncate">{chat?.latestMessage}</p>
                                                      </div>
                                                      <div className="text-right">
                                                            <p className="text-sm text-gray-500">
                                                                  {new Date(chat?.createdAt).toLocaleString()}
                                                            </p>
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              </TabPane>
                              <TabPane tab={`Message request  (${chatList?.requests?.length})`} key="2">
                                    {chatList.requests.length > 0 ? (
                                          <div className="p-2 h-[60vh] overflow-y-auto custom-scrollbar">
                                                {chatList.requests.map((request: ChatItem, index: number) => (
                                                      <div
                                                            key={index}
                                                            onClick={() => {
                                                                  dispatch(setSelectedChat(request));
                                                                  router.push(`/chat/${request?._id}`);
                                                                  setIsChatActive(true);
                                                            }}
                                                            className={`${
                                                                  request?._id === selectedChatId ? 'bg-gray-200' : ''
                                                            } flex items-center gap-4 my-1 p-4 cursor-pointer rounded-lg border-b`}
                                                      >
                                                            <Avatar size={50} src={getImageUrl(request?.participant?.image)} />
                                                            <div className="flex-1">
                                                                  <h3 className="font-medium ellipsis truncate max-w-[20ch]">
                                                                        {request?.participant?.name}
                                                                  </h3>
                                                                  <p className="text-sm text-gray-600 truncate">{request?.latestMessage}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                  <p className="text-sm text-gray-500">
                                                                        {new Date(request?.createdAt).toLocaleString()}
                                                                  </p>
                                                            </div>
                                                      </div>
                                                ))}
                                          </div>
                                    ) : (
                                          <div className="p-2 h-[60vh] overflow-y-auto custom-scrollbar text-center">
                                                No message request
                                          </div>
                                    )}
                              </TabPane>
                        </Tabs>
                  </div>
            </div>
      );
};

export default ChatList;
