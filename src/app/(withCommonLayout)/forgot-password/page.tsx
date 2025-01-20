'use client';
import { Button, Form, Input, Typography } from 'antd';
import { useRouter } from 'next/navigation';

const ForgotPasswordPage = () => {
      const router = useRouter();
      const onFinish = async (values: any) => {
            console.log('Success:', values);
            router.push('/set-password');
      };
      return (
            <div className="min-h-[calc(100vh-96px)] flex items-center justify-center">
                  <div className="container  w-full max-w-[500px] mx-auto shadow-xl hover:shadow-2xl rounded-lg p-8 my-20">
                        <div>
                              <div className="text-center">
                                    <Typography.Title level={2}>Forgot Password</Typography.Title>
                                    <Typography.Paragraph>Enter your email to receive a otp</Typography.Paragraph>
                              </div>

                              <Form onFinish={onFinish} layout="vertical" requiredMark={false}>
                                    <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                                          <Input placeholder="Enter your email" />
                                    </Form.Item>

                                    <Form.Item>
                                          <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                                                Send Email
                                          </Button>
                                    </Form.Item>
                              </Form>
                        </div>
                  </div>
            </div>
      );
};

export default ForgotPasswordPage;
