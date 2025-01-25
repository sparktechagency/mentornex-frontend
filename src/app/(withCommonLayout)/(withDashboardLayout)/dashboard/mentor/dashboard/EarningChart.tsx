'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const data = [
      { month: 'Jan', subscription: 5000, payPerSession: 200 },
      { month: 'Feb', subscription: 8000, payPerSession: 100 },
      { month: 'Mar', subscription: 12000, payPerSession: 1500 },
      { month: 'Apr', subscription: 20000, payPerSession: 3000 },
      { month: 'May', subscription: 18000, payPerSession: 2500 },
      { month: 'Jun', subscription: 23000, payPerSession: 3500 },
      { month: 'Jul', subscription: 20000, payPerSession: 3000 },
      { month: 'Aug', subscription: 15000, payPerSession: 2000 },
      { month: 'Sep', subscription: 18000, payPerSession: 2500 },
      { month: 'Oct', subscription: 22000, payPerSession: 4000 },
      { month: 'Nov', subscription: 25000, payPerSession: 4500 },
      { month: 'Dec', subscription: 23000, payPerSession: 4000 },
];

const EarningChart = () => {
      return (
            <div className="p-4 my-4 bg-white drop-shadow rounded-md">
                  <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">Earning</h3>
                        <DatePicker defaultValue={dayjs()} allowClear={false} picker="year" className="rounded-md border-gray-300" />
                  </div>

                  <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                              <Tooltip />
                              <Legend verticalAlign="top" />
                              <Bar dataKey="subscription" fill="#24A953" name="Subscription" />
                              <Bar dataKey="payPerSession" fill="#FCB013" name="Pay-Per-Session" />
                        </BarChart>
                  </ResponsiveContainer>
            </div>
      );
};

export default EarningChart;
