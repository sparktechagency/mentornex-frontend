'use client';
import { timeZones } from '@/const/constant';
import { useRegisterUserMutation } from '@/redux/features/user/userApi';
import { LoadingOutlined } from '@ant-design/icons';

import { Button, Checkbox, Form, Input, Select, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const SignUpPage = () => {
      const [registerUser, { isLoading }] = useRegisterUserMutation();

      const [role, setRole] = useState('MENTEE');
      const router = useRouter();
      const [form] = Form.useForm();

      const onFinish = async (values: any) => {
            try {
                  const res = await registerUser(values).unwrap();
                  if (res?.success) {
                        toast.success(res?.message);
                        router.push(`/verify-otp?reason=signup&email=${values.email}`);
                  }
            } catch (error: any) {
                  toast.error(error?.data?.message || 'Something went wrong');
            }
      };

      useEffect(() => {
            form.setFieldsValue({
                  role: role,
            });
      }, [role, form]);
      return (
            <div className="min-h-[calc(100vh-96px)] flex items-center justify-center">
                  <div className="container w-full max-w-[500px] mx-auto shadow-xl  rounded-lg p-8 my-20">
                        <div>
                              <div className="text-center">
                                    <Typography.Title level={2}>Sign Up</Typography.Title>
                                    <Typography.Paragraph>Join now to connect, learn, and grow with expert mentors.</Typography.Paragraph>
                              </div>

                              <Form form={form} onFinish={onFinish} layout="vertical" requiredMark={false}>
                                    <Form.Item className="flex items-center justify-center" name="role">
                                          <Button
                                                onClick={() => setRole('MENTEE')}
                                                value="MENTEE"
                                                style={{
                                                      backgroundColor: role === 'MENTEE' ? '#FF6F3C' : '#fff',
                                                      color: role === 'MENTEE' ? '#fff' : '#000',
                                                      borderRadius: '5px',
                                                      marginRight: '10px',
                                                      height: '40px',
                                                      lineHeight: '40px',
                                                      padding: '0 20px',
                                                }}
                                          >
                                                Mentee
                                          </Button>
                                          <Button
                                                onClick={() => setRole('MENTOR')}
                                                value="MENTOR"
                                                style={{
                                                      backgroundColor: role === 'MENTOR' ? '#FF6F3C' : '#fff',
                                                      color: role === 'MENTOR' ? '#fff' : '#000',
                                                      border: '1px solid #FF6F3C',
                                                      borderRadius: '5px',
                                                      height: '40px',
                                                      lineHeight: '40px',
                                                      padding: '0 20px',
                                                }}
                                          >
                                                Mentor
                                          </Button>
                                    </Form.Item>
                                    <Form.Item
                                          label="Full Name"
                                          name="name"
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
                                          rules={[
                                                { required: true, message: 'Please input your password!' },
                                                { min: 8, message: 'Password must be at least 8 characters' },
                                          ]}
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
                                                            return Promise.reject(
                                                                  new Error(
                                                                        'Passwords do not match! Please enter the same password as above.'
                                                                  )
                                                            );
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
                                          rules={[
                                                {
                                                      validator(_rule, value, callback) {
                                                            if (value) {
                                                                  callback();
                                                            } else {
                                                                  callback('You must agree to our terms and conditions');
                                                            }
                                                      },
                                                },
                                          ]}
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
                                                {isLoading ? <LoadingOutlined /> : 'Sign Up'}
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
