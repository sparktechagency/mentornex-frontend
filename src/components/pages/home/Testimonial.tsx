'use client';
import React from 'react';
import { Button, Carousel } from 'antd';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { MdOutlineArrowOutward } from 'react-icons/md';
import { IoMdStar } from 'react-icons/io';

// Testimonial data
const testimonials = [
      {
            id: 1,
            name: 'Brittany Garcia',
            role: 'Digital Marketer',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100',
            content: 'Lorem ipsum dolor sit amet consectetur. Nunc tristique neque tempor nisl feugiat lectus in. Placerat pharetra eleifend integer at. Nunc nunc eu arcu amet faucibus.',
      },
      {
            id: 2,
            name: 'Mack Stark',
            role: 'UI/UX Designer',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100',
            content: 'Lorem ipsum dolor sit amet consectetur. Nunc tristique neque tempor nisl feugiat lectus in. Placerat pharetra eleifend integer at. Nunc nunc eu arcu amet faucibus.',
      },
      {
            id: 3,
            name: 'Kavin Ryan',
            role: 'Web Developer',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100',
            content: 'Lorem ipsum dolor sit amet consectetur. Nunc tristique neque tempor nisl feugiat lectus in. Placerat pharetra eleifend integer at. Nunc nunc eu arcu amet faucibus.',
      },
];

function Testimonial() {
      const carouselRef = React.useRef<any>();

      const next = () => carouselRef.current?.next();
      const previous = () => carouselRef.current?.prev();

      return (
            <div className="  bg-primary-100/30 py-40 flex flex-col items-center md:px-4">
                  <div className="container  mx-auto">
                        <h1 className="text-2xl md:text-4xl font-bold text-center text-title mb-3">What Our Users Are Saying</h1>
                        <p className="text-center text-paragraph mb-16">
                              Hear from mentees who have transformed their careers with the help of expert mentors.
                        </p>

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
                                    slidesToShow={2}
                                    slidesToScroll={1}
                                    autoplay
                                    className="md:mx-12"
                              >
                                    {testimonials.map((testimonial) => (
                                          <div key={testimonial.id} className="p-4 bg-white ">
                                                <div className="relative  rounded-xl  overflow-hidden p-6 bg-white shadow-lg">
                                                      {/* Shape in the bottom-left corner */}
                                                      <div className="absolute -z-10 -bottom-20 -left-20 size-[205px] bg-[#fff1ec]  rounded-full"></div>

                                                      <div className="space-y-6">
                                                            <p className="text-base font-normal leading-relaxed line-clamp-5">
                                                                  Lorem ipsum dolor sit amet consectetur. Quis vestibulum turpis egestas
                                                                  porta curabitur. Porttitor leo duis fringilla sed id. Volutpat a potenti
                                                                  amet eu. Et felis volutpat elementum diam volutpat cursus lacus. Ut
                                                                  accumsan egestas at nunc gravida amet nunc. Sed habitasse vestibulum
                                                                  ullamcorper pharetra.
                                                            </p>
                                                      </div>

                                                      <div className="flex items-center mt-6">
                                                            <Image
                                                                  height={100}
                                                                  width={100}
                                                                  className="size-[100px] md:size-[135px] rounded-full mr-4"
                                                                  src="https://randomuser.me/api/portraits/men/22.jpg"
                                                                  alt="Victoria Wotton"
                                                            />
                                                            <div className="flex flex-col">
                                                                  <h3 className="text-[20px] rounded-tl-xl text-[#000000] bg-[#E8E8E8]   p-2  rounded-tr-xl font-bold">
                                                                        Victoria Wotton
                                                                  </h3>
                                                                  <p className="text-sm text-title bg-[#F2F2F2] p-2 rounded-bl-xl ">
                                                                        Fementum Odio Co.
                                                                  </p>
                                                                  <div className="flex text-yellow-400 mt-1">
                                                                        <IoMdStar size={20} />
                                                                        <IoMdStar size={20} />
                                                                        <IoMdStar size={20} />
                                                                        <IoMdStar size={20} />
                                                                        <IoMdStar size={20} />
                                                                  </div>
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
                                    Find Your Mentor Now
                              </Button>
                        </div>
                  </div>
            </div>
      );
}

export default Testimonial;
