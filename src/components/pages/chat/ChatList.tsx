import { Avatar, Badge, Flex, Input } from 'antd';
import { useRouter } from 'next/navigation';
import { BsSearch } from 'react-icons/bs';

const ChatList = () => {
      const router = useRouter();

      const chatList = [
            { name: 'Alice Johnson', message: 'Hello!', time: '1 min ago', unread: 2, active: true, id: 1 },
            { name: 'Bob Smith', message: 'Are we still on for lunch?', time: '5 mins ago', unread: 0, active: false, id: 2 },
            { name: 'Charlie Brown', message: 'Check this out!', time: '10 mins ago', unread: 1, active: false, id: 3 },
            { name: 'Diana Prince', message: 'Can you send me the report?', time: '15 mins ago', unread: 3, active: false, id: 4 },
            { name: 'Eve Adams', message: 'Let’s catch up soon!', time: '20 mins ago', unread: 0, active: false, id: 5 },
      ];

      return (
            <div className="w-full  bg-white border">
                  <div className="p-4 border-b">
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
                  <div className="p-2 h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
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
                                          <Avatar size={50} src={`https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/40`} />
                                    </Badge>
                                    <div className="flex-1">
                                          <h3 className="font-medium">{chat.name}</h3>
                                          <p className="text-sm text-gray-600 truncate">{chat.message}</p>
                                    </div>
                                    <div className="text-right">
                                          <p className="text-sm text-gray-500">{chat.time}</p>
                                          {chat.unread > 0 && <Badge count={chat.unread} style={{ backgroundColor: '#FF6F3C' }} />}
                                    </div>
                              </div>
                        ))}
                  </div>
            </div>
      );
};

export default ChatList;
