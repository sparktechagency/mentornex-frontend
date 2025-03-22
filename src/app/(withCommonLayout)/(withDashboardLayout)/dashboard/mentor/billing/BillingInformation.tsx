'use client';
import { useAddBillingMutation, useLoginStripeMutation } from '@/redux/features/billing/billingApi';
import { useGetUserProfileQuery } from '@/redux/features/user/userApi';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';

import { toast } from 'react-toastify';

const BillingInformation = () => {
      const { data: profile } = useGetUserProfileQuery([]);
      const router = useRouter();
      const [addOrUpdateBilling, { isLoading }] = useAddBillingMutation();
      const [loginStripe, { isLoading: loginLoading }] = useLoginStripeMutation();

      const handleConnectAccount = async () => {
            try {
                  const res = await addOrUpdateBilling({}).unwrap();
                  console.log(res);
                  if (res?.success) {
                        router.push(res?.data?.onboardingUrl);
                  }
            } catch (error: any) {
                  toast.error(error?.data?.message);
            }
      };
      const loginStripeDashboard = async () => {
            try {
                  const res = await loginStripe({}).unwrap();
                  if (res?.success) {
                        router.push(res?.data?.loginUrl);
                  }
            } catch (error: any) {
                  toast.error(error?.data?.message);
            }
      };
      return (
            <div>
                  <div className="mb-4 flex gap-4">
                        <Button type="primary" onClick={handleConnectAccount}>
                              {isLoading ? 'Connecting...' : `${profile?.isConnected ? 'Update Account' : 'Connect Account'}`}
                        </Button>
                        {profile?.isConnected && (
                              <Button type="primary" onClick={loginStripeDashboard}>
                                    {loginLoading ? 'Logging...' : 'Login to Stripe Dashboard'}
                              </Button>
                        )}
                  </div>

                  {/* <Form
                        className="max-w-2xl border rounded-lg"
                        style={{
                              padding: 15,
                        }}
                        layout="vertical"
                        initialValues={{ remember: true }}
                  >
                        <Form.Item label="Payment Method" name="paymentMethod">
                              <Input prefix={<CreditCardOutlined className="text-orange-500 text-xl mx-2" />} />
                        </Form.Item>

                        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
                              <Input placeholder="Enter name" />
                        </Form.Item>

                        <Form.Item
                              label="Card Number"
                              name="cardNumber"
                              rules={[{ required: true, message: 'Please enter your card number' }]}
                        >
                              <Input
                                    placeholder="Enter card number"
                                    prefix={<CreditCardOutlined className="text-orange-500 text-xl mx-2" />}
                              />
                        </Form.Item>

                        <div className="grid grid-cols-2 gap-4">
                              <Form.Item
                                    label="MM / YY"
                                    name="expiryDate"
                                    rules={[{ required: true, message: 'Please enter the expiration date' }]}
                              >
                                    <Input placeholder="MM / YY" />
                              </Form.Item>

                              <Form.Item label="CVC" name="cvc" rules={[{ required: true, message: 'Please enter the security code' }]}>
                                    <Input placeholder="Security Code" />
                              </Form.Item>
                        </div>

                        <Form.Item name="remember" valuePropName="checked">
                              <Checkbox>Remember this card, save it on my card list</Checkbox>
                        </Form.Item>

                        <div className="flex justify-between mt-4">
                              <Button className="bg-gray-100 text-gray-600 hover:bg-gray-200">Cancel</Button>
                              <Button type="primary" htmlType="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
                                    Save
                              </Button>
                        </div>
                  </Form> */}
            </div>
      );
};

export default BillingInformation;
