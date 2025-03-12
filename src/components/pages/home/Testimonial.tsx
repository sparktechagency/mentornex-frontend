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
            name: 'Samin Al Zaman',
            role: 'Student',
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
            content: 'I was really struggling with my math homework until I started working with Sihan. He is very patient and was able to break down the problems into smaller steps that I could understand. He is also very knowledgeable and was able to provide a lot of useful information. I would definitely recommend him to anyone who needs help with a math class.',
      },
      {
            id: 2,
            name: 'Rakibul Islam',
            role: 'Freelancer',
            image: 'https://randomuser.me/api/portraits/men/45.jpg',
            content: 'I was struggling to find a job in the tech industry until I started working with Rakibul. He is very knowledgeable and was able to provide a lot of useful information. He helped me improve my resume and cover letter, and also helped me practice for interviews. I would definitely recommend him to anyone who is looking for a job in the tech industry.',
      },
      {
            id: 3,
            name: 'Tawsif',
            role: 'Software Engineer',
            image: 'https://randomuser.me/api/portraits/men/56.jpg',
            content: 'I was really struggling with my software engineering skills until I started working with Tawsif. He is very patient and was able to break down the problems into smaller steps that I could understand. He is also very knowledgeable and was able to provide a lot of useful information. I would definitely recommend him to anyone who needs help with software engineering.',
      },
      {
            id: 4,
            name: 'Anika Rahman',
            role: 'Designer',
            image: 'https://randomuser.me/api/portraits/women/11.jpg',
            content: 'Working with Anika has been amazing! Her design skills are top-notch, and she really helped me refine my branding. She took the time to understand my vision and delivered exactly what I wanted. I highly recommend her for any design project.',
      },
      {
            id: 5,
            name: 'Abdul Kadir',
            role: 'Project Manager',
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
            content: 'Abdul is a great project manager. He helped organize my team and kept us on track throughout a challenging project. His communication and leadership skills are outstanding, and he always knows how to motivate the team to achieve their best results.',
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
                                          <div key={testimonial.id} className="p-4 bg-transparent ">
                                                <div className="relative  rounded-xl  overflow-hidden p-6 bg-white drop-shadow">
                                                      {/* Shape in the bottom-left corner */}
                                                      {/* <div className="absolute -z-10 -bottom-20 -left-20 size-[205px] bg-[#fff1ec]  rounded-full"></div> */}

                                                      <div className="space-y-6">
                                                            <p className="text-base font-normal leading-relaxed line-clamp-5">
                                                                  {testimonial.content}
                                                            </p>
                                                      </div>

                                                      <div className="flex items-center mt-6">
                                                            <Image
                                                                  height={100}
                                                                  width={100}
                                                                  className="size-[80px] rounded-full mr-4"
                                                                  src={testimonial.image}
                                                                  alt={testimonial.name}
                                                            />
                                                            <div className="flex flex-col">
                                                                  <h3 className="text-[20px]    p-2 font-bold">{testimonial.name}</h3>
                                                                  <p className="text-sm text-title  p-2  ">{testimonial.role}</p>
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
                              <Button href="/mentors" iconPosition="end" type="primary" icon={<MdOutlineArrowOutward size={20} />}>
                                    Find Your Mentor Now
                              </Button>
                        </div>
                  </div>
            </div>
      );
}

export default Testimonial;
