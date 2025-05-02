import MentorStats from './MentorStats';
import { TUser } from '@/redux/features/user/userApi';

const OverView = ({ mentor }: { mentor: Partial<TUser> }) => {
      return (
            <div>
                  <MentorStats mentor={mentor!} />
                  <div className="grid grid-cols-1 md:grid-cols-2 justify-between  gap-4 my-10 min-h-[400px]">
                        <div className="text-subtitle space-y-4">
                              <h1 className="text-title font-bold">About Description</h1>
                              <p>{mentor?.about || 'No description available  '}</p>
                        </div>
                        <div>
                              {mentor?.content && (
                                    <video className="rounded-xl object-cover h-full w-full" src={mentor?.content} controls></video>
                              )}
                        </div>
                  </div>
            </div>
      );
};

export default OverView;
