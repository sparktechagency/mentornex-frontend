import { Button, Form, Input, Typography } from 'antd';

const VerifyOtpPage = () => {
      return (
            <div className="min-h-screen">
                  <div className="container w-full max-w-[500px] mx-auto shadow-xl hover:shadow-2xl rounded-lg p-8 my-20">
                        <div>
                              <div className="text-center">
                                    <Typography.Title level={2}>Verify OTP</Typography.Title>
                                    <Typography.Paragraph>Enter the OTP sent to your email</Typography.Paragraph>
                              </div>

                              <Form layout="vertical" requiredMark={false}>
                                    <Form.Item label="OTP" name="otp" rules={[{ required: true, message: 'Please input the OTP!' }]}>
                                          <Input placeholder="Enter the OTP" />
                                    </Form.Item>

                                    <Form.Item>
                                          <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                                                Verify OTP
                                          </Button>
                                    </Form.Item>
                              </Form>

                              <div className="flex items-center justify-center mt-4">
                                    <span className="text-sm mr-2">Didn’t receive an OTP?</span>
                                    <Button type="link">Resend OTP</Button>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default VerifyOtpPage;
