import React from 'react';
import { Modal as AntdModal } from 'antd';

export interface IModalProps {
      title: string;
      visible: boolean;
      onCancel: () => void;
      onOk?: () => void;
      children: React.ReactNode;
      width?: number;
}

const Modal: React.FC<IModalProps> = ({ title, visible, onCancel, onOk, children, width }) => {
      return (
            <AntdModal footer={null} centered title={title} open={visible} onCancel={onCancel} onOk={onOk} width={width}>
                  {children}
            </AntdModal>
      );
};

export default Modal;
