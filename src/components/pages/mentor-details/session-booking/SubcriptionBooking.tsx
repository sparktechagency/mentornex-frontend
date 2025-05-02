import { Button } from 'antd';
import React from 'react';
import { IoIosBook, IoMdEye } from 'react-icons/io';

const SubscriptionBooking = () => {
      return (
            <div className="w-full">
                  <div className="p-4 space-y-6">
                        <div className="w-full text-2xl font-semibold text-gray-800">Content Viewing Subscription</div>

                        <div className="space-y-4">
                              <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
                                    $300 <span className="text-2xl text-gray-600">/month</span>
                              </h1>
                              <p className="text-gray-600 text-lg leading-relaxed">
                                    Access premium content, exclusive materials, and personalized learning resources.
                              </p>
                        </div>

                        <ul className="space-y-4 text-gray-700">
                              <li className="flex items-center space-x-3 text-lg">
                                    <span className="flex-shrink-0 p-1 text-primary bg-primary/10 rounded-full">
                                          <IoIosBook size={24} />
                                    </span>
                                    <span>Unlimited Access to Premium Content</span>
                              </li>
                              <li className="flex items-center space-x-3 text-lg">
                                    <span className="flex-shrink-0 p-1 text-primary bg-primary/10 rounded-full">
                                          <IoMdEye size={24} />
                                    </span>
                                    <span>View All Exclusive Materials</span>
                              </li>
                        </ul>

                        <Button
                              type="primary"
                              block
                              className="h-12 text-lg font-medium bg-orange-500 hover:bg-orange-600 transition-colors duration-200"
                        >
                              Subscribe Now
                        </Button>
                  </div>
            </div>
      );
};

export default SubscriptionBooking;
