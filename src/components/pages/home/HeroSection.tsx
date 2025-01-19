import React from 'react';
import { Button, Space } from 'antd';
import { MdOutlineArrowOutward } from 'react-icons/md';

import profile1 from '@/assets/images/hero-section/profile1.svg';
import profile2 from '@/assets/images/hero-section/profile2.svg';
import profile3 from '@/assets/images/hero-section/profile3.svg';
import profile4 from '@/assets/images/hero-section/profile4.svg';
import profile5 from '@/assets/images/hero-section/profile5.svg';
import Image from 'next/image';

const HeroSection = () => {
      const images = [
            { src: profile1, top: '10%', left: '20%', height: 100, width: 100 },
            { src: profile2, bottom: '10%', left: '20%', height: 100, width: 100 },
            { src: profile3, top: '35%', right: '18%', height: 100, width: 100 },
            { src: profile4, top: '20%', right: '30%', height: 60, width: 60 },
            { src: profile5, bottom: '10%', right: '18%', height: 100, width: 100 },
      ];

      return (
            <div className="bg-gradient-to-b from-primary-100 to-primary-200 min-h-[calc(100vh-96px)] flex flex-col justify-center items-center relative">
                  {/* Main Content */}
                  <div className="container text-center h-full justify-center items-center">
                        <div className="text-[#202124] flex gap-5 items-center text-center justify-center h-full">
                              <h1 className="text-[66px] font-bold uppercase">Connect</h1>
                              <p className="text-[30px] font-bold">X</p>
                              <h1 className="text-[66px] font-bold uppercase">Share</h1>
                              <p className="text-[30px] font-bold">X</p>
                              <h1 className="text-[66px] font-bold uppercase">Thrive</h1>
                        </div>

                        <div className="my-4">
                              <p className="text-paragraph w-full max-w-[1012px] mx-auto">
                                    Discover the world’s first mentorship platform for connecting people across every industry, where anyone
                                    can share knowledge, learn, and grow.
                              </p>

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

                        <div>
                              {images.map((image, index) => (
                                    <Image
                                          height={100}
                                          width={100}
                                          key={index}
                                          src={image.src}
                                          alt={`Profile ${index + 1}`}
                                          className="absolute hidden md:block w-[100px] h-[100px] rounded-full"
                                          style={{
                                                top: image.top,
                                                left: image.left,
                                                right: image.right,
                                                bottom: image.bottom,
                                                objectFit: 'cover',
                                                height: image.height,
                                                width: image.width,

                                                transform: 'translate(-50%, -50%)',
                                          }}
                                    />
                              ))}
                        </div>
                  </div>
            </div>
      );
};

export default HeroSection;
