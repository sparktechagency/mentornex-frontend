'use client';
import { timeZones } from '@/const/constant';
import { Button, Checkbox, Form, Input, Select, Typography } from 'antd';
import Link from 'next/link';

const SignUpPage = () => {
      return (
            <div className="min-h-[calc(100vh-96px)] flex items-center justify-center">
                  <div className="container w-full max-w-[500px] mx-auto shadow-xl  rounded-lg p-8 my-20">
                        <div>
                              <div className="text-center">
                                    <Typography.Title level={2}>Sign Up</Typography.Title>
                                    <Typography.Paragraph>Join now to connect, learn, and grow with expert mentors.</Typography.Paragraph>
                              </div>

                              <Form layout="vertical" requiredMark={false}>
                                    <Form.Item
                                          label="Full Name"
                                          name="fullName"
                                          rules={[{ required: true, message: 'Please input your full name!' }]}
                                    >
                                          <Input placeholder="Enter your full name" />
                                    </Form.Item>

                                    <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                                          <Input placeholder="Enter your email" />
                                    </Form.Item>

                                    <Form.Item
                                          label="Industry"
                                          name="industry"
                                          rules={[{ required: true, message: 'Please select your industry!' }]}
                                    >
                                          <Select placeholder="Select">
                                                <Select.Option value="tech">Tech</Select.Option>
                                                <Select.Option value="healthcare">Healthcare</Select.Option>
                                                <Select.Option value="finance">Finance</Select.Option>
                                                <Select.Option value="education">Education</Select.Option>
                                          </Select>
                                    </Form.Item>

                                    <Form.Item
                                          label="Time Zone"
                                          name="timeZone"
                                          rules={[{ required: true, message: 'Please select your time zone!' }]}
                                    >
                                          <Select placeholder="Select your time zone">
                                                {timeZones.map((zone) => (
                                                      <Select.Option key={zone.value} value={zone.value}>
                                                            {zone.label}
                                                      </Select.Option>
                                                ))}
                                          </Select>
                                    </Form.Item>
                                    <Form.Item
                                          label="Password"
                                          name="password"
                                          rules={[{ required: true, message: 'Please input your password!' }]}
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
                                                            if (!value || getFieldValue('password') === value) {
                                                                  return Promise.resolve();
                                                            }
                                                            return Promise.reject(new Error('Passwords do not match!'));
                                                      },
                                                }),
                                          ]}
                                    >
                                          <Input.Password placeholder="********" />
                                    </Form.Item>

                                    <Form.Item
                                          style={{
                                                margin: '20px auto',
                                          }}
                                          name="terms"
                                          valuePropName="checked"
                                          rules={[{ required: true, message: 'You must agree to the terms and conditions!' }]}
                                    >
                                          <Checkbox>
                                                I agree to{' '}
                                                <Link className="text-primary" href="/terms-and-conditions">
                                                      Terms of conditions
                                                </Link>{' '}
                                                and{' '}
                                                <Link className="text-primary" href="/privacy-policy">
                                                      Privacy Policy
                                                </Link>
                                          </Checkbox>
                                    </Form.Item>

                                    <Form.Item>
                                          <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                                                Sign Up
                                          </Button>
                                    </Form.Item>
                              </Form>

                              <div>
                                    <div className="flex items-center justify-center mt-4">
                                          <span className="text-sm mr-2">Already have an account?</span>
                                          <Link href="/signin">
                                                <p className="text-base font-semibold text-[#FF6F3C] underline">Sign In</p>
                                          </Link>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default SignUpPage;
