import Image from 'next/image';
import AboutHeroImage from '@/assets/images/about/about-banner.jpg';

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
                  <div className="rounded-md absolute bottom-[-5rem]  left-1/2 transform -translate-x-1/2 w-full max-w-[986px] z-10 bg-white p-6 shadow-md">
                        <h2 className="text-2xl font-semibold text-title mb-4">About us</h2>
                        <p className=" text-subtitle leading-6">
                              At MENTORNEX, we believe that knowledge and experience should be shared, nurtured, and celebrated. Our
                              platform was created from a realization that many individuals struggle to find the right guidance for
                              professional development or personal growth. We are dedicated to bridging that gap, providing a space where
                              mentors can share their wisdom, and mentees can find the support they need to unlock their potential and
                              achieve success.
                        </p>
                  </div>
            </div>
      );
};

export default AboutHero;
