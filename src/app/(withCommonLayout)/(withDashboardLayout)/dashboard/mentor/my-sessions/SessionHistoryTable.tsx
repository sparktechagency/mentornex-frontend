'use client';
import { Table } from 'antd';
import { useState } from 'react';
import moment from 'moment';
import { useGetSessionQuery } from '@/redux/features/booking/bookingApi';
const SessionHistoryTable = () => {
      const [page, setPage] = useState(1);

      const { data: upcomingSessionData, isLoading } = useGetSessionQuery([
            { name: 'status', value: 'history' },
            { name: 'page', value: page },
            { name: 'limit', value: 5 },
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
                              case 'upcoming':
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
      ];
      return (
            <div className="">
                  <Table
                        loading={isLoading}
                        columns={columns}
                        dataSource={upcomingSessionData?.data}
                        pagination={{
                              pageSize: upcomingSessionData?.meta?.limit,
                              showSizeChanger: false,
                              position: ['bottomCenter'],
                              total: upcomingSessionData?.meta?.total,
                              onChange: (page) => setPage(page),
                        }}
                  />
            </div>
      );
};

export default SessionHistoryTable;
