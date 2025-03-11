import { getImageUrl } from '@/utils/getImageUrl';
import MentorSocialLinks from '../pages/mentor-details/MentorSocialLinks';

const MentorDetailsBanner = ({ profile }: { profile: any }) => {
      return (
            <div>
                  <div
                        style={{
                              backgroundImage: `url(${getImageUrl(profile?.banner)})`,
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                              width: '100%',
                        }}
                        className="bg-cover relative bg-center bg-no-repeat h-[150px] md:h-[250px] w-full"
                  >
                        <MentorSocialLinks profile={profile!} />
                  </div>
            </div>
      );
};

export default MentorDetailsBanner;
