'use client';
import { useLoginUserMutation } from '@/redux/features/auth/authApi';
import { setUser } from '@/redux/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { decodedUser } from '@/utils/decodeUser';

import { LoadingOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const SignInPage = () => {
      const [signIn, { isLoading }] = useLoginUserMutation();
      const router = useRouter();
      const dispatch = useAppDispatch();
      const onFinish = async (values: any) => {
            try {
                  const res = await signIn(values).unwrap();

                  if (res?.success) {
                        const user = decodedUser(res?.data);
                        dispatch(setUser({ user, token: res?.data }));

                        toast.success(res?.message);
                        router.push('/');
                  }
            } catch (error: any) {
                  toast.error(error?.data?.message || 'Something went wrong');
            }
      };
      return (
            <div className="min-h-[calc(100vh-96px)] flex items-center justify-center">
                  <div className="container  w-full max-w-[500px] mx-auto shadow-xl   rounded-lg p-8 my-20">
                        <div>
                              <div className="text-center">
                                    <Typography.Title level={2}>Sign In </Typography.Title>
                                    <Typography.Paragraph>Log in to continue your journey and access your sessions</Typography.Paragraph>
                              </div>

                              <Form onFinish={onFinish} layout="vertical" requiredMark={false}>
                                    <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                                          <Input placeholder="Enter your email" />
                                    </Form.Item>
                                    <Form.Item
                                          label="Password"
                                          name="password"
                                          rules={[{ required: true, message: 'Please input your password!' }]}
                                    >
                                          <Input.Password placeholder="********" />
                                    </Form.Item>

                                    <Form.Item className=" flex justify-center items-center" name="remember" valuePropName="checked">
                                          <Checkbox>Remember me</Checkbox>
                                          <Button
                                                href="/forgot-password"
                                                style={{
                                                      color: '#FF6F3C',
                                                }}
                                                type="link"
                                          >
                                                Forgot Password?
                                          </Button>
                                    </Form.Item>

                                    <Form.Item>
                                          <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                                                {isLoading ? <LoadingOutlined /> : 'Sign In'}
                                          </Button>
                                    </Form.Item>
                              </Form>

                              <div>
                                    <div className="flex items-center justify-center mt-4">
                                          <span className="text-sm mr-2">Don’t have an account ? </span>
                                          <Link href="/signup">
                                                <p className="text-base font-semibold text-[#FF6F3C] underline">Sign up</p>
                                          </Link>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default SignInPage;
