'use client';
import MentorReview from './MentorReview';
import CustomTab from '@/components/ui/CustomTab';
import OverView from './overview/OverView';
import InsightsAndAchievements from './insights-and-achievements/InsightsAndAchievements';

const MentorDetailsTab = () => {
      return (
            <div>
                  <div className="mt-5">
                        <CustomTab
                              border={false}
                              tabs={[
                                    { key: 'overview', label: 'Overview', content: <OverView /> },
                                    {
                                          key: 'insights',
                                          label: 'Insights & Achievements',
                                          content: <InsightsAndAchievements />,
                                    },
                                    { key: 'reviews', label: 'Reviews', content: <MentorReview /> },
                              ]}
                        />
                  </div>
            </div>
      );
};

export default MentorDetailsTab;
