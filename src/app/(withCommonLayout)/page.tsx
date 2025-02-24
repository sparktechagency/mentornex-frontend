import ContactSection from '@/components/pages/home/ContactSection';
import FAQSection from '@/components/pages/home/FAQSection';
import HeroSection from '@/components/pages/home/HeroSection';
import HowItWorks from '@/components/pages/home/HowItWorks';
import IndustrySection from '@/components/pages/home/IndustrySection';
import MentorshipFeature from '@/components/pages/home/MentorshipFeatures';
import Testimonial from '@/components/pages/home/Testimonial';
import TopMentors from '@/components/pages/home/TopMentors';

const HomePage = () => {
      return (
            <div>
                  <HeroSection />
                  <HowItWorks />
                  <IndustrySection />
                  <TopMentors />
                  <Testimonial />
                  <MentorshipFeature />
                  <FAQSection />
                  <ContactSection />
            </div>
      );
};

export default HomePage;
