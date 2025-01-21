'use client';

import { Rate } from 'antd';

const reviews = [
      {
            name: 'Samin Al Zaman',
            rating: 4,
            message: 'He is very good at explaining things and is very patient. He is also very knowledgeable about his subject area and is able to provide a lot of useful information. I would definitely recommend him to anyone who needs help with a math or science class.',
      },
      {
            name: 'Sihan Tawsik',
            rating: 5,
            message: 'I was really struggling with my math homework until I started working with Sihan. He is very patient and was able to break down the problems into smaller steps that I could understand. He is also very knowledgeable and was able to provide a lot of useful information. I would definitely recommend him to anyone who needs help with a math class.',
      },
      {
            name: 'Rakibul Islam',
            rating: 4.5,
            message: 'Rakibul is a very good tutor. He is very patient and was able to break down the problems into smaller steps that I could understand. He is also very knowledgeable and was able to provide a lot of useful information. I would definitely recommend him to anyone who needs help with a math class.',
      },
      {
            name: 'Jannatul Ferdous',
            rating: 4.5,
            message: 'I was really struggling with my science homework until I started working with Jannatul. She is very patient and was able to break down the problems into smaller steps that I could understand. She is also very knowledgeable and was able to provide a lot of useful information. I would definitely recommend her to anyone who needs help with a science class.',
      },
      {
            name: 'Rafiul Islam',
            rating: 5,
            message: 'Rafiul is a very good tutor. He is very patient and was able to break down the problems into smaller steps that I could understand. He is also very knowledgeable and was able to provide a lot of useful information. I would definitely recommend him to anyone who needs help with a math class.',
      },
      {
            name: 'Tahmid Hossain',
            rating: 4,
            message: 'Tahmid is a very good tutor. He is very patient and was able to break down the problems into smaller steps that I could understand. He is also very knowledgeable and was able to provide a lot of useful information. I would definitely recommend him to anyone who needs help with a math class.',
      },
      {
            name: 'Asif Iqbal',
            rating: 4,
            message: 'Asif is a very good tutor. He is very patient and was able to break down the problems into smaller steps that I could understand. He is also very knowledgeable and was able to provide a lot of useful information. I would definitely recommend him to anyone who needs help with a math class.',
      },
      {
            name: 'Rizwanul Haque',
            rating: 4.5,
            message: 'Rizwanul is a very good tutor. He is very patient and was able to break down the problems into smaller steps that I could understand. He is also very knowledgeable and was able to provide a lot of useful information. I would definitely recommend him to anyone who needs help with a math class.',
      },
      {
            name: 'Sayeduzzaman',
            rating: 4,
            message: 'Sayeduzzaman is a very good tutor. He is very patient and was able to break down the problems into smaller steps that I could understand. He is also very knowledgeable and was able to provide a lot of useful information. I would definitely recommend him to anyone who needs help with a math class.',
      },
      {
            name: 'Mehedi Hassan',
            rating: 4.5,
            message: 'Mehedi is a very good tutor. He is very patient and was able to break down the problems into smaller steps that I could understand. He is also very knowledgeable and was able to provide a lot of useful information. I would definitely recommend him to anyone who needs help with a math class.',
      },
];

const MentorReview = () => {
      return (
            <div className="bg-gray-50 py-8 h-[500px] overflow-y-scroll custom-scrollbar">
                  <div className="max-w-3xl mx-auto space-y-6">
                        <div className="border border-primary p-4 rounded-lg">
                              <div className="flex items-center">
                                    <div className="text-4xl font-bold mr-4">4.4</div>
                                    <div>
                                          <Rate
                                                style={{
                                                      color: '#FF6F3C',
                                                }}
                                                allowHalf
                                                defaultValue={4.4}
                                                disabled
                                          />
                                          <p className="text-gray-600 text-sm">All Ratings (14)</p>
                                    </div>
                              </div>
                        </div>

                        <div className="space-y-4">
                              {reviews.map((review, index) => (
                                    <div key={index} className="border space-y-4 border-gray-200 p-4 rounded-lg">
                                          <div className="flex justify-between items-center">
                                                <span className="text-title text-lg font-medium">{review.name}</span>
                                                <Rate
                                                      style={{
                                                            color: '#FF6F3C',
                                                      }}
                                                      allowHalf
                                                      value={review.rating}
                                                      disabled
                                                />
                                          </div>

                                          <p className="text-gray-600 ">{review.message}</p>
                                    </div>
                              ))}
                        </div>
                  </div>
            </div>
      );
};

export default MentorReview;
