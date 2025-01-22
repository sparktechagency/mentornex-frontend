import { Avatar, Badge, Flex, Input, Tabs } from 'antd';
import { useRouter } from 'next/navigation';
import { BsSearch } from 'react-icons/bs';
const { TabPane } = Tabs;

const ChatList = () => {
      const router = useRouter();

      const chatList = [
            { name: 'Alice Johnson', message: 'Hello!', time: '1 min ago', unread: 2, active: true, id: 1 },
            { name: 'Bob Smith', message: 'Are we still on for lunch?', time: '5 mins ago', unread: 0, active: false, id: 2 },
            { name: 'Charlie Brown', message: 'Check this out!', time: '10 mins ago', unread: 1, active: false, id: 3 },
            { name: 'Diana Prince', message: 'Can you send me the report?', time: '15 mins ago', unread: 3, active: false, id: 4 },
            { name: 'Eve Adams', message: 'Let’s catch up soon!', time: '20 mins ago', unread: 0, active: false, id: 5 },
            { name: 'Florence Nightingale', message: 'I need help with my project', time: '25 mins ago', unread: 2, active: false, id: 6 },
            { name: 'George Washington', message: 'I need help with my project', time: '30 mins ago', unread: 1, active: false, id: 7 },
            { name: 'Helen Keller', message: 'I need help with my project', time: '35 mins ago', unread: 0, active: false, id: 8 },
            { name: 'Isaac Newton', message: 'I need help with my project', time: '40 mins ago', unread: 3, active: false, id: 9 },
            { name: 'Jane Doe', message: 'I need help with my project', time: '45 mins ago', unread: 2, active: false, id: 10 },
            { name: 'Katherine Johnson', message: 'I need help with my project', time: '50 mins ago', unread: 1, active: false, id: 11 },
            { name: 'Leonardo da Vinci', message: 'I need help with my project', time: '55 mins ago', unread: 0, active: false, id: 12 },
            { name: 'Marie Curie', message: 'I need help with my project', time: '1 hour ago', unread: 3, active: false, id: 13 },
            { name: 'Nikola Tesla', message: 'I need help with my project', time: '1 hour 5 mins ago', unread: 2, active: false, id: 14 },
            {
                  name: 'Olivia Newton-John',
                  message: 'I need help with my project',
                  time: '1 hour 10 mins ago',
                  unread: 1,
                  active: false,
                  id: 15,
            },
            { name: 'Pablo Picasso', message: 'I need help with my project', time: '1 hour 15 mins ago', unread: 0, active: false, id: 16 },
      ];

      return (
            <div className="w-full  bg-white border rounded-lg min-h-[calc(100vh-5rem)]">
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
                                    <Avatar
                                          size={50}
                                          style={{ border: '1px solid gray' }}
                                          src="https://randomuser.me/api/portraits/women/18.jpg"
                                    />
                              </Badge>

                              <Input
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
                                    <div className="p-2 h-[640.08px] overflow-y-auto custom-scrollbar">
                                          {chatList.map((chat, index) => (
                                                <div
                                                      key={index}
                                                      onClick={() => router.push(`/chat/${chat.id}`)}
                                                      className={`flex items-center gap-4 p-4 cursor-pointer rounded-lg border-b`}
                                                >
                                                      <Badge
                                                            style={{
                                                                  width: '12px',
                                                                  height: '12px',
                                                                  borderRadius: '6px',
                                                            }}
                                                            offset={[-5, 40]}
                                                            dot
                                                            color={chat.active ? 'green' : 'red'}
                                                      >
                                                            <Avatar
                                                                  size={50}
                                                                  src={`https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/40`}
                                                            />
                                                      </Badge>
                                                      <div className="flex-1">
                                                            <h3 className="font-medium">{chat.name}</h3>
                                                            <p className="text-sm text-gray-600 truncate">{chat.message}</p>
                                                      </div>
                                                      <div className="text-right">
                                                            <p className="text-sm text-gray-500">{chat.time}</p>
                                                            {chat.unread > 0 && (
                                                                  <Badge count={chat.unread} style={{ backgroundColor: '#FF6F3C' }} />
                                                            )}
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              </TabPane>
                              <TabPane tab="Message request  (0)" key="2">
                                    <div className="p-2 h-[640.08px] overflow-y-auto custom-scrollbar text-center">No message request</div>
                              </TabPane>
                        </Tabs>
                  </div>
            </div>
      );
};

export default ChatList;
