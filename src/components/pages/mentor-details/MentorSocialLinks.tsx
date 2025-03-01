import { TUser } from '@/redux/features/user/userApi';
import Link from 'next/link';
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';

const MentorSocialLinks = ({ profile }: { profile: TUser }) => {
      const socials = [
            {
                  id: 1,
                  name: 'Facebook',
                  icon: <BsFacebook />,
                  link: profile?.facebook_url || '',
            },
            {
                  id: 2,
                  name: 'Twitter',
                  icon: <BsTwitter />,
                  link: profile?.twitter_url || '',
            },
            {
                  id: 3,
                  name: 'Linkedin',
                  icon: <BsLinkedin />,
                  link: profile?.linkedin_url || '',
            },
            {
                  id: 4,
                  name: 'Instagram',
                  icon: <BsInstagram />,
                  link: profile?.instagram_url || '',
            },
      ].filter((social) => social.link);

      return (
            <div className="container flex justify-end items-end h-full gap-4">
                  {socials.map((social) => (
                        <div
                              className=" mb-4 drop-shadow-md text-center flex justify-center items-center bg-white size-10 rounded-full"
                              key={social.id}
                        >
                              <Link href={social.link} className="text-2xl text-title">
                                    {social.icon}
                              </Link>
                        </div>
                  ))}
            </div>
      );
};

export default MentorSocialLinks;
