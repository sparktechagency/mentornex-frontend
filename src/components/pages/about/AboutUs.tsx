// import AboutHero from './AboutHero';
// import AboutZigZag from './AboutZigZag';
// import JoinSection from './JoinSection';

import AboutHero from '@/assets/images/about/about-new.png';
import Image from 'next/image';

const AboutUs = () => {
      return (
            <div className="bg-[#fffdf8]">
                  <div className="container  py-20">
                        {/* <AboutHero />
                  <AboutZigZag />
                  <JoinSection /> */}

                        <div className="">
                              <div className="  flex flex-col md:flex-row gap-8">
                                    {/* Left Column: Text */}
                                    <div className="md:w-1/2   space-y-8 text-subtitle  rounded-xl">
                                          <h2 className="text-3xl text-title font-semibold mb-4">About us</h2>
                                          <p className="  ">
                                                At <strong>MENTORNEX</strong>, we are reimagining mentorship to create a world where
                                                knowledge flows freely and connections empower growth. We believe that knowledge and
                                                experience should be shared, nurtured, and celebrated. The idea for this platform was born
                                                from a simple but powerful realization: many people struggle to find the right guidance,
                                                whether it’s for professional development or personal growth. Drawing from our own
                                                experiences, we’ve seen firsthand how a lack of mentorship and direction can hinder
                                                progress, limit potential, and create unnecessary obstacles.
                                          </p>
                                          <p className="  ">
                                                We wanted to build a space where mentors can share their wisdom, and mentees can find the
                                                support and insight they need to grow and succeed in their personal and professional lives.
                                                Our mission is to create a seamless and enriching experience that benefits both mentors and
                                                mentees, ensuring that the process is efficient, meaningful, and impactful for everyone
                                                involved.
                                          </p>
                                          <p className="  ">
                                                MENTORNEX was founded by Paulius Misliura, who was born in a small town in Lithuania. From
                                                an early age, Paulius was passionate about teaching and helping people grow. Despite his own
                                                aspirations, he often found it challenging to find guidance from someone who truly
                                                understood his unique struggles and experiences. This personal journey inspired him to
                                                create a platform that offers the support and understanding he once sought, ensuring that
                                                everyone can find the guidance they need to achieve their goals.
                                          </p>
                                          <p className="  ">
                                                We’re committed to fostering an inclusive community where everyone, regardless of background
                                                or experience, has access to guidance that propels them forward. At MENTORNEX, we aim to
                                                break down barriers, encourage collaboration, and build lasting connections that drive
                                                progress and personal development.
                                          </p>
                                          <p className="  ">
                                                Our vision is simple but powerful: to create a global network of knowledge-sharing where
                                                every interaction is an opportunity for growth, learning, and transformation. We’re
                                                dedicated to making MENTORNEX a platform where students, educators, and everyone, helping
                                                them achieve their goals with the support of those who’ve walked the path before.
                                          </p>
                                          <p className=" ">
                                                Join us on this journey. Whether you’re a mentor eager to make a difference or someone
                                                looking for guidance to shape your future — at MENTORNEX, you’ll find a community ready to
                                                support, inspire, and uplift. Let’s grow together.
                                          </p>
                                    </div>

                                    {/* Right Column: Image */}
                                    <div className="md:w-1/2 relative">
                                          <Image
                                                src={AboutHero.src}
                                                alt="About us Image"
                                                width={600}
                                                height={400}
                                                className="rounded-xl h-full w-full object-cover"
                                          />
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default AboutUs;
