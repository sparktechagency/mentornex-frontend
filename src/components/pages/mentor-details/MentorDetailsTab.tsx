'use client';
import MentorReview from './MentorReview';
import CustomTab from '@/components/ui/CustomTab';
import OverView from './overview/OverView';
import InsightsAndAchievements from './insights-and-achievements/InsightsAndAchievements';
import { TMentor } from '@/redux/features/mentor/mentorApi';
import PremiumContent from './PremiumContent';

const MentorDetailsTab = ({ mentor }: { mentor: TMentor }) => {
      return (
            <div>
                  <div className="mt-5">
                        <CustomTab
                              border={false}
                              tabs={[
                                    { key: 'overview', label: 'Overview', content: <OverView mentor={mentor!} /> },
                                    {
                                          key: 'insights',
                                          label: 'Insights & Achievements',
                                          content: <InsightsAndAchievements />,
                                    },
                                    { key: 'reviews', label: 'Reviews', content: <MentorReview /> },
                                    { key: 'content', label: 'Premium Content', content: <PremiumContent /> },
                              ]}
                        />
                  </div>
            </div>
      );
};

export default MentorDetailsTab;
