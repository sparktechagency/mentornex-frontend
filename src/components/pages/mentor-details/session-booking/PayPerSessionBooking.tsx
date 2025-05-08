import { Button, Radio } from 'antd';
import React, { useState } from 'react';

import Modal from '@/components/ui/Modal';
import BookingForm from '../booking-modal/BookingForm';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addSelectedSessionId } from '@/redux/features/booking/bookingSlice';

const PayPerSessionBooking = ({ profile, payPerSessions }: { profile: any; payPerSessions: any }) => {
      const dispatch = useAppDispatch();
      const [bookingModal, setBookingModal] = useState(false);
      const { selectedSessionId } = useAppSelector((state) => state.booking);

      if (!payPerSessions || payPerSessions.length === 0) {
            return (
                  <div className="p-2 text-center">
                        <p className="text-gray-600 text-lg">No sessions available at this time</p>
                        <p className="text-gray-500 text-sm mt-2">Please check back later for available sessions</p>
                  </div>
            );
      }

      return (
            <div className="p-2">
                  <div className="max-h-[300px] overflow-y-auto hide-scrollbar">
                        <Radio.Group
                              onChange={(e) => {
                                    const selectedTitle = e.target.value;
                                    const session = payPerSessions.find((item: any) => item.title === selectedTitle);
                                    dispatch(addSelectedSessionId(session._id));
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
                        {payPerSessions.length > 3 && <p className="text-center my-2">Scroll down for more sessions</p>}
                  </div>

                  <Button
                        onClick={() => setBookingModal(true)}
                        type="primary"
                        block
                        className="mt-2 bg-orange-500 hover:bg-orange-600"
                        disabled={!selectedSessionId}
                  >
                        Book Now
                  </Button>

                  <Modal title="Book a Session" visible={bookingModal} onCancel={() => setBookingModal(false)} width={700}>
                        <BookingForm sessionId={selectedSessionId} profile={profile} />
                  </Modal>
            </div>
      );
};

export default PayPerSessionBooking;
