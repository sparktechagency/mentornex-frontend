'use client';
import { useGetMentorGeneralStatsQuery } from '@/redux/features/mentor/mentorApi';
import { useGetUserProfileQuery } from '@/redux/features/user/userApi';
import React from 'react';

const DashboardCards = () => {
      const { data: generalStats } = useGetMentorGeneralStatsQuery([]);
      const { data: profile } = useGetUserProfileQuery([]);
      const data = [
            {
                  title: 'Active Mentee',
                  value: generalStats?.totalMentee || 0,

                  bgColor: 'bg-[#E4F6FE]',
                  textColor: 'text-green-500',
            },
            {
                  title: 'Total Session',
                  value: generalStats?.totalSession || 0,

                  bgColor: 'bg-[#FADEF27D]',
                  textColor: 'text-green-500',
            },
            {
                  title: 'Total Earning',
                  value: generalStats?.totalEarning || 0,

                  bgColor: 'bg-[#E8FAE99E]',
                  textColor: 'text-green-500',
            },
      ];
      return (
            <div>
                  <div className="space-y-3 mb-2">
                        <h1>
                              Welcome back, <span className="font-bold">{profile?.name}</span>! 👋
                        </h1>
                        <p>We’re thrilled to have you here.</p>
                  </div>
                  <div className="flex space-x-4">
                        {data.map((item, index) => (
                              <div
                                    key={index}
                                    className={`w-full flex flex-col justify-center items-start h-32  p-4 rounded-lg ${item.bgColor}`}
                              >
                                    <h3 className="font-medium text-title">{item.title}</h3>
                                    <h1 className="text-2xl font-bold text-gray-800 mt-2">{item.value}</h1>
                              </div>
                        ))}
                  </div>
            </div>
      );
};

export default DashboardCards;
