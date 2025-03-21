'use client';
import { useConnectStripeAccountMutation } from '@/redux/features/payment/payementApi';
import { Button } from 'antd';
// import React, { useState } from 'react';
// import { Form, Input, Button, Checkbox } from 'antd';
import { toast } from 'react-toastify';
// import { CreditCardOutlined } from '@ant-design/icons';

const BillingInformation = () => {
      const [connectStripeAccount] = useConnectStripeAccountMutation();
      // const [isFormVisible, setIsFormVisible] = useState(false);

      // const handleOpen = () => setIsFormVisible(true);
      // const handleClose = () => setIsFormVisible(false);

      // const handleSave = (values: any) => {
      //       console.log('Form Submitted:', values);
      //       setIsFormVisible(false);
      // };

      const handleConnectAccount = async () => {
            try {
                  const res = await connectStripeAccount({}).unwrap();
                  if (res?.success) {
                        toast.success(res?.message);
                  }
            } catch (error: any) {
                  toast.error(error?.data?.message);
            }
      };
      return (
            <div>
                  <div className="mb-4">
                        <Button type="primary" onClick={handleConnectAccount}>
                              Add Billing
                        </Button>
                  </div>

                  {/* {isFormVisible && (
                        <Form
                              className="max-w-2xl border rounded-lg"
                              style={{
                                    padding: 15,
                              }}
                              layout="vertical"
                              onFinish={handleSave}
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

                                    <Form.Item
                                          label="CVC"
                                          name="cvc"
                                          rules={[{ required: true, message: 'Please enter the security code' }]}
                                    >
                                          <Input placeholder="Security Code" />
                                    </Form.Item>
                              </div>

                              <Form.Item name="remember" valuePropName="checked">
                                    <Checkbox>Remember this card, save it on my card list</Checkbox>
                              </Form.Item>

                              <div className="flex justify-between mt-4">
                                    <Button onClick={handleClose} className="bg-gray-100 text-gray-600 hover:bg-gray-200">
                                          Cancel
                                    </Button>
                                    <Button type="primary" htmlType="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
                                          Save
                                    </Button>
                              </div>
                        </Form>
                  )} */}
            </div>
      );
};

export default BillingInformation;
