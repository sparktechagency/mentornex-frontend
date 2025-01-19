import HeroSection from '@/components/pages/home/HeroSection';
import Testimonial from '@/components/pages/home/Testimonial';
import TopMentors from '@/components/pages/home/TopMentors';
import React from 'react';

const HomePage = () => {
      return (
            <div>
                  <HeroSection />
                  <Testimonial />
                  <TopMentors />
            </div>
      );
};

export default HomePage;
