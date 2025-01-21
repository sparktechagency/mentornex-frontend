import MentorCard from '@/components/ui/MentorCard';
import { mentors } from '@/const/constant';
import MentorSocialLinks from './MentorSocialLinks';
import MentorOverviewAndReview from './MentorOverviewAndReview';
import { PiBriefcaseLight, PiGraduationCapLight } from 'react-icons/pi';
import MentorshipTabs from './MentorShipTab';

const MentorProfileDetails = () => {
      const experiences = [
            {
                  id: 1,
                  title: 'Product Designer',
                  company: 'Google',
                  duration: 'Nov 2022 - Present',
            },
            {
                  id: 2,
                  title: 'Product Designer',
                  company: 'Google',
                  duration: 'Nov 2022 - Present',
            },
      ];
      const educations = [
            {
                  id: 1,
                  degree: 'Bachelor of Science',
                  school: 'University of California, Berkeley',
                  duration: '2012 - 2016',
            },

            {
                  id: 2,
                  degree: 'Bachelor of Science',
                  school: 'University of California, Berkeley',
                  duration: '2012 - 2016',
            },
      ];

      return (
            <div>
                  <div className="bg-primary-100 h-[250px]">
                        <MentorSocialLinks />
                  </div>

                  <div className="">
                        <div className="container">
                              <div className="flex gap-10">
                                    <div className="w-full max-w-[300px] -mt-[120px]">
                                          <MentorCard sendMessage={true} mentor={mentors[0]} />
                                    </div>
                                    <MentorOverviewAndReview />
                              </div>

                              <div className="my-10  grid-cols-12 grid gap-5">
                                    <div className="col-span-7  space-y-8 ">
                                          <div>
                                                <h1 className="text-xl font-bold text-title mb-6">Expertise</h1>
                                                <div className="bg-white drop-shadow-lg border  rounded-xl p-6 flex flex-wrap gap-4">
                                                      {['Product Designer', 'Graphic Designer', 'UI Designer', 'Web Designer'].map(
                                                            (item, index) => (
                                                                  <div key={index} className="border p-3 rounded-full">
                                                                        <h2>{item}</h2>
                                                                  </div>
                                                            )
                                                      )}
                                                </div>
                                          </div>
                                          <div>
                                                <h1 className="text-xl font-bold text-title mb-6">Experiences</h1>
                                                <div className="bg-white drop-shadow-lg space-y-5 rounded-xl p-6 ">
                                                      {experiences.map((item, index) => (
                                                            <div className="flex items-center gap-5 pb-5" key={index}>
                                                                  <div className="size-[65px] bg-primary-100 rounded flex items-center justify-center">
                                                                        <PiBriefcaseLight color="#FF6F3C" size={40} />
                                                                  </div>
                                                                  <div>
                                                                        <h2 className="text-title font-semibold">{item.title}</h2>
                                                                        <div className="flex gap-4 items-center">
                                                                              <p>{item.company}</p>
                                                                              <p>{item.duration}</p>
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      ))}
                                                </div>
                                          </div>
                                          <div>
                                                <h1 className="text-xl font-bold text-title mb-6">Education</h1>
                                                <div className="bg-white drop-shadow-lg space-y-5 rounded-xl p-6 ">
                                                      {educations.map((item, index) => (
                                                            <div className="flex items-center gap-5 pb-5" key={index}>
                                                                  <div className="size-[65px] bg-primary-100 rounded flex items-center justify-center">
                                                                        <PiGraduationCapLight color="#FF6F3C" size={40} />
                                                                  </div>
                                                                  <div>
                                                                        <h2 className="text-title font-semibold">{item.school}</h2>
                                                                        <div className="flex gap-4 items-center">
                                                                              <p>{item.degree}</p>
                                                                              <p>({item.duration})</p>
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      ))}
                                                </div>
                                          </div>
                                    </div>
                                    <div className="col-span-5">
                                          <MentorshipTabs />
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default MentorProfileDetails;
