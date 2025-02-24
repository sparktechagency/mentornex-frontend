'use client';
import React from 'react';
import { Button } from 'antd';

import { MdOutlineArrowOutward } from 'react-icons/md';
import BusinessIcon from '@/assets/images/industry/bussiness.png';
import CSIcon from '@/assets/images/industry/computer.png';
import DesignIcon from '@/assets/images/industry/design.png';
import EnglishIcon from '@/assets/images/industry/lang.png';
import MarketingIcon from '@/assets/images/industry/marketing.png';
import MathsIcon from '@/assets/images/industry/math.png';
import PersonalIcon from '@/assets/images/industry/personal-developement.png';
import ProgrammingIcon from '@/assets/images/industry/programming.png';
import FundamentalIcon from '@/assets/images/industry/f-m.png';
import Image, { StaticImageData } from 'next/image';

interface IndustryCard {
      title: string;
      mentorsAvailable: number;
      icon: StaticImageData;
}

const cardData: IndustryCard[] = [
      {
            title: 'Business & Finance',
            mentorsAvailable: 10,
            icon: BusinessIcon,
      },
      {
            title: 'Computer Science',
            mentorsAvailable: 10,
            icon: CSIcon,
      },
      {
            title: 'Design',
            mentorsAvailable: 10,
            icon: DesignIcon,
      },
      {
            title: 'English Learning',
            mentorsAvailable: 10,
            icon: EnglishIcon,
      },
      {
            title: 'Fundamental Marketing',
            mentorsAvailable: 10,
            icon: FundamentalIcon,
      },
      {
            title: 'Geometry & Maths',
            mentorsAvailable: 10,
            icon: MathsIcon,
      },
      {
            title: 'Marketing',
            mentorsAvailable: 10,
            icon: MarketingIcon,
      },
      {
            title: 'Personal Development',
            mentorsAvailable: 10,
            icon: PersonalIcon,
      },
      {
            title: 'Programming',
            mentorsAvailable: 10,
            icon: ProgrammingIcon,
      },
];

const IndustrySection: React.FC = () => {
      return (
            <div className="bg-[#fffdf8] py-20 flex flex-col items-center px-4">
                  <div className="container mx-auto">
                        <h1 className="text-2xl md:text-4xl font-bold text-center text-title mb-3">What Is Your Industry?</h1>
                        <p className="text-center text-paragraph mb-16">
                              Forge connections with industry leaders and experts who can elevate your career and unlock your full
                              potential.
                        </p>
                        {/* <div className="w-full md:w-[616px] mx-auto my-10">
                              <Input
                                    style={{ borderRadius: '10px', height: '48px' }}
                                    suffix={
                                          <Button
                                                style={{
                                                      display: 'flex',
                                                      alignItems: 'center',
                                                      justifyContent: 'center',
                                                      height: '40px',
                                                }}
                                                type="primary"
                                                icon={<BsSearch size={20} />}
                                          >
                                                Search
                                          </Button>
                                    }
                                    placeholder="Search mentors by skills, industry, or topics"
                              />
                        </div> */}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {cardData.map((card) => (
                                    <div
                                          key={card.title}
                                          className="bg-white p-4 border rounded-lg flex items-center gap-4 cursor-pointer transition-shadow"
                                    >
                                          <div className="w-12 h-12 bg-[#FF6F3C]/10 rounded-lg flex items-center justify-center">
                                                <Image
                                                      width={50}
                                                      height={50}
                                                      src={card.icon.src}
                                                      alt={card.title}
                                                      className="w-[50px] h-[50px]"
                                                />
                                          </div>
                                          <div>
                                                <h3 className="text-lg font-semibold text-title">{card.title}</h3>
                                                <p className="text-sm text-paragraph">{card.mentorsAvailable} Mentor available</p>
                                          </div>
                                    </div>
                              ))}
                        </div>

                        {/* CTA Button */}
                        <div className="flex justify-center items-center mt-12">
                              <Button type="primary" icon={<MdOutlineArrowOutward size={20} />} className="bg-[#FF6F3C] hover:bg-[#ff855c]">
                                    Explore All
                              </Button>
                        </div>
                  </div>
            </div>
      );
};

export default IndustrySection;
