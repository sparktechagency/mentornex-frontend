import { Dispatch, SetStateAction } from 'react';
import NavItems from './NavItems';
import { Drawer } from 'antd';
const MobileDrawer = ({ open, setOpen, items }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>>; items: any[] }) => {
      const onClose = () => {
            setOpen(!open);
      };

      return (
            <Drawer placement="left" onClose={onClose} open={open}>
                  <div className="flex flex-col items-center gap-8">
                        <NavItems items={items} onClose={onClose} />
                  </div>
            </Drawer>
      );
};

export default MobileDrawer;