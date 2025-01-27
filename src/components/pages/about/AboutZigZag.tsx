import Image from 'next/image';
import About1 from '@/assets/images/about/about1.png';
import About2 from '@/assets/images/about/about2.png';
import About3 from '@/assets/images/about/about3.png';

// Data Array
const sections = [
      {
            title: 'Our Story',
            content: 'MENTORNEX was founded by Paulius Misiura, who was born in a small town in Lithuania. From an early age, Paulius was passionate about teaching and helping people grow. Despite his own aspirations, he often found it challenging to find guidance from someone who truly understood his unique struggles and experiences. This personal journey inspired him to create a platform that offers the support and understanding he once sought, ensuring that everyone can find the guidance they need to achieve their goals.',

            image: About3,
            reverse: false,
      },
      {
            title: 'Our Mission',
            content: 'We are committed to fostering an inclusive community where everyone, regardless of background or experience, has access to guidance that propels them forward. At MENTORNEX, we aim to break down barriers, encourage collaboration, and build lasting connections that drive progress and personal development.',

            image: About2,
            reverse: true,
      },

      {
            title: 'Our Vision',
            content: 'Our vision is simple but powerful: to create a global network of knowledge-sharing where every interaction is an opportunity for growth, learning, and transformation. We are dedicated to making MENTORNEX a platform that empowers, educates, and elevates everyone, helping them achieve their goals with the support of those who’ve walked the path before.',
            image: About1,
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
