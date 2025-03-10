import { TMentor } from '@/redux/features/mentor/mentorApi';
import { getImageUrl } from '@/utils/getImageUrl';
import { Button } from 'antd';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import { BsStarFill } from 'react-icons/bs';
// import { CiMedal } from 'react-icons/ci';
import { FaCalendarDays } from 'react-icons/fa6';
import { HiOutlineCurrencyDollar } from 'react-icons/hi2';
// import { IoBriefcaseOutline } from 'react-icons/io5';
import { PiChatsCircle } from 'react-icons/pi';

const MentorCard = ({ mentor }: { mentor: TMentor }) => {
      return (
            <div>
                  <div className="bg-white rounded-xl p-2 mx-1 flex-grow h-full flex flex-col">
                        <div className="relative">
                              <Image
                                    width={300}
                                    height={300}
                                    src={getImageUrl(mentor?.image as string)}
                                    alt={mentor.name}
                                    className="w-full h-64 object-cover rounded-xl"
                              />
                              <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                                    <Heart size={20} className="text-gray-600" />
                              </button>
                              {mentor.topRated && (
                                    <button className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"></button>
                              )}
                              <div className="absolute bottom-4 left-4 bg-black/70 px-2 py-1 rounded-md">
                                    <div className="flex items-center gap-1">
                                          <BsStarFill className="w-4 h-4 text-yellow-500" />
                                          <span className="text-white">{mentor?.rating}</span>
                                    </div>
                              </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col p-2 flex-grow space-y-2">
                              <h3 className="font-semibold text-lg text-gray-900 mb-1">{mentor.name}</h3>
                              <p className="text-gray-500">{mentor?.bio || 'No bio available'}</p>

                              <div className="flex flex-wrap gap-2">
                                    {mentor?.expertise?.map((topic, index) => (
                                          <div key={index} className="bg-primary-100 p-1 text-[#353535] rounded">
                                                <span className="text-gray-600">{topic}</span>
                                          </div>
                                    ))}
                              </div>

                              <div className="flex items-center gap-2 mb-4">
                                    <HiOutlineCurrencyDollar size={20} className=" text-gray-500" />
                                    <span className="text-gray-600">Starts from {mentor?.startingPrice || '0$'}</span>
                              </div>

                              <div className="flex items-center gap-2 mb-4">
                                    <PiChatsCircle size={20} className="text-gray-500" />
                                    <span className="text-gray-600">{mentor?.status ? 'Active now' : 'Inactive'}</span>
                                    <span
                                          className={
                                                mentor?.status
                                                      ? 'inline-block size-2 bg-green-500 rounded-full'
                                                      : 'inline-block size-2 bg-red-500 rounded-full'
                                          }
                                    ></span>
                              </div>
                        </div>

                        <div>
                              <Button
                                    href={`/mentors/${mentor?._id}`}
                                    style={{ width: '100%' }}
                                    icon={<FaCalendarDays size={20} />}
                                    type="primary"
                              >
                                    Book Now
                              </Button>
                        </div>
                  </div>
            </div>
      );
};

export default MentorCard;
