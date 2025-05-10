'use client';
import React from 'react';
import { Table } from 'antd';
import { useGetSessionQuery } from '@/redux/features/booking/bookingApi';
import moment from 'moment';

const ActiveMentorTable = () => {
      const { data: upcommingSessionData, isLoading } = useGetSessionQuery([
            {
                  name: 'status',
                  value: 'upcoming',
            },
            {
                  name: 'limit',
                  value: 4,
            },
      ]);

      const columns = [
            {
                  title: 'Booking Date',
                  dataIndex: 'createdAt',
                  key: 'createdAt',
                  render: (text: string) => <span>{moment(text).format('DD MMM YYYY')}</span>,
            },
            {
                  title: 'Menter',
                  dataIndex: 'mentor',
                  key: 'mentor',
                  render: (text: string, record: any) => (
                        <div className="flex items-center space-x-2">
                              <span>{record?.mentor_id?.name}</span>
                        </div>
                  ),
            },
            {
                  title: 'Topic',
                  dataIndex: 'topic',
                  key: 'topic',
            },

            {
                  title: 'Status',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status: string) => {
                        let bgColor = '';

                        switch (status) {
                              case 'pending':
                                    bgColor = 'bg-yellow-500';

                                    break;
                              case 'accepted':
                                    bgColor = 'bg-green-500';

                                    break;
                              case 'rescheduled':
                                    bgColor = 'bg-gray-500';

                                    break;
                              case 'cancelled':
                                    bgColor = 'bg-red-500';

                                    break;
                              case 'completed':
                                    bgColor = 'bg-green-500';

                                    break;
                              default:
                                    break;
                        }

                        return <span className={`px-3 py-1 text-white rounded-lg ${bgColor} `}>{status}</span>;
                  },
            },

            {
                  title: 'Session Time',
                  dataIndex: 'scheduled_time',
                  key: 'scheduled_time',
                  render: (text: string) => {
                        const countDownDate = new Date(text).getTime();

                        const now = new Date().getTime();

                        const timeLeft = countDownDate - now;

                        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

                        return (
                              <span>
                                    {days} days, {hours} hours, {minutes} minutes
                              </span>
                        );
                  },
            },
      ];

      return (
            <div className="my-4">
                  <h1 className="text-xl font-semibold my-4">Recent Activity</h1>
                  <Table
                        loading={isLoading}
                        columns={columns}
                        dataSource={upcommingSessionData?.data}
                        pagination={false}
                        bordered={false}
                        className="rounded-lg"
                        rowClassName="hover:bg-gray-50"
                        rowKey="_id"
                  />
            </div>
      );
};

export default ActiveMentorTable;
