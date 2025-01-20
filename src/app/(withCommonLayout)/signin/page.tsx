'use client';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import Link from 'next/link';

const SignInPage = () => {
      return (
            <div className="min-h-screen">
                  <div className="container  w-full max-w-[500px] mx-auto shadow-xl   rounded-lg p-8 my-20">
                        <div>
                              <div className="text-center">
                                    <Typography.Title level={2}>Sign In </Typography.Title>
                                    <Typography.Paragraph>Log in to continue your journey and access your sessions</Typography.Paragraph>
                              </div>

                              <Form layout="vertical" requiredMark={false}>
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
                                                Sign In
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
