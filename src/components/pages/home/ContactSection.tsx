'use client';

import React from 'react';
import { Button, Avatar } from 'antd';
import { MdOutlineArrowOutward } from 'react-icons/md';
import Profile1 from '@/assets/images/hero-section/profile1.svg';
import Profile2 from '@/assets/images/hero-section/profile2.svg';
import Profile3 from '@/assets/images/hero-section/profile3.svg';

const ContactSection = () => {
      return (
            <div className="container bg-[#FFF5F4] rounded-xl  my-20 py-20 flex flex-col items-center text-center space-y-6">
                  <div className="flex -space-x-4">
                        <Avatar src={Profile1.src} size={60} alt="User 1" className="ring-2 ring-white" />
                        <Avatar src={Profile2.src} size={60} alt="User 2" className="ring-2 ring-white" />
                        <Avatar src={Profile3.src} size={60} alt="User 3" className="ring-2 ring-white" />
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-title">Still Have Questions?</h2>

                  <p className="text-paragraph text-sm max-w-xl">
                        Can&apos;t find the answer you’re looking for? Not sure which Mentor is right for you? <br />
                        Please communicate to our friendly team.
                  </p>

                  <Button iconPosition="end" icon={<MdOutlineArrowOutward />} type="primary" size="large" href="/contact-us">
                        Contact Us
                  </Button>
            </div>
      );
};

export default ContactSection;
