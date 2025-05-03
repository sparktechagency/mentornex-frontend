'use client';
import CustomTab from '@/components/ui/CustomTab';
import SubscriptionManage from './SubscriptionManage';
import PackageManage from './PackageManage';
import PayPerSessionManage from './PayPerSessionManage';
import { useGetSubscriptionPackagesQuery } from '@/redux/features/purchase/purchaseApi';

const PurchaseManagement = () => {
      const { data } = useGetSubscriptionPackagesQuery([]);

      return (
            <div>
                  <CustomTab
                        tabs={[
                              {
                                    key: 'Subscription',
                                    label: 'Subscription',
                                    content: <SubscriptionManage subscriptions={data?.subscription} />,
                              },
                              {
                                    key: 'Packages',
                                    label: 'Packages',
                                    content: <PackageManage packages={data?.package} />,
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
