'use client';
import { motion } from 'framer-motion';
import Image1 from '@/assets/images/img1.svg';
import Image2 from '@/assets/images/img2.svg';
import Image from 'next/image';

const HowItWorks = () => {
      return (
            <div className="bg-[#FFFDF8] py-16">
                  <div className="md:container overflow-x-hidden mx-auto flex flex-col items-center space-y-8">
                        {/* First Image Animation */}
                        <motion.div
                              className="w-[120%] md:w-full flex justify-start"
                              initial={{ x: '-100px', opacity: 0 }}
                              whileInView={{ x: 0, opacity: 1 }}
                              transition={{ duration: 1 }}
                              viewport={{ once: true }}
                        >
                              <Image src={Image1} alt="img1" />
                        </motion.div>

                        {/* Second Image Animation */}
                        <motion.div
                              style={{
                                    marginTop: '-0px',
                              }}
                              className="w-full flex justify-end "
                              initial={{ x: '100px', opacity: 0 }}
                              whileInView={{ x: 0, opacity: 1 }}
                              transition={{ duration: 1 }}
                              viewport={{ once: true }}
                        >
                              <Image src={Image2} alt="img2" />
                        </motion.div>
                  </div>
            </div>
      );
};

export default HowItWorks;
