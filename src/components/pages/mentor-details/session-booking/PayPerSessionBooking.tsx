import { Button, Radio } from 'antd';
import React, { useState } from 'react';
import { usePurchasePayPerSessionMutation } from '@/redux/features/purchase/purchaseApi';
import { toast } from 'react-toastify';

const PayPerSessionBooking = ({ payPerSessions }: { payPerSessions: any }) => {
      const [selectedSession, setSelectedSession] = useState<any>(null);
      const [purchasePayPerSession, { isLoading }] = usePurchasePayPerSessionMutation();

      if (!payPerSessions || payPerSessions.length === 0) {
            return (
                  <div className="p-2 text-center">
                        <p className="text-gray-600 text-lg">No sessions available at this time</p>
                        <p className="text-gray-500 text-sm mt-2">Please check back later for available sessions</p>
                  </div>
            );
      }

      const handleBookPayPerSession = async () => {
            try {
                  const res = await purchasePayPerSession({ id: selectedSession._id }).unwrap();
                  console.log(res);
                  if (res.success) {
                        window.open(res.data, '_blank');
                  }
            } catch (error: any) {
                  toast.error(error.data.message || 'Failed to purchase package');
            }
      };
      return (
            <div className="p-2">
                  <Radio.Group
                        onChange={(e) => {
                              const selectedTitle = e.target.value;
                              const session = payPerSessions.find((item: any) => item.title === selectedTitle);
                              setSelectedSession(session);
                        }}
                        defaultValue="Introductory Call"
                        className="w-full space-y-4"
                  >
                        {payPerSessions.map((item: any, index: string) => (
                              <div key={index} className="border rounded-lg p-4 flex items-center">
                                    <Radio value={item.title} className="flex-grow">
                                          <span className="text-gray-800 font-medium">{item.title}</span>
                                          <p className="text-gray-500 text-sm">${item.amount}</p>
                                    </Radio>
                              </div>
                        ))}
                  </Radio.Group>

                  <Button
                        onClick={handleBookPayPerSession}
                        type="primary"
                        block
                        className="mt-2 bg-orange-500 hover:bg-orange-600"
                        disabled={!selectedSession}
                  >
                        {isLoading ? 'Loading...' : 'Book Now'}
                  </Button>
            </div>
      );
};

export default PayPerSessionBooking;
