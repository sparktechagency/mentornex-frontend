'use client';
import CustomTab from '@/components/ui/CustomTab';
import SubscriptionManage from './SubscriptionManage';
import PackageManage from './PackageManage';
import PayPerSessionManage from './PayPerSessionManage';

const PurchaseManagement = () => {
      return (
            <div>
                  <CustomTab
                        tabs={[
                              {
                                    key: 'Subscription',
                                    label: 'Subscription',
                                    content: <SubscriptionManage />,
                              },
                              {
                                    key: 'Packages',
                                    label: 'Packages',
                                    content: <PackageManage />,
                              },
                              {
                                    key: 'Pay Per Session',
                                    label: 'Pay Per Session',
                                    content: <PayPerSessionManage />,
                              },
                        ]}
                        defaultActiveKey="Subscription"
                  />
            </div>
      );
};

export default PurchaseManagement;
