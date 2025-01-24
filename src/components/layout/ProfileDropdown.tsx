import React from 'react';
import { Menu, Avatar } from 'antd';
import { EditOutlined, HeartOutlined, CalendarOutlined, SettingOutlined } from '@ant-design/icons';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ProfileDropdown = () => {
      const router = useRouter();
      return (
            <div className="">
                  <Menu
                        mode="inline"
                        style={{
                              padding: 15,
                        }}
                  >
                        <div
                              onClick={() => {
                                    router.push('/dashboard');
                              }}
                              className="flex cursor-pointer items-center text-start gap-2 mb-4"
                        ></div>
                        <Menu.Item
                              onClick={() => {
                                    router.push('/dashboard/mentee/profile');
                              }}
                              style={{
                                    marginBottom: 10,
                              }}
                              key="profile"
                        >
                              <div className="flex">
                                    <Avatar size={40} src={`https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/40`} />
                                    <div>
                                          <h3 className="font-semibold">Sazzad Chowdhury</h3>
                                          <p className="text-orange-500 cursor-pointer text-sm">View Profile</p>
                                    </div>
                              </div>
                        </Menu.Item>
                        <Menu.Item
                              style={{
                                    marginBottom: 10,
                              }}
                              key="edit"
                              icon={<EditOutlined style={{ color: '#FF6F3C', fontSize: 20 }} />}
                        >
                              Edit Profile
                        </Menu.Item>
                        <Menu.Item
                              style={{
                                    marginBottom: 10,
                              }}
                              key="favorites"
                              icon={<HeartOutlined style={{ color: '#FF6F3C', fontSize: 20 }} />}
                        >
                              My Favourites
                        </Menu.Item>
                        <Menu.Item
                              style={{
                                    marginBottom: 10,
                              }}
                              key="meetings"
                              icon={<CalendarOutlined style={{ color: '#FF6F3C', fontSize: 20 }} />}
                        >
                              My Meetings
                        </Menu.Item>
                        <Menu.Item
                              style={{
                                    marginBottom: 10,
                              }}
                              key="settings"
                              icon={<SettingOutlined style={{ color: '#FF6F3C', fontSize: 20 }} />}
                        >
                              Settings
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item key="logout" icon={<ArrowRight style={{ color: '#FF6F3C', fontSize: 20 }} />}>
                              Logout
                        </Menu.Item>
                  </Menu>
            </div>
      );
};

export default ProfileDropdown;
