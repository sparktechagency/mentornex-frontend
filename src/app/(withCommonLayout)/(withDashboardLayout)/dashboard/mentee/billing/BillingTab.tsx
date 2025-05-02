'use client';
import CustomTab from '@/components/ui/CustomTab';
import BillingTransactionTable from '../../mentor/billing/BillingTransactionTable';
const BillingTab = () => {
      return (
            <div className="">
                  <CustomTab
                        tabs={[{ key: 'transaction', label: 'Transaction', content: <BillingTransactionTable /> }]}
                        defaultActiveKey="transaction"
                  />
            </div>
      );
};

export default BillingTab;
