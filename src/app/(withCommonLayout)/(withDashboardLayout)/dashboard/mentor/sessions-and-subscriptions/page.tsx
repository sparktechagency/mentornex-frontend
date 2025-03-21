'use client';
import CustomTab from '@/components/ui/CustomTab';
import Sessions from './Sessions';
import Subscription from './Subscription';
import { useAppSelector } from '@/redux/hooks';
import { useGetSubscriptionsQuery } from '@/redux/features/subscription/subscriptionApi';

const SessionsAndSubscriptions = () => {
      const { user } = useAppSelector((state) => state.auth);
      const { data: pricingPlans } = useGetSubscriptionsQuery(user?.id, { skip: !user });
      console.log(pricingPlans);
      return (
            <div>
                  <h1 className="text-2xl font-bold mb-2">Sessions and Subscriptions</h1>

                  <div>
                        <CustomTab
                              tabs={[
                                    {
                                          key: 'pay-per-session',
                                          label: 'Pay Per Session',
                                          content: <Sessions sessions={pricingPlans?.payPerSession} />,
                                    },
                                    {
                                          key: 'subscription',
                                          label: 'Subscription',
                                          content: <Subscription pricingPlans={pricingPlans?.subscriptions} />,
                                    },
                              ]}
                              key={'session'}
                        />
                  </div>
            </div>
      );
};

export default SessionsAndSubscriptions;
