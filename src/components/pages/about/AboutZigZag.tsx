import Image from 'next/image';
import About1 from '@/assets/images/about/about1.png';
import About2 from '@/assets/images/about/about2.png';
import About3 from '@/assets/images/about/about3.png';

// Data Array
const sections = [
      {
            title: 'Our Mission',
            content: 'Our mission is to create a mentorship experience that is seamless, enriching, and meaningful. By fostering connections between mentors and mentees, we ensure that the process is impactful and transformative for both. MENTORNEX empowers people to grow, overcome obstacles, and thrive in their personal and professional lives.',
            image: About1,
            reverse: false,
      },
      {
            title: 'Our Story',
            content: 'MENTORNEX was founded by Paulus Misliura, who grew up in a small town in Lithuania. From an early age, Paulus was passionate about teaching and helping others grow. His own struggles in finding mentorship that understood his unique challenges inspired him to create this platform. MENTORNEX is the realization of his vision to provide others with the guidance and support he once sought, making mentorship accessible to everyone.',
            image: About2,
            reverse: true,
      },
      {
            title: 'Our Vision',
            content: 'We aim to build a global network of knowledge-sharing where every interaction fosters growth, learning, and transformation. At MENTORNEX, we are committed to breaking barriers, encouraging collaboration, and forming lasting connections. By creating an inclusive community where people from all backgrounds can access mentorship, we strive to help everyone achieve their goals and fulfill their potential.',
            image: About3,
            reverse: false,
      },
];

// Component
const AboutZigZag = () => {
      return (
            <div className="py-10">
                  <div className="">
                        {sections.map((section, index) => (
                              <div
                                    key={index}
                                    className={`flex flex-col md:flex-row ${
                                          section.reverse ? 'md:flex-row-reverse' : ''
                                    } items-center my-12`}
                              >
                                    <div className="w-full md:w-1/2 px-4">
                                          <Image
                                                src={section.image}
                                                alt={section.title}
                                                width={600}
                                                height={400}
                                                className="rounded-md object-cover"
                                          />
                                    </div>
                                    <div className="w-full md:w-1/2 px-4">
                                          <h2 className="text-2xl font-semibold text-[#000033] mb-4">{section.title}</h2>
                                          <p className="text-sm text-[#333333] leading-6">{section.content}</p>
                                    </div>
                              </div>
                        ))}
                  </div>
            </div>
      );
};

export default AboutZigZag;
