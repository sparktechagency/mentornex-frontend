'use client';
import React from 'react';
import { Carousel } from 'antd';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MentorCard from '@/components/ui/MentorCard';
import { TMentor, useGetAllMentorsQuery } from '@/redux/features/mentor/mentorApi';

function TopMentors() {
      const { data: mentorsData } = useGetAllMentorsQuery([{ name: 'topRated', value: true }]);
      const carouselRef = React.useRef<any>();

      const next = () => carouselRef.current?.next();
      const previous = () => carouselRef.current?.prev();

      return (
            <div className="  bg-primary-100 py-40 flex flex-col items-center md:px-4">
                  <div className="container  mx-auto">
                        <h1 className="text-2xl md:text-4xl  font-bold text-center text-title mb-3">Explore Mentors</h1>
                        <p className="text-center text-paragraph mb-16">Meet the Top Mentors of the Month from Various Industries</p>

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
                                    autoplay={false}
                                    className="md:mx-12"
                              >
                                    {mentorsData?.mentors?.map((mentor: TMentor) => (
                                          <MentorCard mentor={mentor} key={mentor._id} />
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
