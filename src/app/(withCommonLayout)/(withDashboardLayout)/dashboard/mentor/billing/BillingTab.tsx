'use client';
import CustomTab from '@/components/ui/CustomTab';
import BillingTransactionTable from './BillingTransactionTable';
import BillingInformation from './BillingInformation';
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
