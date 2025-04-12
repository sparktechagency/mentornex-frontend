import { Button, Radio } from 'antd';
import React from 'react';

const PayPerSessionBooking = () => {
      return (
            <div className="p-2">
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
                        // onClick={() => setBookingModal(true)}
                        type="primary"
                        block
                        className="mt-2 bg-orange-500 hover:bg-orange-600"
                  >
                        Book Now
                  </Button>
            </div>
      );
};

export default PayPerSessionBooking;
