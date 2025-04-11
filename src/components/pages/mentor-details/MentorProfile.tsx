'use client';
import { PiBriefcaseLight, PiGraduationCapLight } from 'react-icons/pi';
import MentorshipTabs from './MentorShipTab';
import MentorBookCard from '@/components/ui/MentorBookCard';
import MentorDetailsTab from './MentorDetailsTab';
import { useGetSingleMentorQuery } from '@/redux/features/mentor/mentorApi';
import MentorDetailsBanner from '@/components/shared/MentorDetailsBanner';

const MentorProfileDetails = ({ mentorId }: { mentorId: string }) => {
      const { data: mentor } = useGetSingleMentorQuery(mentorId);

      return (
            <div>
                  <MentorDetailsBanner profile={mentor} />

                  <div className="">
                        <div className="container relative">
                              <div className="flex  flex-col md:flex-row items-start  md:gap-10">
                                    <div className="w-full md:-mt-32   md:max-w-[300px] ">
                                          <MentorBookCard mentor={mentor} />
                                    </div>
                                    <div className="w-full">
                                          <MentorDetailsTab mentor={mentor} />
                                    </div>
                              </div>

                              <div className="my-10  grid-cols-12 grid gap-5">
                                    <div className="col-span-12 md:col-span-7  space-y-8 ">
                                          <div>
                                                <h1 className="text-xl font-bold text-title mb-4">Expertise</h1>
                                                <div className="bg-white custom-shadow rounded-lg p-6 flex flex-wrap gap-4">
                                                      {mentor?.expertise?.length ? (
                                                            mentor.expertise.map((item: string, index: string) => (
                                                                  <div key={index} className="border p-3 rounded-full">
                                                                        <h2>{item}</h2>
                                                                  </div>
                                                            ))
                                                      ) : (
                                                            <p className="text-gray-500">No expertise information available</p>
                                                      )}
                                                </div>
                                          </div>
                                          <div>
                                                <h1 className="text-xl font-bold text-title mb-4">Experiences</h1>
                                                <div className="bg-white  custom-shadow space-y-5 rounded-lg p-6 ">
                                                      <div className="flex items-center gap-5 pb-5">
                                                            <div className="size-[65px] bg-primary-100 rounded flex items-center justify-center">
                                                                  <PiBriefcaseLight color="#FF6F3C" size={40} />
                                                            </div>
                                                            <div>
                                                                  <h2 className="text-title font-semibold">
                                                                        {mentor?.job_title ? mentor?.job_title : 'N/A'}
                                                                  </h2>
                                                                  <div className="flex gap-4 items-center">
                                                                        <p>{mentor?.company_name ? mentor?.company_name : 'N/A'}</p>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                      {/* ))} */}
                                                </div>
                                          </div>
                                          <div>
                                                <h1 className="text-xl font-bold text-title mb-4">Education</h1>
                                                <div className="bg-white  custom-shadow space-y-5 rounded-lg p-6 ">
                                                      <div className="flex items-center gap-5 pb-5">
                                                            <div className="size-[65px] bg-primary-100 rounded flex items-center justify-center">
                                                                  <PiGraduationCapLight color="#FF6F3C" size={40} />
                                                            </div>
                                                            <div>
                                                                  <h2 className="text-title font-semibold">{mentor?.institution_name}</h2>
                                                                  <div className="flex gap-4 items-center">
                                                                        <p>{mentor?.education}</p>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-5">
                                          <MentorshipTabs />
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default MentorProfileDetails;
