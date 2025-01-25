'use client';
import CustomTab from '@/components/ui/CustomTab';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';

const Settings = () => {
      return (
            <div>
                  <CustomTab
                        tabs={[
                              { key: 'change-password', label: 'Change Password', content: <ChangePassword /> },
                              { key: 'account', label: 'Account', content: <DeleteAccount /> },
                        ]}
                        defaultActiveKey="change-password"
                  />
            </div>
      );
};

export default Settings;
