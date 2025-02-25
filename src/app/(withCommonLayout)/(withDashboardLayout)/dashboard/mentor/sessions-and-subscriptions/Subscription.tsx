import Modal from '@/components/ui/Modal';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { useState } from 'react';
import { BsCurrencyDollar, BsPlus } from 'react-icons/bs';
import { IoIosCall, IoMdClock } from 'react-icons/io';
import { IoChatbox } from 'react-icons/io5';

const Subscription = () => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const onFinish = (values: any) => {
            console.log('Success:', values);
            setIsModalOpen(false);
      };

      return (
            <div>
                  <div className="flex-end">
                        <Button onClick={() => setIsModalOpen(true)} icon={<BsPlus />} type="primary">
                              Add Subscription
                        </Button>
                  </div>
                  <div className="p-5 max-w-md  rounded-lg custom-shadow">
                        <div className="mb-3 uppercase text-title text-2xl font-bold">Pro Subscription</div>

                        <h1 className="text-xl font-semibold">$300 / month</h1>
                        <p className="text-gray-600 my-4">Get premium guidance and accelerate your success with personalized support.</p>
                        <ul className="space-y-2 text-gray-600">
                              <li className="flex items-center">
                                    <span className="text-primary mr-2">
                                          <IoIosCall size={20} />
                                    </span>{' '}
                                    10 One-on-One Strategy Calls
                              </li>
                              <li className="flex items-center">
                                    <span className="text-primary mr-2">
                                          <IoChatbox size={20} />
                                    </span>{' '}
                                    Unlimited Q&A Support
                              </li>
                              <li className="flex items-center">
                                    <span className="text-primary mr-2">
                                          <IoMdClock size={20} />
                                    </span>{' '}
                                    Fast Response Guarantee
                              </li>
                        </ul>
                        <Button
                              type="default"
                              style={{
                                    width: '100%',
                                    border: '1px solid #FF6F3C',
                                    color: '#FF6F3C',
                                    marginTop: '10px',
                              }}
                        >
                              Edit
                        </Button>
                  </div>

                  <Modal title="Add Subscription" visible={isModalOpen} width={600} onCancel={() => setIsModalOpen(false)}>
                        <Form onFinish={onFinish} layout="vertical">
                              <Form.Item
                                    rules={[{ required: true, message: 'Please enter the subscription name' }]}
                                    name="subscriptionName"
                                    label="Subscription Name"
                              >
                                    <Input placeholder="Enter subscription name" />
                              </Form.Item>

                              <Form.Item
                                    name="shortDescription"
                                    rules={[{ required: true, message: 'Please enter the short description' }]}
                                    label="Short Description"
                              >
                                    <Input.TextArea placeholder="Enter short description" />
                              </Form.Item>

                              <Form.Item rules={[{ required: true, message: 'Please enter the fee' }]} name="fee" label="Fee">
                                    <InputNumber
                                          style={{ width: '100%' }}
                                          type="number"
                                          addonBefore={<BsCurrencyDollar />}
                                          placeholder="Enter fee"
                                    />
                              </Form.Item>
                              <Form.Item
                                    name="features"
                                    label="Features"
                                    rules={[{ required: true, message: 'Please enter the features' }]}
                              >
                                    <Select mode="tags" maxCount={3} maxLength={3} placeholder="Select features">
                                          <Select.Option value="Chat">Chat</Select.Option>
                                          <Select.Option value="Response">Response</Select.Option>
                                          <Select.Option value="One-on-One">One-on-One</Select.Option>
                                          <Select.Option value="Q&A">Q&A</Select.Option>
                                          <Select.Option value="Fast Response">Fast Response</Select.Option>
                                    </Select>
                              </Form.Item>

                              <Form.Item className="flex-end">
                                    <Button type="primary" htmlType="submit">
                                          Submit
                                    </Button>
                              </Form.Item>
                        </Form>
                  </Modal>
            </div>
      );
};

export default Subscription;
