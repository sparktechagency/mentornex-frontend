import { useGetMenteeGeneralStatsQuery } from '@/redux/features/mentee/menteeApi';
import { useGetUserProfileQuery } from '@/redux/features/user/userApi';
import React from 'react';

const DashboardStats = () => {
      const { data: profile } = useGetUserProfileQuery([]);
      const { data: stats } = useGetMenteeGeneralStatsQuery([]);

      const data = [
            {
                  title: 'Active Mentor',
                  value: stats?.activeMentors || 0,

                  bgColor: 'bg-[#E4F6FE]',
                  textColor: 'text-green-500',
            },
            {
                  title: 'Total Active Subscription',
                  value: stats?.totalSubscription || 0,

                  bgColor: 'bg-[#FADEF27D]',
                  textColor: 'text-green-500',
            },
            {
                  title: 'Total Session Completed',
                  value: stats?.totalCompletedSession || 0,

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

export default DashboardStats;
