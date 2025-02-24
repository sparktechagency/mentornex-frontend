import MentorStats from './MentorStats';

const OverView = () => {
      return (
            <div>
                  <MentorStats />
                  <div className="grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-4 my-10 min-h-[400px]">
                        <div className="text-subtitle space-y-4">
                              <p>
                                    I’m a product designer with over 8 years of experience crafting intuitive and user-focused digital
                                    experiences. Currently a part of the Toptal network, I specialize in creating designs that blend
                                    functionality and aesthetics, ensuring products resonate with users while meeting business goals.
                              </p>

                              <p>
                                    My expertise includes UI/UX design, interaction design, and prototyping for web and mobile platforms.
                                    I’ve collaborated with startups and established brands to transform complex ideas into seamless,
                                    engaging user experiences.
                              </p>
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
