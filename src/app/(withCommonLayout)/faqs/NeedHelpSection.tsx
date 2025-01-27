import Image from 'next/image';

import SupportImage from '@/assets/images/about/about-men.svg';

const NeedHelpSection = () => {
      return (
            <div className=" flex flex-col md:flex-row container h-[310px] mb-10 w-full relative justify-between items-center  bg-gradient-image py-16 px-8 text-white  rounded-xl shadow-lg">
                  <div className="space-y-4  w-full  md:mx-20">
                        <h2 className=" w-full text-2xl font-semibold ">Need More Help?</h2>
                        <p>If you didn’t find the answer you were looking for, our support team is here to help!</p>
                        <p>Contact Support:</p>
                        <p>Email us at support@mentornex.com.</p>
                  </div>
                  <div className="md:absolute md:right-5 bottom-0">
                        <Image width={200} height={200} src={SupportImage} alt="support" />
                  </div>
            </div>
      );
};

export default NeedHelpSection;
