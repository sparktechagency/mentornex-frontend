'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const data = [
      { month: 'Jan', subscription: 10, payPerSession: 2 },
      { month: 'Feb', subscription: 15, payPerSession: 1 },
      { month: 'Mar', subscription: 20, payPerSession: 5 },
      { month: 'Apr', subscription: 30, payPerSession: 10 },
      { month: 'May', subscription: 25, payPerSession: 8 },
      { month: 'Jun', subscription: 50, payPerSession: 12 },
      { month: 'Jul', subscription: 45, payPerSession: 8 },
      { month: 'Aug', subscription: 20, payPerSession: 5 },
      { month: 'Sep', subscription: 30, payPerSession: 6 },
      { month: 'Oct', subscription: 40, payPerSession: 9 },
      { month: 'Nov', subscription: 45, payPerSession: 10 },
      { month: 'Dec', subscription: 50, payPerSession: 12 },
];

const SessionChart = () => {
      return (
            <div className="p-4 my-4 bg-white drop-shadow rounded-md">
                  <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">Session</h3>
                        <DatePicker defaultValue={dayjs()} allowClear={false} picker="year" className="rounded-md border-gray-300" />
                  </div>

                  <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
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
