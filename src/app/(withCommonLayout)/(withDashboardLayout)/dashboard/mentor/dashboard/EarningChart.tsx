'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useGetMentorEarningRateQuery } from '@/redux/features/mentor/mentorApi';

const EarningChart = () => {
      const [year, setYear] = React.useState(dayjs().year());
      const { data: earningRate } = useGetMentorEarningRateQuery([
            {
                  name: 'year',
                  value: year,
            },
      ]);

      const chartData =
            earningRate?.data?.map((item: any) => ({
                  month: item.month.slice(0, 3),
                  subscription: item.subscription,
                  payPerSession: item.payPerSession,
                  package: item.package,
            })) || [];

      return (
            <div className="p-4 my-4 bg-white drop-shadow rounded-md">
                  <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">Earning</h3>
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
                              <YAxis tickFormatter={(value) => `$${value}`} />
                              <Tooltip />
                              <Legend verticalAlign="top" />
                              <Bar dataKey="subscription" fill="#24A953" name="Subscription" />
                              <Bar dataKey="payPerSession" fill="#FCB013" name="Pay-Per-Session" />
                              <Bar dataKey="package" fill="#4287f5" name="Package" />
                        </BarChart>
                  </ResponsiveContainer>
            </div>
      );
};
export default EarningChart;
