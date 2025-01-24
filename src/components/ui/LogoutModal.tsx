import { Modal } from 'antd';
import { IoLogOut } from 'react-icons/io5';

export const showLogoutConfirmModal = (onConfirm: () => void) => {
      Modal.confirm({
            title: 'Logout',
            centered: true,
            content: 'Are you sure you want to logout?',
            icon: <IoLogOut className="text-primary mx-2" size={25} />,
            okText: 'Logout',
            cancelText: 'Cancel',
            okButtonProps: {
                  style: {
                        backgroundColor: '#FF6F3C',
                        color: '#FFFFFF',
                  },
            },
            cancelButtonProps: {
                  style: {
                        backgroundColor: 'transparent',
                        color: '#FF6F3C',
                        border: '1px solid #FF6F3C',
                  },
            },
            onOk: onConfirm,
      });
};
