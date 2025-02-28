'use client';
import { useForgetPasswordMutation, useLoginUserMutation, useVerifyEmailMutation } from '@/redux/features/auth/authApi';
import { setUser } from '@/redux/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { decodedUser } from '@/utils/decodeUser';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

const VerifyOtpPage = () => {
      const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
      const [resendOtp, { isLoading: resendLoading }] = useForgetPasswordMutation();
      const [signIn] = useLoginUserMutation();
      const searchParams = useSearchParams();
      const dispatch = useAppDispatch();
      const reason = searchParams.get('reason');
      const email = searchParams.get('email');
      const router = useRouter();

      const onFinish = async (values: any) => {
            try {
                  const res = await verifyEmail({ email, oneTimeCode: Number(values.otp) }).unwrap();
                  if (res?.success) {
                        toast.success(res?.message);
                        if (reason === 'signup') {
                              const res = await signIn({ email, password: localStorage.getItem('loginPassword') }).unwrap();
                              if (res?.success) {
                                    toast.success(res?.message);
                                    localStorage.removeItem('loginPassword');
                                    const user = decodedUser(res?.data);
                                    dispatch(setUser({ user, token: res?.data }));
                                    router.push('/');
                              }
                        } else if (reason === 'forget-password') {
                              localStorage.setItem('oneTimeToken', res?.data);
                              router.push('/set-new-password');
                        }
                  }
            } catch (error: any) {
                  console.log(error);
                  toast.error(error.data.message || 'Filed to verify OTP');
            }
      };

      const handleResend = async () => {
            try {
                  const res = await resendOtp({ email }).unwrap();
                  if (res?.success) {
                        toast.success(res?.message);
                  }
            } catch (error: any) {
                  toast.error(error.message || 'Filed to resend OTP');
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
                                          onClick={handleResend}
                                          style={{
                                                color: '#FF6F3C',
                                          }}
                                          type="link"
                                    >
                                          {resendLoading ? <LoadingOutlined /> : 'Resend OTP'}
                                    </Button>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default VerifyOtpPage;
