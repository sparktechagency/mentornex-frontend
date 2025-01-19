'use client';
import React from 'react';
import { Button, Carousel } from 'antd';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import Image from 'next/image';
import { BsStarFill } from 'react-icons/bs';
import { IoBriefcaseOutline } from 'react-icons/io5';
import { CiMedal } from 'react-icons/ci';
import { HiOutlineCurrencyDollar, HiOutlineUser } from 'react-icons/hi';

export const mentors = [
      {
            id: 1,
            name: 'Dianne Russell',
            role: 'Product Designer',
            experience: '08 Years Experience',
            rating: 4.8,
            startingPrice: '30$',
            topRated: true,
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300&h=300',
      },
      {
            id: 2,
            name: 'James Cooper',
            role: 'UX Designer',
            experience: '06 Years Experience',
            rating: 4.9,
            startingPrice: '25$',
            topRated: false,

            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300',
      },
      {
            id: 3,
            name: 'Sarah Chen',
            role: 'UI Designer',
            experience: '05 Years Experience',
            rating: 4.7,
            startingPrice: '28$',
            topRated: false,
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300&h=300',
      },
      {
            id: 4,
            name: 'Michael Davis',
            role: 'Product Designer',
            experience: '10 Years Experience',
            rating: 5.0,
            startingPrice: '35$',
            topRated: true,
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&h=300',
      },
];
function TopMentors() {
      const carouselRef = React.useRef<any>();

      const next = () => carouselRef.current?.next();
      const previous = () => carouselRef.current?.prev();

      return (
            <div className="  bg-primary-100 py-40 flex flex-col items-center px-4">
                  <div className="container  mx-auto">
                        <h1 className="text-4xl font-bold text-center text-title mb-3">Top Mentors of the Month</h1>
                        <p className="text-center text-paragraph mb-16">Meet the Top Mentors of the Month from Various Industries.</p>

                        <div className="relative">
                              <Carousel
                                    responsive={[
                                          {
                                                breakpoint: 768,
                                                settings: {
                                                      slidesToShow: 1,
                                                      slidesToScroll: 1,
                                                },
                                          },
                                    ]}
                                    ref={carouselRef}
                                    dots={false}
                                    slidesToShow={4}
                                    slidesToScroll={1}
                                    autoplay
                                    className="mx-12"
                              >
                                    {mentors.map((mentor) => (
                                          <div key={mentor.id} className="px-2">
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
                                                                        <p className="font-semibold text-title">
                                                                              {mentor.topRated ? 'Top Rated' : ''}
                                                                        </p>
                                                                  </div>
                                                            </div>
                                                      </div>

                                                      {/* Content */}
                                                      <div className="p-5">
                                                            <h3 className="font-semibold text-lg text-gray-900 mb-1">{mentor.name}</h3>
                                                            <div className="flex items-center gap-2 mb-3">
                                                                  <IoBriefcaseOutline size={20} className=" text-gray-500" />
                                                                  <span className="text-gray-600">{mentor.role}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 mb-3">
                                                                  <CiMedal size={20} className=" text-gray-500" />
                                                                  <span className="text-gray-600">{mentor.experience}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 mb-4">
                                                                  <HiOutlineCurrencyDollar size={20} className=" text-gray-500" />
                                                                  <span className="text-gray-600">Starts from {mentor.startingPrice}</span>
                                                            </div>

                                                            <Button
                                                                  style={{ width: '100%' }}
                                                                  icon={<HiOutlineUser size={20} />}
                                                                  type="primary"
                                                            >
                                                                  View Profile
                                                            </Button>
                                                      </div>
                                                </div>
                                          </div>
                                    ))}
                              </Carousel>

                              {/* Navigation Buttons */}
                              <button
                                    onClick={previous}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary text-white rounded-full shadow-lg flex items-center justify-center  transition-colors"
                              >
                                    <ChevronLeft className="w-6 h-6" />
                              </button>
                              <button
                                    onClick={next}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary text-white rounded-full shadow-lg flex items-center justify-center  transition-colors"
                              >
                                    <ChevronRight className="w-6 h-6" />
                              </button>
                        </div>
                  </div>
            </div>
      );
}

export default TopMentors;
