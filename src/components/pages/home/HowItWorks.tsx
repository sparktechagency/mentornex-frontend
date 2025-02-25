'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image1 from '@/assets/images/how-it-works/1.png';
import Image2 from '@/assets/images/how-it-works/2.png';
import Image3 from '@/assets/images/how-it-works/3.png';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const stepData = [
      {
            title: 'Get Started',
            description: `Sign up and create your profile. Tell us what you want to learn or teach, and you're ready to begin!`,
            image: Image1,
      },
      {
            title: 'Find a Fit',
            description: `Browse through mentors or mentees and find the perfect match based on your interests and goals.`,
            image: Image2,
      },
      {
            title: 'Grow Together',
            description: `Engage in 1:1 sessions, share knowledge, and achieve your goals through continuous learning.`,
            image: Image3,
      },
];

const HowItWorks = () => {
      const sectionRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
            const section = sectionRef.current;
            if (section) {
                  const elements = section.querySelectorAll('.step');
                  gsap.set(elements, { y: 50, scale: 0.9, rotateY: 15 });

                  gsap.to(elements, {
                        y: 0,
                        scale: 1,
                        rotateY: 0,
                        duration: 1.5, // Increased duration for smoother animation
                        ease: 'power3.out', // Changed easing for smoother effect
                        stagger: 0.2, // Slightly reduced stagger for a more fluid sequence
                        scrollTrigger: {
                              trigger: section,
                              start: 'top 80%',
                              end: 'bottom 20%',
                              scrub: 0.5, // Added scrub for smoother scroll interaction
                              once: true,
                        },
                  });
            }
      }, []);

      return (
            <div ref={sectionRef} className="bg-[#FFFDF8] py-16 overflow-hidden">
                  <div className="md:container overflow-hidden mx-auto flex flex-col items-center space-y-8">
                        <h1 className="text-2xl md:text-4xl font-bold text-center text-title mb-3">How it works ?</h1>
                        <p className="text-center text-paragraph mb-16">
                              Looking for guidance from expert mentors? Check out how it works!
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                              {stepData.map((step, index) => (
                                    <div
                                          key={index}
                                          className="step flex text-center border p-3 rounded-lg flex-col w-[387px] h-[387px] items-center space-x-8 space-y-8 md:space-y-0 shadow-lg bg-white"
                                    >
                                          <Image
                                                className="w-[324px] object-contain h-[216px] m-auto"
                                                src={step.image}
                                                alt={step.title}
                                                width={500}
                                                height={500}
                                          />
                                          <div className="space-y-4">
                                                <h1 className="text-xl font-bold text-title">{step.title}</h1>
                                                <p className="text-paragraph text-sm">{step.description}</p>
                                          </div>
                                    </div>
                              ))}
                        </div>
                  </div>
            </div>
      );
};

export default HowItWorks;
