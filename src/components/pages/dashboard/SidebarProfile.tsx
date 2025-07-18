'use client';
import React, { useEffect, useState } from 'react';
import { Menu, Upload } from 'antd';
import Image from 'next/image';
import { Edit2 } from 'lucide-react';
import { UploadChangeParam } from 'antd/es/upload';
import Link from 'next/link';
import {
  FaCalendarCheck,
  FaClipboardList,
  FaClock,
  FaGear,
  FaHourglassEnd,
  FaList,
  FaUserGear,
} from 'react-icons/fa6';
import { MdCurrencyExchange, MdDashboard } from 'react-icons/md';
import { IoHeart, IoLogOut } from 'react-icons/io5';
import { FaDollyFlatbed, FaUserFriends } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { showConfirmModal } from '@/components/ui/LogoutModal';
import { useAppSelector } from '@/redux/hooks';
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from '@/redux/features/user/userApi';
import { getImageUrl } from '@/utils/getImageUrl';
import { usePathname } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { removeUser } from '@/redux/features/auth/authSlice';
import { removeAccessToken } from '@/utils/accessToken';

const ProfileSidebar = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const activeKey = pathname?.split('/').pop();
  const { user } = useAppSelector((state) => state.auth);
  const { data: profile } = useGetUserProfileQuery(undefined, {
    skip: !user,
  });

  const [updateProfileImage] = useUpdateUserProfileMutation();
  const [previewImage, setPreviewImage] = useState<undefined | string>('');

  const handleFileChange = async ({ file }: UploadChangeParam<any>) => {
    try {
      const formData = new FormData();
      formData.append('image', file.originFileObj);
      const res = await updateProfileImage(formData).unwrap();
      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    if (profile && profile.image) {
      setPreviewImage(getImageUrl(profile.image));
    }
  }, [profile]);

  const sidebarItemsMentees = [
    {
      key: 'dashboard',
      icon: <MdDashboard size={20} />,
      label: 'Dashboard',
      href: '/dashboard/mentee/dashboard',
    },
    {
      key: 'profile',
      icon: <FaUserGear size={20} />,
      label: 'Profile',
      href: '/dashboard/mentee/profile',
    },
    {
      key: 'todos',
      icon: <FaList size={20} />,
      label: 'Todos',
      href: '/dashboard/mentee/todos',
    },

    {
      key: 'my-session',
      icon: <FaHourglassEnd size={20} />,
      label: 'My Session',
      href: '/dashboard/mentee/my-sessions',
    },
    {
      key: 'purchase-management',
      icon: <FaDollyFlatbed size={20} />,
      label: 'Purchase Management',
      href: '/dashboard/mentee/purchase-management',
    },
    {
      key: 'Tasks & Notes',
      icon: <FaClipboardList size={20} />,
      label: 'Tasks & Notes',
      href: '/dashboard/mentee/tasks-and-notes',
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
      label: 'Transactions',
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
      key: 'dashboard',
      icon: <MdDashboard size={20} />,
      label: 'Dashboard',
      href: '/dashboard/mentor/dashboard',
    },
    {
      key: 'profile',
      icon: <FaUserGear size={20} className="text-white" />,
      label: 'Profile',
      href: '/dashboard/mentor/profile',
      selected: true,
    },
    {
      key: 'todos',
      icon: <FaList size={20} />,
      label: 'Todos',
      href: '/dashboard/mentor/mentorTodos',
    },
    {
      key: 'sessions&subscriptions',
      icon: <FaCalendarCheck size={20} />,
      label: 'Sessions & Subscriptions',
      href: '/dashboard/mentor/sessions-and-subscriptions',
    },

    {
      key: 'slot-management',
      icon: <FaClock size={20} />,
      label: 'Slot Management',
      href: '/dashboard/mentor/slot-management',
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
    showConfirmModal({
      title: 'Logout',
      content: 'Are you sure you want to logout?',
      okText: 'Logout',
      cancelText: 'Cancel',
      onConfirm: () => {
        toast.success('Logout successful!');

        dispatch(removeUser());
        removeAccessToken();
        window.location.href = '/';
      },
    });
  };
  const generateSidebarByUserRole = (userRole: string) => {
    switch (userRole) {
      case 'MENTEE':
        return sidebarItemsMentees;
      case 'MENTOR':
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
            src={previewImage as string}
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
      <Menu mode="vertical" defaultSelectedKeys={[activeKey as string]} className="w-full">
        {generateSidebarByUserRole(user?.role as string).map((item) => {
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
