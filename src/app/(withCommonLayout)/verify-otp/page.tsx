'use client';
import { useVerifyEmailMutation } from '@/redux/features/auth/authApi';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const VerifyOtpPage = () => {
      const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
      const [email, setEmail] = useState('');
      const router = useRouter();
      useEffect(() => {
            const storedEmail = localStorage.getItem('verificationEmail') || '';
            setEmail(storedEmail);
      }, []);
      const onFinish = async (values: any) => {
            try {
                  const res = await verifyEmail({ email, oneTimeCode: Number(values.otp) }).unwrap();
                  if (res?.success) {
                        toast.success(res?.message);
                        localStorage.removeItem('verificationEmail');
                        router.push('/signin');
                  }
            } catch (error: any) {
                  toast.error(error.message || 'Filed to verify OTP');
            }
      };
      return (
            <div className="min-h-[calc(100vh-96px)] flex items-center justify-center">
                  <div className="container w-full max-w-[500px] mx-auto shadow-xl  rounded-lg p-8 my-20">
                        <div>
                              <div className="text-center">
                                    <Typography.Title level={2}>Verify OTP</Typography.Title>
                                    <Typography.Paragraph>Please Enter the OTP sent to your email {email}</Typography.Paragraph>
                              </div>

                              <Form onFinish={onFinish} layout="vertical" requiredMark={false}>
                                    <Form.Item
                                          style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                          }}
                                          label="OTP"
                                          name="otp"
                                          rules={[{ required: true, message: 'Please input the OTP!' }]}
                                    >
                                          <Input.OTP length={4} />
                                    </Form.Item>

                                    <Form.Item>
                                          <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                                                {isLoading ? <LoadingOutlined /> : 'Verify OTP'}
                                          </Button>
                                    </Form.Item>
                              </Form>

                              <div className="flex items-center justify-center ">
                                    <span className="text-sm">Didn’t receive an OTP?</span>
                                    <Button
                                          style={{
                                                color: '#FF6F3C',
                                          }}
                                          type="link"
                                    >
                                          Resend OTP
                                    </Button>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default VerifyOtpPage;
