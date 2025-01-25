'use client';

import CustomTab from '@/components/ui/CustomTab';
import BillingInformation from './BillingInformation';
import BillingTransactionTable from './BillingTransactionTable';

const BillingTab = () => {
      return (
            <div className="">
                  <CustomTab
                        tabs={[
                              { key: 'billing', label: 'Billing Information', content: <BillingInformation /> },
                              { key: 'transaction', label: 'Transaction', content: <BillingTransactionTable /> },
                        ]}
                        defaultActiveKey="billing"
                  />
            </div>
      );
};

export default BillingTab;
