'use client';

import React from 'react';
import { Avatar, Button } from 'antd';
import { MdOutlineArrowOutward } from 'react-icons/md';
import Image from 'next/image';
import Women1 from '@/assets/images/hero-section/women1.png';
import Women2 from '@/assets/images/hero-section/women2.png';
import { FaStar } from 'react-icons/fa6';

const HeroSection = () => {
      return (
            <div className="bg-gradient-to-r from-[#faf7f5]  to-[#fcc2a380] min-h-[calc(100vh-96px)] py-10 flex items-center">
                  <div className="container mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center items-center">
                              {/* Left Content */}
                              <div className="space-y-6">
                                    <h1 className="text-4xl md:text-6xl font-bold">
                                          <span className="text-black">Modern And</span>
                                          <br />
                                          <span className="text-[#FF6F3C]">Innovative Learning</span>
                                    </h1>

                                    <p className="text-gray-600 text-lg max-w-[600px]">
                                          Discover the world&apos;s first mentorship platform for connecting people across every industry,
                                          where anyone can share knowledge, learn, and grow.
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                          <Button
                                                iconPosition="end"
                                                type="primary"
                                                className="bg-[#FF6F3C] hover:bg-[#ff855c] border-none"
                                                icon={<MdOutlineArrowOutward size={20} />}
                                          >
                                                Become a Mentor
                                          </Button>
                                          <Button
                                                style={{
                                                      border: '2px solid #FF6F3C',
                                                      color: '#FF6F3C',
                                                }}
                                                type="default"
                                                iconPosition="end"
                                                icon={<MdOutlineArrowOutward size={20} />}
                                          >
                                                Become a Mentee
                                          </Button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                          <Avatar.Group size={40}>
                                                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=female" />
                                                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=male" />
                                                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=female" />
                                                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=male" />
                                                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=female" />
                                          </Avatar.Group>
                                          <div>
                                                <div className="flex items-center">
                                                      {[1, 2, 3, 4, 5].map((star) => (
                                                            <span key={star} className="text-[#FF6F3C] text-lg">
                                                                  <FaStar />
                                                            </span>
                                                      ))}
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                      Over <span className="font-bold">2k+</span> Active User&apos;s
                                                </p>
                                          </div>
                                    </div>
                              </div>

                              {/* Right Content - Images */}
                              <div className="relative flex gap-8 h-[600px]">
                                    <div className="relative">
                                          <div className="absolute  flex items-center gap-2 top-[10%] -right-[40%] bg-white p-2 rounded-md">
                                                <h3 className="text-[#FF6F3C] text-4xl font-bold">300+</h3>
                                                <p className="text-title font-semibold">
                                                      Expert <br /> Mentor
                                                </p>
                                          </div>
                                          <Image
                                                src={Women1.src}
                                                alt="Mentor"
                                                width={400}
                                                height={500}
                                                className="w-[278.64px] h-[300px] md:h-[417.97px] rounded-lg shadow-lg"
                                          />
                                          <div className="flex justify-end mt-5">
                                                <div className=" flex justify-start  w-fit items-center gap-2 top-[10%] -right-[40%] bg-white p-2 rounded-md">
                                                      <h3 className="text-[#FF6F3C] text-4xl font-bold">300+</h3>
                                                      <p className="text-title font-semibold">
                                                            Different
                                                            <br /> Category
                                                      </p>
                                                </div>
                                          </div>
                                    </div>
                                    <div className="">
                                          <Image
                                                src={Women2.src}
                                                alt="Mentor"
                                                width={300}
                                                height={400}
                                                className="h-[300px] md:h-[425.35px] mt-40 w-[278.64px] rounded-lg shadow-lg"
                                          />
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default HeroSection;
