'use client';

import Modal from '@/components/ui/Modal';
import { Tabs, Button, Radio, Flex } from 'antd';
import { useState } from 'react';
import { IoIosCall, IoMdClock } from 'react-icons/io';
import { IoChatbox } from 'react-icons/io5';
import { toast } from 'react-toastify';
import BookingForm from './BookingForm';

const { TabPane } = Tabs;

const MentorshipTabs = () => {
      const [bookingModal, setBookingModal] = useState(false);
      const options = [
            { label: 'Lite', value: 'lite' },
            { label: 'Standard', value: 'standard' },
            { label: 'Pro', value: 'pro' },
      ];

      const handleSubscribe = () => {
            toast.success('Subscription successful!');
            toast.error('Subscription failed!');
      };

      return (
            <div className="bg-white rounded-lg shadow-lg p-6   max-w-md mx-auto">
                  <Tabs defaultActiveKey="1" centered>
                        {/* Mentorship Plans Tab */}
                        <TabPane tab={<span className="font-semibold">Mentorship Plans</span>} key="1">
                              <div className="p-4">
                                    <Flex
                                          style={{
                                                marginBottom: '16px',
                                          }}
                                          vertical
                                          justify="center"
                                    >
                                          <Radio.Group
                                                block
                                                options={options}
                                                defaultValue="lite"
                                                optionType="button"
                                                buttonStyle="solid"
                                                size="large"
                                                style={{
                                                      height: '48px',
                                                      width: '100%',
                                                }}
                                          />
                                    </Flex>

                                    <h1 className="text-3xl font-bold text-gray-800">$300 / month</h1>
                                    <p className="text-gray-600 my-4">
                                          Get premium guidance and accelerate your success with personalized support.
                                    </p>
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
                                          onClick={handleSubscribe}
                                          type="primary"
                                          block
                                          className="mt-6 bg-orange-500 hover:bg-orange-600"
                                    >
                                          Subscribe Now
                                    </Button>
                              </div>
                        </TabPane>

                        <TabPane tab={<span className="font-semibold">Session</span>} key="2">
                              <div className="p-4">
                                    <Radio.Group defaultValue="Introductory Call" className="w-full space-y-4">
                                          <div className="border rounded-lg p-4 flex items-center">
                                                <Radio value="Introductory Call" className="flex-grow">
                                                      <span className="text-gray-800 font-medium">Introductory Call</span>
                                                      <p className="text-gray-500 text-sm">Free</p>
                                                </Radio>
                                          </div>
                                          <div className="border rounded-lg p-4 flex items-center">
                                                <Radio value="Career Guidance Session" className="flex-grow">
                                                      <span className="text-gray-800 font-medium">Career Guidance Session</span>
                                                      <p className="text-gray-500 text-sm">30 minutes, $99 per session</p>
                                                </Radio>
                                          </div>
                                          <div className="border rounded-lg p-4 flex items-center">
                                                <Radio value="Career Strategy" className="flex-grow">
                                                      <span className="text-gray-800 font-medium">Career Strategy</span>
                                                      <p className="text-gray-500 text-sm">45 minutes, $149 per session</p>
                                                </Radio>
                                          </div>
                                    </Radio.Group>

                                    <Button
                                          onClick={() => setBookingModal(true)}
                                          type="primary"
                                          block
                                          className="mt-2 bg-orange-500 hover:bg-orange-600"
                                    >
                                          Book Now
                                    </Button>
                              </div>
                        </TabPane>
                  </Tabs>

                  <Modal title="Book a Session" visible={bookingModal} onCancel={() => setBookingModal(false)} width={800}>
                        <BookingForm />
                  </Modal>
            </div>
      );
};

export default MentorshipTabs;
