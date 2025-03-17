import Modal from '@/components/ui/Modal';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { useDeleteAccountMutation } from '@/redux/features/auth/authApi';
import { toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@/redux/hooks';
import { removeUser } from '@/redux/features/auth/authSlice';
import { removeAccessToken } from '@/utils/accessToken';

const DeleteAccount = () => {
      const [deleteAccount, { isLoading }] = useDeleteAccountMutation();
      const [open, setOpen] = useState(false);
      const dispatch = useAppDispatch();

      const onFinish = async (values: any) => {
            try {
                  const res = await deleteAccount(values).unwrap();
                  if (res.success) {
                        toast.success(res?.message || 'Account deleted successfully');
                        setOpen(false);
                        dispatch(removeUser());
                        removeAccessToken();
                  }
            } catch (error: any) {
                  toast.error(error?.data.message || 'Failed to delete account');
            }
      };

      return (
            <div>
                  <div className="w-full space-y-3  max-w-lg p-4 bg-white shadow-md rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900">Close your account</h3>
                        <p className=" text-gray-600 mt-1">Once you delete your account, there’s no going back. Please be certain!</p>
                        <Button className="my-3" type="primary" onClick={() => setOpen(true)}>
                              Delete Account
                        </Button>
                  </div>

                  <Modal title="Delete Account" visible={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)}>
                        <Form onFinish={onFinish} layout="vertical" name="delete-account">
                              <Form.Item
                                    label="Current Password"
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                              >
                                    <Input.Password />
                              </Form.Item>
                              <Form.Item className="flex-end">
                                    <Button type="primary" htmlType="submit">
                                          {isLoading ? <LoadingOutlined /> : 'Submit'}
                                    </Button>
                              </Form.Item>
                        </Form>
                  </Modal>
            </div>
      );
};

export default DeleteAccount;
