'use client';
import CustomTab from '@/components/ui/CustomTab';
import Sessions from './Sessions';
import Subscription from './Subscription';

const SessionsAndSubscriptions = () => {
      return (
            <div>
                  <h1 className="text-2xl font-bold mb-2">Sessions and Subscriptions</h1>

                  <div>
                        <CustomTab
                              tabs={[
                                    { key: 'pay-per-session', label: 'Pay Per Session', content: <Sessions /> },
                                    { key: 'subscription', label: 'Subscription', content: <Subscription /> },
                              ]}
                              key={'session'}
                        />
                  </div>
            </div>
      );
};

export default SessionsAndSubscriptions;
