'use client';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/assets/images/logo.svg';
import { AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';
import { Avatar, Badge, Button, Typography } from 'antd';
import NavItems from './NavItems';
import MobileDrawer from './MobileDrawer';
import { BiMessage } from 'react-icons/bi';
import { Bell } from 'lucide-react';

const Navbar = () => {
      const [showDrawer, setShowDrawer] = useState(false);

      const items = [
            { label: 'Home', path: '/' },
            { label: 'Become a Mentor', path: '/become-a-mentor' },
            { label: 'Become a Mentee', path: '/become-a-mentee' },
            { label: 'Browse Mentor', path: '/browse-mentor' },
            { label: 'About Us', path: '/about-us' },
            { label: 'FAQ', path: '/faq' },
      ];

      return (
            <header className={`bg-[#F9FDF9] shadow-lg`}>
                  <nav className="container  h-[96px]  relative z-[99]">
                        <div className="flex justify-between items-center h-full">
                              {/* Logo */}
                              <Link href={'/'}>
                                    <Image alt="Logo" src={Logo} width={131} height={30} />
                              </Link>
                              {/* Nav Items for Desktop */}
                              <div className="hidden md:flex bg-secondary/20 p-2 items-center gap-8">
                                    <NavItems items={items} />
                              </div>
                              <div className="hidden md:flex items-center space-x-6">
                                    <Link href="/signin">
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
                                    </Link>
                                    <Link href="/signup">
                                          <Button iconPosition="end" type="primary">
                                                Sign Up
                                          </Button>
                                    </Link>

                                    <div className="flex items-center gap-6 my-8">
                                          <Badge dot color="#FF6F3C">
                                                <BiMessage style={{ fontSize: '24px', color: '#333' }} />
                                          </Badge>
                                          <Badge count={9} overflowCount={9} style={{ backgroundColor: '#FF6F3C' }}>
                                                <Bell style={{ fontSize: '24px', color: '#333' }} />
                                          </Badge>
                                          <div className="flex items-center gap-2">
                                                <Avatar
                                                      size={40}
                                                      src={`https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/40`}
                                                      style={{ border: '2px solid #FF6F3C' }}
                                                />
                                                <Typography.Text strong style={{ fontSize: '16px' }}>
                                                      Sazzad
                                                </Typography.Text>
                                          </div>
                                    </div>
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
                  <MobileDrawer open={showDrawer} setOpen={setShowDrawer} items={items} />
            </header>
      );
};

export default Navbar;
