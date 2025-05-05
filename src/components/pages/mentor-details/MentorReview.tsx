'use client';

import { getImageUrl } from '@/utils/getImageUrl';
import { Rate } from 'antd';
import Image from 'next/image';

type TReview = {
      review: string;
      rate: number;
      createdAt: string;
      mentee_id: {
            name: string;
            image: string;
      };
};

const MentorReview = ({ reviews }: { reviews: TReview[] }) => {
      return (
            <div className="">
                  <div className=" mx-auto space-y-6">
                        <div className="space-y-4 h-[400px] overflow-y-scroll custom-scrollbar">
                              {reviews.map((review, index) => (
                                    <div key={index} className="border space-y-4 border-gray-200 p-4 rounded-lg">
                                          <div className="flex justify-between items-center">
                                                <div className="flex gap-2 items-center">
                                                      <Image
                                                            className="w-10 h-10 rounded-full"
                                                            src={getImageUrl(review?.mentee_id?.image)}
                                                            width={40}
                                                            height={40}
                                                            alt="mentor"
                                                      />
                                                      <span className="text-title text-lg font-medium">{review?.mentee_id?.name}</span>
                                                </div>
                                                <Rate
                                                      style={{
                                                            color: '#FF6F3C',
                                                      }}
                                                      allowHalf
                                                      value={review?.rate}
                                                      disabled
                                                />
                                          </div>

                                          <p className="text-gray-600 ">{review?.review}</p>
                                    </div>
                              ))}
                        </div>
                  </div>
            </div>
      );
};

export default MentorReview;
