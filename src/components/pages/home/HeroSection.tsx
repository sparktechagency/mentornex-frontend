'use client';

import React, { useRef } from 'react';
import { Avatar, Button } from 'antd';
import { MdOutlineArrowOutward } from 'react-icons/md';
import Image from 'next/image';
import Women1 from '@/assets/images/hero-section/women1.png';
import Women2 from '@/assets/images/hero-section/women2.png';
import { FaStar } from 'react-icons/fa6';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// Register any GSAP plugins
gsap.registerPlugin();

const HeroSection: React.FC = () => {
  // Create refs for animated elements
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
          duration: 1,
        },
      });

      // Heading animation
      tl.from(headingRef.current?.children || [], {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
      })
        // Description fade in
        .from(
          descriptionRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.1,
          },
          '-=0.4'
        )
        // Buttons slide in
        .from(
          buttonsRef.current,
          {
            x: -30,
            opacity: 0,
            duration: 0.5,
          },
          '-=0.3'
        )
        // Stats fade up
        .from(
          statsRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.1,
          },
          '-=0.2'
        )
        // Expert mentor card animation
        .from(
          '#expert-mentor',
          {
            y: -50,
            opacity: 0,
            scale: 0.9,
            duration: 0.1,
            ease: 'back.out(1.7)',
          },
          '-=0.4'
        )
        // Different category card animation
        .from(
          '#different-category',
          {
            y: 50,
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            ease: 'back.out(1.7)',
          },
          '-=0.3'
        )
        // Images scale in
        .from(
          '.hero-image',
          {
            scale: 0.8,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.6'
        );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="bg-gradient-to-r from-[#faf7f5] to-[#fcc2a380] min-h-[calc(100vh-96px)] py-10 flex items-center"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 ref={headingRef} className="text-4xl md:text-6xl font-bold">
              <span className="text-black inline-block will-change-transform">Mentorship</span>
              <br />
              <span className="text-[#FF6F3C] inline-block will-change-transform">Reimagined</span>
            </h1>

            <p
              ref={descriptionRef}
              className="text-gray-600 text-lg max-w-[600px] will-change-transform"
            >
              Discover the world&apos;s first mentorship platform for connecting people across every
              industry, where anyone can share knowledge, learn, and grow.
            </p>

            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
              <Button
                href={`/signup`}
                type="primary"
                className="bg-[#FF6F3C] hover:bg-[#ff855c] border-none will-change-transform"
                icon={<MdOutlineArrowOutward size={20} />}
              >
                Become a Mentor
              </Button>
              <Button
                href={`/signup`}
                style={{
                  border: '2px solid #FF6F3C',
                  color: '#FF6F3C',
                }}
                type="default"
                icon={<MdOutlineArrowOutward size={20} />}
                className="will-change-transform"
              >
                Become a Mentee
              </Button>
            </div>
            <div ref={statsRef} className="flex items-center gap-2 will-change-transform">
              <Avatar.Group size={40}>
                <Avatar src="https://randomuser.me/api/portraits/women/1.jpg" />
                <Avatar src="https://randomuser.me/api/portraits/men/1.jpg" />
                <Avatar src="https://randomuser.me/api/portraits/women/2.jpg" />
                <Avatar src="https://randomuser.me/api/portraits/men/2.jpg" />
                <Avatar src="https://randomuser.me/api/portraits/women/3.jpg" />
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
              <div
                id="expert-mentor"
                className="absolute z-10 flex items-center gap-2 top-[20%] -right-[40%] bg-white p-2 rounded-md shadow-lg will-change-transform"
              >
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
                className="hero-image w-[278.64px] h-[300px] md:h-[417.97px] rounded-lg shadow-lg will-change-transform"
              />
              <div className="flex justify-end mt-5">
                <div
                  id="different-category"
                  className="flex justify-start w-fit items-center gap-2 bg-white p-2 rounded-md shadow-lg will-change-transform"
                >
                  <h3 className="text-[#FF6F3C] text-4xl font-bold">300+</h3>
                  <p className="text-title font-semibold">
                    Different
                    <br /> Category
                  </p>
                </div>
              </div>
            </div>
            <div>
              <Image
                src={Women2.src}
                alt="Mentor"
                width={300}
                height={400}
                className="hero-image h-[300px] md:h-[425.35px] mt-40 w-[278.64px] rounded-lg shadow-lg will-change-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
