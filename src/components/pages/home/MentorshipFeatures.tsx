'use client';
import React from 'react';

import Image from 'next/image';

// import Image1 from '@/assets/images/mentorship-feature/1.jpg';
// import Image2 from '@/assets/images/mentorship-feature/2.jpg';
// import Image3 from '@/assets/images/mentorship-feature/3.png';
// import Image4 from '@/assets/images/mentorship-feature/4.jpg';

import Image1 from '@/assets/images/industry/1.png';
import Image2 from '@/assets/images/industry/2.png';
import Image3 from '@/assets/images/industry/3.png';
import Image4 from '@/assets/images/industry/4.png';

import { Button, Space } from 'antd';
import { MdOutlineArrowOutward } from 'react-icons/md';

export const mentorShipFeatures = [
      {
            id: 1,
            name: 'Built-in Video Calls',
            description: 'Seamless, in-platform video calls for mentorship sessions—no external tools needed.',
            image: Image1,
      },
      {
            id: 2,
            name: 'Flexible Mentorship Options',
            description: 'Offer and access mentorship through subscriptions, one-time sessions, or free consultations.',
            image: Image2,
      },
      {
            id: 3,
            name: 'Community Hub',
            description: 'Engage with a vibrant community for discussions, insights, and opportunities to connect.',
            image: Image3,
      },
      {
            id: 4,
            name: 'Personalized Growth Paths',
            description: 'Track progress, set goals, and access tailored content to enhance your mentorship journey.',
            image: Image4,
      },
];
function MentorshipFeature() {
      return (
            <div className="  bg-primary-100 py-40 flex flex-col items-center px-4">
                  <div className="container  mx-auto">
                        <h1 className="text-4xl font-bold text-center text-title mb-3">Top Mentors of the Month</h1>
                        <p className="text-center text-paragraph mb-16">Meet the Top Mentors of the Month from Various Industries.</p>

                        <div>
                              <div className="mx-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-center">
                                    {mentorShipFeatures.map((mentor) => (
                                          <div key={mentor.id}>
                                                <div className="bg-white rounded-xl p-5 h-full  flex flex-col">
                                                      <div className="relative ">
                                                            <Image
                                                                  width={300}
                                                                  height={300}
                                                                  src={mentor.image}
                                                                  alt={mentor.name}
                                                                  className="w-full h-[120px] object-contain rounded-xl"
                                                            />
                                                      </div>
                                                      <div className="p-4 space-y-3">
                                                            <h1 className="font-semibold text-lg text-gray-900 mb-1">{mentor.name}</h1>
                                                            <p className="text-gray-600 text-sm">{mentor.description}</p>
                                                      </div>
                                                </div>
                                          </div>
                                    ))}
                              </div>

                              <div className="flex justify-center my-2">
                                    <Space className="my-4">
                                          <Button iconPosition="end" type="primary" icon={<MdOutlineArrowOutward size={20} />}>
                                                Become a Mentor
                                          </Button>
                                          <Button
                                                style={{
                                                      backgroundColor: 'transparent',
                                                      color: '#FF6F3C',
                                                      border: '2px solid #FF6F3C',
                                                }}
                                                iconPosition="end"
                                                type="primary"
                                                icon={<MdOutlineArrowOutward size={20} />}
                                          >
                                                Become a Mentee
                                          </Button>
                                    </Space>
                              </div>
                        </div>
                  </div>
            </div>
      );
}

export default MentorshipFeature;
