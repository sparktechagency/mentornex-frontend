'use client';
import { Button, Space, Table } from 'antd';
import Image from 'next/image';
import { GrCalendar } from 'react-icons/gr';
import { RxCross2 } from 'react-icons/rx';

const data = [
      {
            key: '1',
            dateTime: '05 Jan 2025 9:00 AM',
            mentee: 'Cody Fisher',
            topic: 'Advance UI UX',
            type: 'Pay Per Session',
            fee: '$30',
            action: 'cancel',
            status: 'pending',
      },
      {
            key: '2',
            dateTime: '05 Jan 2025 9:00 AM',
            mentee: 'Cody Fisher',
            topic: 'Advance UI UX',
            type: 'Subscription',
            fee: '$200/M (2 Left)',
            action: 'cancel',
            status: 'accepted',
      },
      {
            key: '3',
            dateTime: '05 Jan 2025 9:00 AM',
            mentee: 'Cody Fisher',
            topic: 'Advance UI UX',
            type: 'Subscription',
            fee: '$200/M (2 Left)',
            action: 'cancel',
            status: 'rejected',
      },
      {
            key: '4',
            dateTime: '05 Jan 2025 9:00 AM',
            mentee: 'Cody Fisher',
            topic: 'Advance UI UX',
            type: 'Pay Per Session',
            fee: '$30',
            action: 'cancel',
            status: 'cancelled',
      },
];

const columns = [
      {
            title: 'Date & Time',
            dataIndex: 'dateTime',
            key: 'dateTime',
      },
      {
            title: 'Menter',
            dataIndex: 'mentor',
            key: 'mentor',
            render: (text: string) => (
                  <div className="flex items-center space-x-2">
                        <Image width={40} height={40} src="https://picsum.photos/40/40" alt="mentee" className="w-8 h-8 rounded-full" />
                        <span>{text}</span>
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
                        case 'cancelled':
                              bgColor = 'bg-gray-500';

                              break;
                        case 'rejected':
                              bgColor = 'bg-red-500';

                              break;
                        default:
                              break;
                  }

                  return <span className={`px-3 py-1 text-white rounded-lg ${bgColor} `}>{status}</span>;
            },
      },

      {
            title: 'Fee',
            dataIndex: 'fee',
            key: 'fee',
      },
      {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: () => (
                  <Space>
                        <Button icon={<RxCross2 />} type="primary" danger size="small"></Button>
                        <Button icon={<GrCalendar />} type="primary" size="small"></Button>
                  </Space>
            ),
      },
];

const UpComingSessionTable = () => {
      return (
            <div className="">
                  <Table
                        columns={columns}
                        dataSource={data}
                        pagination={{
                              pageSize: 5,
                              showSizeChanger: false,
                              position: ['bottomCenter'],
                        }}
                  />
            </div>
      );
};

export default UpComingSessionTable;
