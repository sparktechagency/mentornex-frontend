import { Modal } from 'antd';
import React from 'react';

interface ConfirmModalOptions {
      title: string;
      content: string;
      icon?: React.ReactNode;
      okText?: string;
      cancelText?: string;
      onConfirm: () => void;
      onCancel?: () => void;
      okButtonStyle?: React.CSSProperties;
      cancelButtonStyle?: React.CSSProperties;
}

export const showConfirmModal = ({
      title,
      content,
      icon,
      okText = 'OK',
      cancelText = 'Cancel',
      onConfirm,
      onCancel,
      okButtonStyle = {
            backgroundColor: '#FF6F3C',
            color: '#FFFFFF',
      },
      cancelButtonStyle = {
            backgroundColor: 'transparent',
            color: '#FF6F3C',
            border: '1px solid #FF6F3C',
      },
}: ConfirmModalOptions) => {
      Modal.confirm({
            title,
            centered: true,
            content,
            icon,
            okText,
            cancelText,
            okButtonProps: { style: okButtonStyle },
            cancelButtonProps: { style: cancelButtonStyle },
            onOk: onConfirm,
            onCancel,
      });
};
