import ContactSection from '@/components/pages/home/ContactSection';
import FAQSection from '@/components/pages/home/FAQSection';
import HeroSection from '@/components/pages/home/HeroSection';
import IndustrySection from '@/components/pages/home/IndustrySection';
import MentorshipFeature from '@/components/pages/home/MentorshipFeatures';
import Testimonial from '@/components/pages/home/Testimonial';
import TopMentors from '@/components/pages/home/TopMentors';
import React from 'react';

const HomePage = () => {
      return (
            <div>
                  <HeroSection />
                  <Testimonial />
                  <TopMentors />
                  <IndustrySection />
                  <MentorshipFeature />

                  <FAQSection />
                  <ContactSection />
            </div>
      );
};

export default HomePage;
