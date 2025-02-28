'use client';

import { useResetPasswordMutation } from '@/redux/features/auth/authApi';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const SetNewPasswordPage = () => {
      const router = useRouter();
      const [resetPassword, { isLoading }] = useResetPasswordMutation();
      const onFinish = async (values: any) => {
            try {
                  const res = await resetPassword(values).unwrap();
                  if (res?.success) {
                        toast.success(res?.message);
                        localStorage.removeItem('oneTimeToken');
                        router.push('/signin');
                  }
            } catch (error: any) {
                  toast.error(error?.data?.message || 'Something went wrong in the server');
            }
      };

      return (
            <div className="min-h-[calc(100vh-96px)] flex items-center justify-center">
                  <div className="container w-full max-w-[500px] mx-auto shadow-xl  rounded-lg p-8 my-20">
                        <div>
                              <div className="text-center">
                                    <Typography.Title level={2}>Set New Password</Typography.Title>
                                    <Typography.Paragraph>Create a strong password for your account</Typography.Paragraph>
                              </div>

                              <Form onFinish={onFinish} layout="vertical" requiredMark={false}>
                                    <Form.Item
                                          label="New Password"
                                          name="newPassword"
                                          rules={[{ required: true, message: 'Please input your new password!' }]}
                                    >
                                          <Input.Password placeholder="********" />
                                    </Form.Item>

                                    <Form.Item
                                          label="Confirm Password"
                                          name="confirmPassword"
                                          rules={[
                                                { required: true, message: 'Please confirm your password!' },
                                                ({ getFieldValue }) => ({
                                                      validator(_, value) {
                                                            if (!value || getFieldValue('newPassword') === value) {
                                                                  return Promise.resolve();
                                                            }
                                                            return Promise.reject(new Error('Passwords do not match!'));
                                                      },
                                                }),
                                          ]}
                                    >
                                          <Input.Password placeholder="********" />
                                    </Form.Item>

                                    <Form.Item>
                                          <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                                                {isLoading ? <LoadingOutlined /> : 'Set Password'}
                                          </Button>
                                    </Form.Item>
                              </Form>

                              <div className="flex items-center justify-center mt-4">
                                    <span className="text-sm mr-2">Back to</span>
                                    <Link href="/signin">
                                          <p className="text-base font-semibold text-[#FF6F3C] underline">Sign In</p>
                                    </Link>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default SetNewPasswordPage;
