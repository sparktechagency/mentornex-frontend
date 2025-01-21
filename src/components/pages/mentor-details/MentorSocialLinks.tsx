import Link from 'next/link';
import { BsFacebook, BsTwitter, BsLinkedin, BsInstagram, BsYoutube } from 'react-icons/bs';

const MentorSocialLinks = () => {
      const socials = [
            {
                  id: 1,
                  name: 'Facebook',
                  icon: <BsFacebook />,
                  link: '',
            },
            {
                  id: 2,
                  name: 'Twitter',
                  icon: <BsTwitter />,
                  link: '',
            },
            {
                  id: 3,
                  name: 'Linkedin',
                  icon: <BsLinkedin />,
                  link: '',
            },
            {
                  id: 4,
                  name: 'Instagram',
                  icon: <BsInstagram />,
                  link: '',
            },
            {
                  id: 5,
                  name: 'Youtube',
                  icon: <BsYoutube />,
                  link: '',
            },
      ];
      return (
            <div className="container flex justify-end items-end h-full gap-4">
                  {socials.map((social) => (
                        <div className=" mb-2 text-center flex justify-center items-center bg-white h-12 w-12 rounded-full" key={social.id}>
                              <Link href={social.link} className="text-2xl text-title">
                                    {social.icon}
                              </Link>
                        </div>
                  ))}
            </div>
      );
};

export default MentorSocialLinks;
