import OverView from '@/components/pages/mentor-details/overview/OverView';
import ProfileInformation from '@/components/shared/ProfileInformation';
import CustomTab from '@/components/ui/CustomTab';
import ContentManagement from './ContentManagement';

const MentorProfile = () => {
      return (
            <div>
                  <CustomTab
                        border={false}
                        tabs={[
                              {
                                    key: 'overview',
                                    label: 'Overview',
                                    content: (
                                          <OverView
                                                mentor={{
                                                      name: 'John Doe',
                                                      image: 'https://images.unsplash.com/photo-1500677245951-45036119fbfb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                                                      about: 'John Doe is a software engineer with 10 years of experience in the field.',
                                                      video: 'https://www.youtube.com/watch?v=1234567890',
                                                      status: 'active',
                                                      topRated: true,
                                                      rating: 4.5,
                                                      totalSessionCount: 100,
                                                      repeatedUserCount: 50,
                                                      goalAchievingRate: 90,
                                                }}
                                          />
                                    ),
                              },
                              { key: 'profile', label: 'Profile', content: <ProfileInformation /> },
                              { key: 'content', label: 'Content', content: <ContentManagement /> },
                        ]}
                  />
            </div>
      );
};

export default MentorProfile;
