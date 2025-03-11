import { TMentor } from '@/redux/features/mentor/mentorApi';
import MentorStats from './MentorStats';

const OverView = ({ mentor }: { mentor: TMentor }) => {
      return (
            <div>
                  <MentorStats mentor={mentor} />
                  <div className="grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-4 my-10 min-h-[400px]">
                        <div className="text-subtitle space-y-4">
                              <h1 className="text-title font-bold">About Description</h1>
                              <p>{mentor?.about || 'No description available  '}</p>
                        </div>
                        <div>
                              <video
                                    className="rounded-xl object-cover h-full w-full"
                                    src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                                    poster="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
                                    controls
                              ></video>
                        </div>
                  </div>
            </div>
      );
};

export default OverView;
