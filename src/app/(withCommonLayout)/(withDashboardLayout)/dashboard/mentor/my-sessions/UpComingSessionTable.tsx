'use client';
import { Button, Table, Tooltip } from 'antd';
import { useState } from 'react';
import moment from 'moment';
import { useGetSessionQuery } from '@/redux/features/booking/bookingApi';
import { MdGroupAdd } from 'react-icons/md';

const UpComingSessionTable = () => {
  const [page, setPage] = useState(1);

  const { data: upcomingSessionData, isLoading } = useGetSessionQuery([
    { name: 'status', value: 'upcoming' },
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

    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (status: string, record: any) => (
        <Tooltip
          title={
            new Date(record?.scheduled_time).getTime() - Date.now() <= 5 * 60 * 1000 &&
            new Date(record?.scheduled_time).getTime() - Date.now() >= 0
              ? 'Join Session'
              : 'Session time is not started yet'
          }
        >
          <Button
            disabled={
              // Disable unless scheduled_time is within the next 5 minutes
              !(
                new Date(record?.scheduled_time).getTime() - Date.now() <= 5 * 60 * 1000 &&
                new Date(record?.scheduled_time).getTime() - Date.now() >= 0
              )
            }
            icon={<MdGroupAdd size={17} className="text-green-500" />}
            style={{
              backgroundColor: 'transparent',
              color: 'green',
              padding: '10px',
            }}
            type="primary"
            size="small"
          >
            Join
          </Button>
        </Tooltip>
      ),
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

export default UpComingSessionTable;
