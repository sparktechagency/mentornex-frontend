'use client';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/assets/images/logo.svg';
import { AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';
import { Avatar, Badge, Button, Dropdown, Typography } from 'antd';
import NavItems from './NavItems';
import MobileDrawer from './MobileDrawer';
import { BiMessage } from 'react-icons/bi';
import { Bell } from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';
import { useAppSelector } from '@/redux/hooks';
import { useGetUserProfileQuery } from '@/redux/features/user/userApi';
import { getImageUrl } from '@/utils/getImageUrl';

const Navbar = () => {
      const [showDrawer, setShowDrawer] = useState(false);
      const { user } = useAppSelector((state) => state.auth);
      const { data: profile } = useGetUserProfileQuery(undefined, {
            skip: !user,
      });

      const items = [
            { label: 'Home', path: '/' },
            { label: 'Become a Mentor', path: '/signup' },
            { label: 'Become a Mentee', path: '/signup' },
            { label: 'Browse Mentors', path: '/mentors' },

            { label: 'About Us', path: '/about-us' },
            { label: 'FAQ', path: '/faqs' },
      ];

      return (
            <header className={`bg-white drop-shadow`}>
                  <nav className="container  h-[96px]  relative z-[99]">
                        <div className="flex justify-between items-center h-full">
                              {/* Logo */}
                              <Link href={'/'}>
                                    <Image className="w-[190px] h-[60px]" alt="Logo" src={Logo} width={131} height={30} />
                              </Link>
                              {/* Nav Items for Desktop */}
                              <div className="hidden md:flex bg-secondary/20 p-2 items-center gap-8">
                                    <NavItems items={items} />
                              </div>
                              <div className="hidden md:flex items-center space-x-6">
                                    {/* <Link href="/signin">
                                          <Button
                                                style={{
                                                      backgroundColor: 'transparent',
                                                      color: '#000000',

                                                      border: '2px solid #FF6F3C',
                                                }}
                                                type="primary"
                                          >
                                                Sign In
                                          </Button>
                                    </Link> */}

                                    {user ? (
                                          <div className="flex items-center gap-6">
                                                <Link href="/chat">
                                                      <Badge dot color="#FF6F3C">
                                                            <BiMessage style={{ fontSize: '24px', color: '#333' }} />
                                                      </Badge>
                                                </Link>

                                                <Dropdown
                                                      className="cursor-pointer"
                                                      trigger={['click']}
                                                      dropdownRender={() => <NotificationDropdown />}
                                                >
                                                      <Badge count={9} overflowCount={9} style={{ backgroundColor: '#FF6F3C' }}>
                                                            <Bell style={{ fontSize: '24px', color: '#333' }} />
                                                      </Badge>
                                                </Dropdown>
                                                <Dropdown
                                                      placement="bottomLeft"
                                                      className="cursor-pointer"
                                                      trigger={['click']}
                                                      dropdownRender={() => <ProfileDropdown profile={profile!} />}
                                                >
                                                      <div className="flex items-center gap-2">
                                                            <Avatar
                                                                  size={40}
                                                                  src={getImageUrl(profile?.image as string)}
                                                                  style={{ border: '2px solid #FF6F3C' }}
                                                            />
                                                            <Typography.Text strong style={{ fontSize: '16px' }}>
                                                                  {profile?.name}
                                                            </Typography.Text>
                                                      </div>
                                                </Dropdown>
                                          </div>
                                    ) : (
                                          <Link href="/signin">
                                                <Button iconPosition="end" type="primary">
                                                      Sign In
                                                </Button>
                                          </Link>
                                    )}
                              </div>
                              <div className="md:hidden">
                                    <AiOutlineMenu
                                          onClick={() => setShowDrawer(!showDrawer)}
                                          className="text-primaryText cursor-pointer"
                                          size={24}
                                    />
                              </div>
                        </div>
                  </nav>

                  {/* Mobile Drawer */}
                  <MobileDrawer profile={profile!} open={showDrawer} setOpen={setShowDrawer} items={items} />
            </header>
      );
};

export default Navbar;
