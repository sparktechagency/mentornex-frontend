import { useCreateChatMutation } from '@/redux/features/chatlist/chatlistApi';
import { TMentor } from '@/redux/features/mentor/mentorApi';
import { useAddWishlistMutation, useGetWishlistQuery } from '@/redux/features/wishlist/wishlistApi';
import { useAppSelector } from '@/redux/hooks';
import { getImageUrl } from '@/utils/getImageUrl';
import { Button } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsMessenger, BsStarFill } from 'react-icons/bs';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { IoBriefcaseOutline } from 'react-icons/io5';
import { PiChatsCircle, PiMapPinLight } from 'react-icons/pi';
import { toast } from 'react-toastify';

const MentorBookCard = ({ mentor }: { mentor: TMentor }) => {
      const router = useRouter();
      const [isWishList, setIsWishList] = useState(false);
      const { user } = useAppSelector((state) => state.auth);
      const [addWishList] = useAddWishlistMutation();
      const [createChat] = useCreateChatMutation();
      const { data: myWishlist } = useGetWishlistQuery(undefined, {
            skip: !user,
      });

      useEffect(() => {
            const isWishListed = myWishlist?.some((wishListItem: { _id: string }) => wishListItem._id === mentor?._id);
            setIsWishList(isWishListed);
      }, [myWishlist, mentor?._id]);

      const handleAddWishList = async (id: string) => {
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

      const handleCreateChat = async () => {
            if (!user) {
                  toast.error('Please login to create chat');
                  return;
            }
            try {
                  const res = await createChat({ id: mentor?._id }).unwrap();
                  if (res.success) {
                        toast.success(res?.message || 'Chat created successfully');
                        router.push(`/chat`);
                  }
            } catch (error: any) {
                  toast.error(error?.data.message || 'Failed to create chat');
            }
      };
      return (
            <div>
                  <div key={mentor?._id}>
                        <div className="bg-white relative z-10 rounded-xl border p-2">
                              <div className="relative">
                                    <Image
                                          width={300}
                                          height={300}
                                          src={getImageUrl((mentor?.image as string) || '')}
                                          alt={'mentor'}
                                          className="w-full h-64 object-cover rounded-xl"
                                    />
                                    <button
                                          onClick={() => handleAddWishList(mentor?._id)}
                                          className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                                    >
                                          {isWishList ? (
                                                <GoHeartFill size={24} color="red" />
                                          ) : (
                                                <GoHeart size={24} className="text-yellow-400" />
                                          )}
                                    </button>
                                    <div className="absolute bottom-4 left-4 bg-black/70 px-2 py-1 rounded-md">
                                          <div className="flex items-center gap-1">
                                                <span className="text-white font-semibold">{mentor?.rating || 0}</span>
                                                <BsStarFill className="w-4 h-4 text-yellow-500" />
                                          </div>
                                    </div>
                                    <div className="absolute top-4 left-4 bg-white px-2 py-1 rounded">
                                          <div className="flex items-center gap-1">
                                                <p className="font-semibold text-title">{mentor?.topRated ? 'Top Rated' : ''}</p>
                                          </div>
                                    </div>
                              </div>

                              {/* Content */}
                              <div className="p-2">
                                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{mentor?.name}</h3>
                                    <div className="flex items-center gap-2 mb-3">
                                          <IoBriefcaseOutline size={20} className=" text-gray-500" />
                                          <span className="text-gray-600">
                                                {mentor?.job_title || 'N/A'} at {mentor?.company_name}
                                          </span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-3">
                                          <PiMapPinLight size={20} className=" text-gray-500" />
                                          <span className="text-gray-600 capitalize">{mentor?.country || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-4">
                                          <PiChatsCircle size={20} className=" text-gray-500" />
                                          <span className="text-gray-600">
                                                {mentor?.status === 'active' ? 'Active now' : 'Inactive now'}
                                          </span>
                                          <span className="inline-block size-2 bg-green-500 rounded-full"></span>
                                    </div>
                              </div>
                              <div>
                                    <Button
                                          onClick={handleCreateChat}
                                          // type="primary"
                                          style={{
                                                width: '100%',
                                                marginTop: '10px',
                                                backgroundColor: 'transparent',
                                                color: '#FF6F3C',
                                                border: '2px solid #FF6F3C',
                                          }}
                                          icon={<BsMessenger size={20} />}
                                          variant="outlined"
                                    >
                                          Send Message
                                    </Button>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default MentorBookCard;
