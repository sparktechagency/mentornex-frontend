'use client';
import MentorReview from './MentorReview';
import CustomTab from '@/components/ui/CustomTab';
import OverView from './overview/OverView';
import InsightsAndAchievements from './insights-and-achievements/InsightsAndAchievements';
import { TMentor, useGetMentorReviewsQuery } from '@/redux/features/mentor/mentorApi';
import PremiumContent from './PremiumContent';
import { useGetPremiumContentByMentorIdQuery } from '@/redux/features/content/contentApi';

const MentorDetailsTab = ({ mentor }: { mentor: TMentor }) => {
      const { data: reviews } = useGetMentorReviewsQuery(mentor?._id, { skip: !mentor });
      const { data: contents } = useGetPremiumContentByMentorIdQuery(mentor?._id, { skip: !mentor });

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
                                          content: <InsightsAndAchievements mentor={mentor!} />,
                                    },
                                    { key: 'reviews', label: 'Reviews', content: <MentorReview reviews={reviews} /> },
                                    { key: 'content', label: 'Premium Content', content: <PremiumContent contents={contents} /> },
                              ]}
                        />
                  </div>
            </div>
      );
};

export default MentorDetailsTab;
