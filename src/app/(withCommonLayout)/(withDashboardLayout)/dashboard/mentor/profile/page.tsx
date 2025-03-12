'use client';
import OverView from '@/components/pages/mentor-details/overview/OverView';
import ProfileInformation from '@/components/shared/ProfileInformation';
import CustomTab from '@/components/ui/CustomTab';
import ContentManagement from './ContentManagement';
import { useGetUserProfileQuery } from '@/redux/features/user/userApi';

const MentorProfile = () => {
      const { data: profile } = useGetUserProfileQuery([]);

      return (
            <div>
                  <CustomTab
                        border={false}
                        tabs={[
                              {
                                    key: 'overview',
                                    label: 'Overview',
                                    content: <OverView mentor={profile!} />,
                              },
                              { key: 'profile', label: 'Profile', content: <ProfileInformation /> },
                              { key: 'content', label: 'Content', content: <ContentManagement /> },
                        ]}
                  />
            </div>
      );
};

export default MentorProfile;
