import Link from 'next/link';

const MentorSocialLinks = ({ socials }: { socials: any[] }) => {
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
