import MentorCard from '@/components/ui/MentorCard';
import { mentors } from '@/const/constant';
import MentorSocialLinks from './MentorSocialLinks';
import MentorOverviewAndReview from './MentorOverviewAndReview';

const MentorProfileDetails = () => {
      return (
            <div>
                  <div className="bg-primary-100 h-[250px]">
                        <MentorSocialLinks />
                  </div>

                  <div className="container">
                        <div className="flex gap-10">
                              <div className="w-full max-w-[300px] -mt-[120px]">
                                    <MentorCard sendMessage={true} mentor={mentors[0]} />
                              </div>
                              <MentorOverviewAndReview />
                        </div>
                  </div>
            </div>
      );
};

export default MentorProfileDetails;
