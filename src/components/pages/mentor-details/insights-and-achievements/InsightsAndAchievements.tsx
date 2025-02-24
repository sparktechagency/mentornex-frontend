import MentorStats from '../overview/MentorStats';

const InsightAndAchievements = () => {
      return (
            <div>
                  <MentorStats />
                  <div className="grid grid-cols-1  my-10 min-h-[400px]">
                        <video
                              className="rounded-xl object-cover h-[500px] w-full"
                              src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                              poster="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
                              controls
                        ></video>
                  </div>
            </div>
      );
};

export default InsightAndAchievements;
