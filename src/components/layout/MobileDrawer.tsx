import { Dispatch, SetStateAction } from 'react';
import NavItems from './NavItems';
import { Button, Drawer } from 'antd';
import Link from 'next/link';
const MobileDrawer = ({ open, setOpen, items }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>>; items: any[] }) => {
      const onClose = () => {
            setOpen(!open);
      };

      return (
            <Drawer placement="left" onClose={onClose} open={open}>
                  <div className="flex flex-col items-center gap-8">
                        <NavItems items={items} onClose={onClose} />

                        <div className="flex items-center space-x-6">
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
                        </div>
                  </div>
            </Drawer>
      );
};

export default MobileDrawer;
