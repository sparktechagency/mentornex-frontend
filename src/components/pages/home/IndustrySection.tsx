'use client';
import React from 'react';
import { Button, Carousel, Input } from 'antd';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MdOutlineArrowOutward } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';

const cardData = [
      {
            title: 'Programming',
            mentorsAvailable: 10,
            image: 'https://cdn.pixabay.com/photo/2024/05/27/03/34/brain-8789959_640.jpg',
      },
      {
            title: 'Artificial Intelligence',
            mentorsAvailable: 10,
            image: 'https://cdn.pixabay.com/photo/2017/05/30/11/17/heart-2356621_640.png',
      },
      {
            title: 'Design & Creative',
            mentorsAvailable: 10,
            image: 'https://cdn.pixabay.com/photo/2024/06/20/03/24/ai-generated-8841092_640.jpg',
      },
      {
            title: 'Data Science',
            mentorsAvailable: 10,
            image: 'https://cdn.pixabay.com/photo/2019/12/20/06/24/transformation-4707719_1280.jpg',
      },
];

function IndustrySection() {
      const carouselRef = React.useRef<any>();

      const next = () => carouselRef.current?.next();
      const previous = () => carouselRef.current?.prev();

      return (
            <div className="  bg-primary-100/30 py-40 flex flex-col items-center px-4">
                  <div className="container  mx-auto">
                        <h1 className="text-4xl font-bold text-center text-title mb-3">What Is Your Industry?</h1>
                        <p className="text-center text-paragraph mb-16">
                              Forge connections with industry leaders and experts who can elevate your career and unlock your full
                              potential.
                        </p>
                        <div className="w-full md:w-[616px] mx-auto my-10">
                              <Input
                                    style={{ borderRadius: '10x' }}
                                    suffix={
                                          <div>
                                                <Button
                                                      style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                      }}
                                                      iconPosition="end"
                                                      type="primary"
                                                      icon={<BsSearch size={20} />}
                                                >
                                                      Search
                                                </Button>
                                          </div>
                                    }
                                    placeholder="Search mentors by skills, industry, or topics"
                              />
                        </div>

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
                                    {cardData.map((card) => (
                                          <div key={card.title} className="px-4">
                                                <div
                                                      style={{
                                                            backgroundImage: `url('${card.image}')`,
                                                            backgroundSize: 'cover',
                                                            backgroundPosition: 'center',
                                                            backgroundRepeat: 'no-repeat',
                                                            backgroundBlendMode: 'multiply',
                                                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                                      }}
                                                      className=" rounded-lg text-white  p-6 h-[350px] "
                                                >
                                                      <div className="flex flex-col justify-end items-start h-full">
                                                            <h2 className="text-xl font-bold ">{card.title}</h2>
                                                            <p>{card.mentorsAvailable} Mentors Available</p>

                                                            <div className="">
                                                                  <p className="flex items-center gap-2 text-[#F6BF2E]">
                                                                        Browse Experts
                                                                        <MdOutlineArrowOutward size={20} />
                                                                  </p>
                                                            </div>
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

                        {/* CTA Button */}
                        <div className=" flex justify-center items-center mt-12">
                              <Button iconPosition="end" type="primary" icon={<MdOutlineArrowOutward size={20} />}>
                                    Explore All
                              </Button>
                        </div>
                  </div>
            </div>
      );
}

export default IndustrySection;
