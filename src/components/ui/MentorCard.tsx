'use client';
import { TMentor } from '@/redux/features/mentor/mentorApi';
import { useAddWishlistMutation, useGetWishlistQuery } from '@/redux/features/wishlist/wishlistApi';
import { useAppSelector } from '@/redux/hooks';
import { getImageUrl } from '@/utils/getImageUrl';
import { Button } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BsStarFill } from 'react-icons/bs';
import { FaCalendarDays } from 'react-icons/fa6';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { HiOutlineCurrencyDollar } from 'react-icons/hi2';
import { PiChatsCircle } from 'react-icons/pi';
import { toast } from 'react-toastify';

const MentorCard = ({ mentor }: { mentor: TMentor }) => {
      const [isWishList, setIsWishList] = useState(false);
      const { user } = useAppSelector((state) => state.auth);
      const [addWishList] = useAddWishlistMutation();
      const { data: myWishlist } = useGetWishlistQuery(undefined, {
            skip: !user,
      });

      useEffect(() => {
            const isWishListed = myWishlist?.some((wishListItem: { _id: string }) => wishListItem._id === mentor._id);
            setIsWishList(isWishListed);
      }, [myWishlist, mentor._id]);

      const handleWishList = async (id: string) => {
            if (!user) {
                  toast.error('Please login to add mentor to wishlist');
                  return;
            }
            try {
                  const res = await addWishList({ mentor_ids: [id] }).unwrap();
                  if (res.success) {
                        toast.success(res?.message || 'Mentor added to wishlist');
                  }
            } catch (error: any) {
                  toast.error(error?.data.message || 'Failed to add mentor to wishlist');
            }
      };
      return (
            <div>
                  <div className="bg-white rounded-xl p-2 mx-1 flex-grow h-full flex flex-col">
                        <div className="relative">
                              <Image
                                    width={300}
                                    height={300}
                                    src={getImageUrl(mentor?.image as string)}
                                    alt={mentor.name}
                                    className="w-full h-64 object-cover rounded-xl"
                              />
                              <button
                                    onClick={() => handleWishList(mentor._id)}
                                    className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                              >
                                    {isWishList ? <GoHeart size={24} className="text-yellow-400" /> : <GoHeartFill size={24} color="red" />}
                              </button>
                              {mentor.topRated && (
                                    <button className="absolute top-4 left-4 w-fit bg-white px-2 py-1  rounded-lg font-medium  flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                                          Top Rated
                                    </button>
                              )}
                              <div className="absolute bottom-4 left-4 bg-black/70 px-2 py-1 rounded-md">
                                    <div className="flex items-center gap-1">
                                          <BsStarFill className="w-4 h-4 text-yellow-500" />
                                          <span className="text-white">{mentor?.rating}</span>
                                    </div>
                              </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col p-2 flex-grow space-y-2">
                              <h3 className="font-semibold text-lg text-gray-900 mb-1">{mentor.name}</h3>
                              <p className="text-gray-500">{mentor?.bio || 'No bio available'}</p>

                              <div className="flex flex-wrap gap-2 min-h-[70px]">
                                    {mentor?.expertise?.map((topic, index) => (
                                          <div key={index} className="bg-primary-100 h-fit p-1 text-[#353535] rounded">
                                                <span className="text-gray-600">{topic}</span>
                                          </div>
                                    ))}
                              </div>

                              <div className="flex items-center gap-2 mb-4">
                                    <HiOutlineCurrencyDollar size={20} className=" text-gray-500" />
                                    <span className="text-gray-600">Starts from {mentor?.startingPrice || '0$'}</span>
                              </div>

                              <div className="flex items-center gap-2 mb-4">
                                    <PiChatsCircle size={20} className="text-gray-500" />
                                    <span className="text-gray-600">{mentor?.status ? 'Active now' : 'Inactive'}</span>
                                    <span
                                          className={
                                                mentor?.status
                                                      ? 'inline-block size-2 bg-green-500 rounded-full'
                                                      : 'inline-block size-2 bg-red-500 rounded-full'
                                          }
                                    ></span>
                              </div>
                        </div>

                        <div>
                              <Button
                                    href={`/mentors/${mentor?._id}`}
                                    style={{ width: '100%' }}
                                    icon={<FaCalendarDays size={20} />}
                                    type="primary"
                              >
                                    Book Now
                              </Button>
                        </div>
                  </div>
            </div>
      );
};

export default MentorCard;
