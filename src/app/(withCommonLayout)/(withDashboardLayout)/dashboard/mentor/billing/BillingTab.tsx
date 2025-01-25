'use client';

import CustomTab from '@/components/ui/CustomTab';
import BillingInformation from './BillingInformation';
import BillingTransactionTable from './BillingTransactionTable';

const BillingTab = () => {
      return (
            <div className="">
                  <h1 className="text-2xl font-bold mb-2">Tasks & Notes</h1>
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
