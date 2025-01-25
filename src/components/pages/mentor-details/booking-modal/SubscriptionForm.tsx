'use client';

import { Button } from 'antd';
import TimeSelection from './TimeSelection';
import RegularSessionSlotSelection from './RegularSessionSlotSelection';

const SubscriptionForm = () => {
      return (
            <div className="space-y-8">
                  <RegularSessionSlotSelection />
                  <TimeSelection />

                  <Button type="primary" block className="bg-orange-500 hover:bg-orange-600">
                        Book Session
                  </Button>
            </div>
      );
};

export default SubscriptionForm;
