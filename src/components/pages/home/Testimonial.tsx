'use client';
import React from 'react';
import { Button, Carousel } from 'antd';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { MdOutlineArrowOutward } from 'react-icons/md';

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
            <div className="  bg-primary-100/30 py-40 flex flex-col items-center px-4">
                  <div className="container  mx-auto">
                        <h1 className="text-4xl font-bold text-center text-title mb-3">What Our Users Are Saying</h1>
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
                                    slidesToShow={3}
                                    slidesToScroll={1}
                                    autoplay
                                    className="mx-12"
                              >
                                    {testimonials.map((testimonial) => (
                                          <div key={testimonial.id} className="px-4">
                                                <div className="bg-white rounded-lg p-6">
                                                      <div className="flex gap-1 mb-4">
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                  <svg
                                                                        key={star}
                                                                        className="w-5 h-5 text-yellow-400"
                                                                        fill="currentColor"
                                                                        viewBox="0 0 20 20"
                                                                  >
                                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                  </svg>
                                                            ))}
                                                      </div>

                                                      <p className="text-gray-700 mb-6">{testimonial.content}</p>

                                                      <div className="flex items-center">
                                                            <Image
                                                                  height={100}
                                                                  width={100}
                                                                  src={testimonial.image}
                                                                  alt={testimonial.name}
                                                                  className="w-12 h-12 rounded-full object-cover mr-4"
                                                            />
                                                            <div>
                                                                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                                                                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
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
