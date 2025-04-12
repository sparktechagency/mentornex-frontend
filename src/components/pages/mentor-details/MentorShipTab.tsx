'use client';

import Modal from '@/components/ui/Modal';
import { useState } from 'react';
import BookingForm from './booking-modal/BookingForm';
import SubscriptionForm from './booking-modal/SubscriptionForm';
import CustomTab from '@/components/ui/CustomTab';
import SubscriptionBooking from './session-booking/SubcriptionBooking';
import PackagesBooking from './session-booking/PackagesBooking';
import PayPerSessionBooking from './session-booking/PayPerSessionBooking';

const MentorshipTabs = () => {
      const [bookingModal, setBookingModal] = useState(false);
      const [subscribeModal, setSubscribeModal] = useState(false);

      return (
            <div className="bg-white rounded-lg custom-shadow  p-6   max-w-md mx-auto">
                  <CustomTab
                        border
                        tabs={[
                              { key: 'subscription', label: 'Subscription', content: <SubscriptionBooking /> },
                              { key: 'pay-per-session', label: 'Pay Per Session', content: <PayPerSessionBooking /> },
                              { key: 'packages', label: 'Packages', content: <PackagesBooking /> },
                        ]}
                        defaultActiveKey="subscription"
                  />

                  <Modal title="Book a Session" visible={bookingModal} onCancel={() => setBookingModal(false)} width={700}>
                        <BookingForm />
                  </Modal>
                  <Modal title="Subscribe Regular Session" visible={subscribeModal} onCancel={() => setSubscribeModal(false)} width={700}>
                        <SubscriptionForm />
                  </Modal>
            </div>
      );
};

export default MentorshipTabs;
