import { Dispatch, SetStateAction } from 'react';
import NavItems from './NavItems';
import { Avatar, Badge, Button, Drawer, Dropdown, Typography } from 'antd';
import Link from 'next/link';
import { TUser } from '@/redux/features/user/userApi';
import { useAppSelector } from '@/redux/hooks';
import { BiMessage } from 'react-icons/bi';
import NotificationDropdown from './NotificationDropdown';
import { Bell } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';
import { getImageUrl } from '@/utils/getImageUrl';
const MobileDrawer = ({
      open,
      setOpen,
      items,
      profile,
}: {
      open: boolean;
      setOpen: Dispatch<SetStateAction<boolean>>;
      items: any[];
      profile: TUser;
}) => {
      const { user } = useAppSelector((state) => state.auth);
      const onClose = () => {
            setOpen(!open);
      };

      return (
            <Drawer placement="left" onClose={onClose} open={open}>
                  <div className="flex flex-col items-center gap-8">
                        <NavItems items={items} onClose={onClose} />

                        {user ? (
                              <div className="space-x-5">
                                    <div className="flex-center gap-5">
                                          <Link onClick={onClose} href="/chat">
                                                <Badge dot color="#FF6F3C">
                                                      <BiMessage style={{ fontSize: '24px', color: '#333' }} />
                                                </Badge>
                                          </Link>

                                          <Dropdown
                                                placement="bottom"
                                                className="cursor-pointer"
                                                trigger={['click']}
                                                dropdownRender={() => <NotificationDropdown />}
                                          >
                                                <Badge count={9} overflowCount={9} style={{ backgroundColor: '#FF6F3C' }}>
                                                      <Bell style={{ fontSize: '24px', color: '#333' }} />
                                                </Badge>
                                          </Dropdown>
                                    </div>
                                    <Dropdown
                                          placement="bottom"
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
                              <Link onClick={onClose} href="/signin">
                                    <Button iconPosition="end" type="primary">
                                          Sign In
                                    </Button>
                              </Link>
                        )}
                  </div>
            </Drawer>
      );
};

export default MobileDrawer;
