'use client';
import React from 'react';

import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

import Logo from '@/assets/images/logo-footer.svg';
import Link from 'next/link';
import Image from 'next/image';

const socialLinks = [
      { Icon: Facebook, href: '#' },
      { Icon: Twitter, href: '#' },
      { Icon: Instagram, href: '#' },
      { Icon: Linkedin, href: '#' },
];

const linkSections = [
      {
            title: 'Quick Links',
            links: [
                  { label: 'Browse Mentor', href: '/signup' },
                  { label: 'Become Mentee', href: '/signup' },
                  { label: 'About Us', href: '/about-us' },
                  { label: 'Contact Us', href: '/contact-us' },
            ],
      },
      {
            title: 'Important Links',
            links: [
                  { label: 'Faq', href: '/faqs' },
                  { label: 'Terms & Conditions', href: '/terms-and-conditions' },
                  { label: 'Privacy Policy', href: '/privacy-policy' },
                  { label: 'Blog', href: '/blogs' },
            ],
      },
];

export const Footer = () => {
      return (
            <footer className="">
                  <div className="">
                        <div className="bg-primary-500 py-20 text-white">
                              <div className=" container grid grid-cols-1 md:grid-cols-4 gap-8">
                                    {/* Logo and Description Section */}
                                    <div className="space-y-4">
                                          <div className="flex items-center gap-2">
                                                <Link href={'/'}>
                                                      <Image alt="Logo" src={Logo} width={131} height={30} />
                                                </Link>
                                          </div>
                                          <p className="">
                                                Mentronex is a platform that connects aspiring professionals with experienced mentors in the
                                                industry.
                                          </p>
                                    </div>

                                    {/* Links Section */}
                                    <div className="md:col-span-2">
                                          <div className="grid grid-cols-2 gap-8">
                                                {linkSections.map((section) => (
                                                      <div key={section.title}>
                                                            <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
                                                            <ul className="space-y-2">
                                                                  {section.links.map((link) => (
                                                                        <li key={link.label}>
                                                                              <a href={link.href} className=" transition-colors">
                                                                                    {link.label}
                                                                              </a>
                                                                        </li>
                                                                  ))}
                                                            </ul>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>

                                    {/* Subscribe Form Section */}
                                    <div>
                                          <div className="w-full space-y-3">
                                                <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
                                                <p>3556 Beech Street, San Francisco, California, CA 94108</p>
                                                <p>+1 315 369 5943</p>
                                                <p>mentornex@example.com</p>

                                                <div className="flex gap-4">
                                                      {socialLinks.map(({ Icon, href }, index) => (
                                                            <a
                                                                  key={index}
                                                                  href={href}
                                                                  className="w-8 h-8 flex items-center justify-center rounded border border-white/20 hover:bg-white/10 transition-colors"
                                                            >
                                                                  <Icon className="w-4 h-4" />
                                                            </a>
                                                      ))}
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                        <div className="bg-[#fd571c] py-6 text-white  ">
                              <div className="container text-center">
                                    <p>© {new Date().getFullYear()} Mentronex. All rights reserved</p>
                              </div>
                        </div>
                  </div>
            </footer>
      );
};
