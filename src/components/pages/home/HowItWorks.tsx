'use client';
import Image1 from '@/assets/images/how-it-works/1.png';
import Image2 from '@/assets/images/how-it-works/2.png';
import Image3 from '@/assets/images/how-it-works/3.png';
import Image from 'next/image';

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
      return (
            <div className="bg-[#FFFDF8] py-16">
                  <div className="md:container overflow-x-hidden mx-auto flex flex-col items-center space-y-8">
                        <h1 className="text-2xl md:text-4xl  font-bold text-center text-title mb-3">How it works ?</h1>
                        <p className="text-center text-paragraph mb-16">
                              Looking for guidance from expert mentors? Check out how it works!
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                              {stepData.map((step, index) => (
                                    <div
                                          key={index}
                                          className="flex text-center border p-3 rounded-lg flex-col w-[387px] h-[387px]  items-center space-x-8 space-y-8 md:space-y-0"
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
