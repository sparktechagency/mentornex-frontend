import Image from 'next/image';
import AboutHeroImage from '@/assets/images/about/about.jpg';

const AboutHero = () => {
      return (
            <div className="w-full rounded-md relative mb-[5rem] ">
                  <div className="w-full h-[600px]">
                        <Image
                              height={600}
                              width={1200}
                              src={AboutHeroImage.src}
                              alt="About Us Image"
                              className="w-full h-full rounded-md object-cover"
                        />
                  </div>
                  <div className="rounded-md absolute bottom-[-8rem]  left-1/2 transform -translate-x-1/2 w-full max-w-[986px] z-10 bg-white p-6 shadow-md">
                        <h2 className="text-2xl font-semibold text-title mb-4">About us</h2>
                        <p className=" text-subtitle leading-6">
                              At MENTORNEX, we are reimagining mentorship to create a world where knowledge flows freely and connections
                              empower growth. We believe that knowledge and experience should be shared, nurtured, and celebrated. The idea
                              for this platform was born from a simple but powerful realization: many people struggle to find the right
                              guidance, whether it’s for professional development or personal growth. Drawing from our own experiences,
                              we’ve seen firsthand how a lack of mentorship and direction can hinder progress, limit potential, and create
                              unnecessary obstacles.
                        </p>
                        <br />
                        <p className=" text-subtitle leading-6">
                              At MENTORNEX, we are reimagining mentorship to create a world where knowledge flows freely and connections We
                              wanted to build a space where mentors can share their wisdom, and mentees can find the support and insight
                              they need to grow and succeed in their personal and professional lives. Our mission is to create a seamless
                              and enriching experience that benefits both mentors and mentees, ensuring that the process is efficient,
                              meaningful, and impactful for everyone involved.
                        </p>
                  </div>
            </div>
      );
};

export default AboutHero;
