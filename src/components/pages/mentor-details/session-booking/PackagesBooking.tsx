import { Button, Radio } from 'antd';
import React from 'react';

const PackagesBooking = () => {
      const options = [
            { label: 'Lite', value: 'lite' },
            { label: 'Standard', value: 'standard' },
            { label: 'Pro', value: 'pro' },
      ];
      return (
            <div className="w-full">
                  <div className="p-4 space-y-6">
                        <div className="w-full">
                              <Radio.Group
                                    block
                                    options={options}
                                    defaultValue="lite"
                                    optionType="button"
                                    buttonStyle="solid"
                                    size="large"
                                    className="w-full"
                              />
                        </div>

                        <div className="space-y-4">
                              <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
                                    $300 <span className="text-2xl text-gray-600">/month</span>
                              </h1>
                              <p className="text-gray-600 text-lg leading-relaxed">
                                    Get premium guidance and accelerate your success with personalized support.
                              </p>
                        </div>

                        <ul className="space-y-4 text-gray-700">
                              <li className="flex items-center space-x-3 text-lg">
                                    <span>10 One-on-One Strategy Calls</span>
                              </li>
                              <li className="flex items-center space-x-3 text-lg">
                                    <span>Unlimited Q&A Support</span>
                              </li>
                              <li className="flex items-center space-x-3 text-lg">
                                    <span>Fast Response Guarantee</span>
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

export default PackagesBooking;
