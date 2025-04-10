import { TUser } from '@/redux/features/user/userApi';
import MentorStats from '../overview/MentorStats';

const InsightAndAchievements = ({ mentor }: { mentor: Partial<TUser> }) => {
      return (
            <div>
                  <MentorStats />
                  <div className="grid grid-cols-1  my-10 min-h-[400px]">
                        <video className="rounded-xl object-cover h-[500px] w-full" src={mentor?.content} controls></video>
                  </div>
            </div>
      );
};

export default InsightAndAchievements;
