'use client';
import { Button, Form, Input, Typography } from 'antd';
import { useRouter } from 'next/navigation';

const VerifyOtpPage = () => {
      const router = useRouter();
      const onFinish = async (values: any) => {
            console.log('Success:', values);
            router.push('/set-new-password');
      };
      return (
            <div className="min-h-[calc(100vh-96px)] flex items-center justify-center">
                  <div className="container w-full max-w-[500px] mx-auto shadow-xl  rounded-lg p-8 my-20">
                        <div>
                              <div className="text-center">
                                    <Typography.Title level={2}>Verify OTP</Typography.Title>
                                    <Typography.Paragraph>Enter the OTP sent to your email</Typography.Paragraph>
                              </div>

                              <Form onFinish={onFinish} layout="vertical" requiredMark={false}>
                                    <Form.Item label="OTP" name="otp" rules={[{ required: true, message: 'Please input the OTP!' }]}>
                                          <Input.OTP length={6} />
                                    </Form.Item>

                                    <Form.Item>
                                          <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                                                Verify OTP
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
