'use client';
import CustomTab from '@/components/ui/CustomTab';
import SubscriptionBooking from './session-booking/SubcriptionBooking';
import PackagesBooking from './session-booking/PackagesBooking';
import PayPerSessionBooking from './session-booking/PayPerSessionBooking';

const MentorshipTabs = ({ profile, pricingPlans }: { profile: any; pricingPlans: any }) => {
      return (
            <div className="bg-white rounded-lg custom-shadow  p-6   max-w-md mx-auto">
                  <CustomTab
                        border
                        tabs={[
                              {
                                    key: 'subscription',
                                    label: 'Subscription',
                                    content: <SubscriptionBooking profile={profile} subscriptions={pricingPlans?.subscriptions} />,
                              },
                              {
                                    key: 'pay-per-session',
                                    label: 'Pay Per Session',
                                    content: <PayPerSessionBooking profile={profile} payPerSessions={pricingPlans?.payPerSession} />,
                              },
                              {
                                    key: 'packages',
                                    label: 'Packages',
                                    content: <PackagesBooking packages={pricingPlans?.packages} />,
                              },
                        ]}
                        defaultActiveKey="subscription"
                  />
            </div>
      );
};

export default MentorshipTabs;
