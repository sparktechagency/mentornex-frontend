'use client';
import React, { useState } from 'react';
import { Menu, Upload } from 'antd';
import Image from 'next/image';
import { Edit2 } from 'lucide-react';
import { UploadChangeParam } from 'antd/es/upload';
import Link from 'next/link';
import { FaClipboardList, FaGear, FaHourglassEnd, FaUserGear } from 'react-icons/fa6';
import { MdCurrencyExchange, MdDashboard } from 'react-icons/md';
import { IoHeart, IoLogOut } from 'react-icons/io5';
import { FaUserFriends } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { showLogoutConfirmModal } from '@/components/ui/LogoutModal';

const ProfileSidebar = () => {
      const [previewImage, setPreviewImage] = useState<undefined | string>('https://i.ibb.co.com/yN2vT01/me.jpg');
      const [userRole] = useState<string>('mentor');

      const handleFileChange = ({ file }: UploadChangeParam<any>) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => {
                  setPreviewImage(reader.result as string);
            };
      };

      const sidebarItemsMentees = [
            {
                  key: 'profile',
                  icon: <FaUserGear size={20} />,
                  label: 'Profile',
                  href: '/dashboard/mentee/profile',
            },
            {
                  key: 'dashboard',
                  icon: <MdDashboard size={20} />,
                  label: 'Dashboard',
                  href: '/dashboard/mentee/dashboard',
            },

            {
                  key: 'my-session',
                  icon: <FaHourglassEnd size={20} />,
                  label: 'My Session',
                  href: '/dashboard/mentee/my-sessions',
            },

            {
                  key: 'favorite',
                  icon: <IoHeart size={20} />,
                  label: 'Favorite',
                  href: '/dashboard/mentee/favorite',
            },

            {
                  key: 'billing',
                  icon: <MdCurrencyExchange size={20} />,
                  label: 'Billing',
                  href: '/dashboard/mentee/billing',
            },
            {
                  key: 'settings',
                  icon: <FaGear size={20} />,
                  label: 'Settings',
                  href: '/dashboard/mentee/settings',
            },
            {
                  key: 'logout',
                  icon: <IoLogOut size={20} />,
                  label: 'Logout',
                  href: '/logout',
            },
      ];

      const sidebarItemsMentors = [
            {
                  key: 'profile',
                  icon: <FaUserGear size={20} className="text-white" />,
                  label: 'Profile',
                  href: '/dashboard/mentor/profile',
                  selected: true,
            },
            {
                  key: 'dashboard',
                  icon: <MdDashboard size={20} />,
                  label: 'Dashboard',
                  href: '/dashboard/mentor/dashboard',
            },
            {
                  key: 'my-session',
                  icon: <FaHourglassEnd size={20} />,
                  label: 'My Sessions',
                  href: '/dashboard/mentor/my-sessions',
            },
            {
                  key: 'task-notes',
                  icon: <FaClipboardList size={20} />,
                  label: 'Task & Notes',
                  href: '/dashboard/mentor/tasks-and-notes',
            },
            {
                  key: 'my-mentees',
                  icon: <FaUserFriends size={20} />,
                  label: 'My Mentees',
                  href: '/dashboard/mentor/my-mentees',
            },
            {
                  key: 'billing',
                  icon: <MdCurrencyExchange size={20} />,
                  label: 'Billing',
                  href: '/dashboard/mentor/billing',
            },
            {
                  key: 'settings',
                  icon: <FaGear size={20} />,
                  label: 'Settings',
                  href: '/dashboard/mentor/settings',
            },
            {
                  key: 'logout',
                  icon: <IoLogOut size={20} />,
                  label: 'Logout',
                  href: '/logout',
            },
      ];

      const handleLogout = () => {
            showLogoutConfirmModal(() => {
                  toast.success('Logout successful!');
            });
      };
      const generateSidebarByUserRole = (userRole: string) => {
            switch (userRole) {
                  case 'mentee':
                        return sidebarItemsMentees;
                  case 'mentor':
                        return sidebarItemsMentors;
                  default:
                        return [];
            }
      };

      return (
            <div className="">
                  <div className="flex flex-col items-center  relative">
                        <div className="w-full h-[252px] p-3 ">
                              <Image
                                    width={500}
                                    height={500}
                                    src={previewImage || 'https://i.ibb.co.com/yN2vT01/me.jpg'}
                                    alt="Profile"
                                    className="w-full h-full object-cover rounded-lg"
                              />
                        </div>

                        <div className="absolute cursor-pointer bg-white w-8 h-8 rounded-lg text-center flex items-center justify-center top-5 right-5 ">
                              <Upload showUploadList={false} onChange={handleFileChange}>
                                    <Edit2 size={20} />
                              </Upload>
                        </div>
                  </div>

                  {/* Menu Section */}
                  <Menu mode="vertical" defaultSelectedKeys={['profile']} className="w-full">
                        {generateSidebarByUserRole(userRole).map((item) => {
                              if (item.key === 'logout') {
                                    return (
                                          <Menu.Item
                                                onClick={() => {
                                                      handleLogout();
                                                }}
                                                key={item.key}
                                                icon={item.icon}
                                          >
                                                <span>{item.label}</span>
                                          </Menu.Item>
                                    );
                              }
                              return (
                                    <Menu.Item key={item.key} icon={item.icon}>
                                          <Link href={item.href}>{item.label}</Link>
                                    </Menu.Item>
                              );
                        })}
                  </Menu>
            </div>
      );
};

export default ProfileSidebar;
