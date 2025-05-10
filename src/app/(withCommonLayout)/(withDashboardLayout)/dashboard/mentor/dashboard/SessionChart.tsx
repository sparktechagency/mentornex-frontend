'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGetMentorSessionRateQuery } from '@/redux/features/mentor/mentorApi';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const SessionChart = () => {
      const [year, setYear] = React.useState(dayjs().year());
      const { data: sessionRate } = useGetMentorSessionRateQuery([
            {
                  name: 'year',
                  value: year,
            },
      ]);
      // Map API data to chart format
      const chartData =
            sessionRate?.data?.map((item: any) => ({
                  month: item.month.slice(0, 3), // e.g., "January" → "Jan"
                  subscription: item.package,
                  payPerSession: item.payPerSession,
            })) || [];

      return (
            <div className="p-4 my-4 bg-white drop-shadow rounded-md">
                  <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">Session</h3>
                        <DatePicker
                              onChange={(e) => setYear(e.year())}
                              defaultValue={dayjs()}
                              allowClear={false}
                              picker="year"
                              className="rounded-md border-gray-300"
                        />
                  </div>

                  <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis />
                              <Tooltip />
                              <Legend verticalAlign="top" />
                              <Bar dataKey="subscription" fill="#FF6F3C" name="Subscription" />
                              <Bar dataKey="payPerSession" fill="#FCB013" name="Pay-Per-Session" />
                        </BarChart>
                  </ResponsiveContainer>
            </div>
      );
};

export default SessionChart;
