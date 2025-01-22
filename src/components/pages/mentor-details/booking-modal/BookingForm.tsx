'use client';

import { Input, Button } from 'antd';
import DateSelection from './DateSelection';
import TimeSelection from './TimeSelection';

const { TextArea } = Input;

const BookingForm = () => {
      return (
            <div className="space-y-8">
                  <DateSelection />
                  <TimeSelection />

                  <div>
                        <h3 className="text-lg mb-2 font-semibold">Select Topic</h3>
                        <div className="border border-gray-200 p-2 rounded-lg">
                              <h2 className="text-lg ">Career Guidance Session - $99</h2>
                        </div>
                  </div>

                  <div>
                        <h3 className="text-lg mb-4 font-semibold">
                              What final result do you want to obtain from this session? <span className="text-red-500">*</span>
                        </h3>
                        <TextArea placeholder="Your answer" maxLength={100} rows={3} className="mt-2" />
                        <p className="text-sm text-gray-400 text-right">*Max 100 Characters</p>
                  </div>

                  <Button type="primary" block className="bg-orange-500 hover:bg-orange-600">
                        Book Session
                  </Button>
            </div>
      );
};

export default BookingForm;
