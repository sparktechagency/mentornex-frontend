import { Button } from 'antd';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import { BsMessenger, BsStarFill } from 'react-icons/bs';
import { FaRegCalendarDays } from 'react-icons/fa6';
import { IoBriefcaseOutline } from 'react-icons/io5';
import { PiChatsCircle, PiMapPinLight } from 'react-icons/pi';
type TMentor = {
      id: number;
      name: string;
      image: string;
      role: string;
      experience: string;
      startingPrice: string;
      rating: number;
      topRated: boolean;
};
const MentorBookCard = ({ mentor }: { mentor: TMentor }) => {
      return (
            <div>
                  <div key={mentor.id}>
                        <div className="bg-white rounded-xl p-2">
                              <div className="relative">
                                    <Image
                                          width={300}
                                          height={300}
                                          src={mentor.image}
                                          alt={mentor.name}
                                          className="w-full h-64 object-cover rounded-xl"
                                    />
                                    <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                                          <Heart size={20} className=" text-gray-600" />
                                    </button>
                                    <div className="absolute bottom-4 left-4 bg-black/70 px-2 py-1 rounded-md">
                                          <div className="flex items-center gap-1">
                                                <span className="text-white font-semibold">{mentor.rating}</span>
                                                <BsStarFill className="w-4 h-4 text-yellow-500" />
                                          </div>
                                    </div>
                                    <div className="absolute top-4 left-4 bg-white px-2 py-1 rounded">
                                          <div className="flex items-center gap-1">
                                                <p className="font-semibold text-title">{mentor.topRated ? 'Top Rated' : ''}</p>
                                          </div>
                                    </div>
                              </div>

                              {/* Content */}
                              <div className="p-2">
                                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{mentor.name}</h3>
                                    <div className="flex items-center gap-2 mb-3">
                                          <IoBriefcaseOutline size={20} className=" text-gray-500" />
                                          <span className="text-gray-600">Product Designer at Toptaal</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-3">
                                          <PiMapPinLight size={20} className=" text-gray-500" />
                                          <span className="text-gray-600">{'USA'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-4">
                                          <PiChatsCircle size={20} className=" text-gray-500" />
                                          <span className="text-gray-600">Active now</span>
                                          <span className="inline-block size-2 bg-green-500 rounded-full"></span>
                                    </div>
                              </div>
                              <div>
                                    <Button
                                          href={`/mentors/${mentor.id}`}
                                          style={{ width: '100%' }}
                                          icon={<FaRegCalendarDays size={20} />}
                                          type="primary"
                                    >
                                          Book Now
                                    </Button>

                                    <Button
                                          href="/chat/3"
                                          // type="primary"
                                          style={{
                                                width: '100%',
                                                marginTop: '10px',
                                                backgroundColor: 'transparent',
                                                color: '#FF6F3C',
                                                border: '2px solid #FF6F3C',
                                          }}
                                          icon={<BsMessenger size={20} />}
                                          variant="outlined"
                                    >
                                          Send Message
                                    </Button>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default MentorBookCard;
