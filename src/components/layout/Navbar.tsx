'use client';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/assets/images/logo.svg';

import { AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';

import { usePathname } from 'next/navigation';
import { Button, Select } from 'antd';

import NavItems from './NavItems';
import MobileDrawer from './MobileDrawer';
import { TbChevronDown, TbWorld } from 'react-icons/tb';

const Navbar = () => {
      const [showDrawer, setShowDrawer] = useState(false);
      const pathname = usePathname();
      const items = [
            { label: 'Home', path: '/' },

            { label: 'Cannabis Club', path: '/cannabis-club' },
            { label: 'FAQs', path: '/faqs' },
            { label: 'Blogs', path: '/blogs' },
            { label: 'Contact', path: '/contact' },
      ];
      const languageOptions = [
            { value: 'en', label: 'English', shortLabel: 'EN' },
            { value: 'bn', label: 'Bengali', shortLabel: 'BN' },
            { value: 'hi', label: 'Hindi', shortLabel: 'HI' },
            { value: 'es', label: 'Spanish', shortLabel: 'ES' },
      ];

      const customLabel = (option: any) => (
            <div className="flex items-center gap-2">
                  <span>{option.label}</span>
            </div>
      );

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
                              <div className="flex items-center space-x-6">
                                    <Link href="/login">
                                          <Button iconPosition="end" type="primary">
                                                Join Now
                                          </Button>
                                    </Link>

                                    <Select
                                          defaultValue="en"
                                          options={languageOptions}
                                          variant={'borderless'}
                                          prefix={<TbWorld size={20} />}
                                          suffixIcon={
                                                <div className="ml-1">
                                                      <TbChevronDown size={20} />
                                                </div>
                                          }
                                          labelInValue
                                          optionLabelProp="label"
                                          menuItemSelectedIcon={null}
                                          onChange={(value) => console.log(value)}
                                          optionRender={customLabel}
                                    />
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
