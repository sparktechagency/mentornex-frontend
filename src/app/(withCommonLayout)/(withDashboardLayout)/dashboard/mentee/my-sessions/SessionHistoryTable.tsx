'use client';
import ReviewForm from '@/components/forms/ReviewForm';
import Modal from '@/components/ui/Modal';
import { Button, Space, Table, Tooltip } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import { RxTrash } from 'react-icons/rx';
import { TbMessageStar } from 'react-icons/tb';

const data = [
      {
            key: '1',
            dateTime: '05 Jan 2025 9:00 AM',
            mentee: 'Cody Fisher',
            topic: 'Advance UI UX',
            status: 'cancelled',
            fee: '$30',
      },
      {
            key: '2',
            dateTime: '05 Jan 2025 9:00 AM',
            mentee: 'Cody Fisher',
            topic: 'Advance UI UX',
            status: 'completed',
            fee: '$200/M (2 Left)',
      },

      {
            key: '3',
            dateTime: '05 Jan 2025 9:00 AM',
            mentee: 'Cody Fisher',
            topic: 'Advance UI UX',
            status: 'rejected',
            fee: '$30',
      },

      {
            key: '4',
            dateTime: '05 Jan 2025 9:00 AM',
            mentee: 'Cody Fisher',
            topic: 'Advance UI UX',
            status: 'completed',
            fee: '$200/M (2 Left)',
      },
];

const SessionHistoryTable = () => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const columns = [
            {
                  title: 'Date & Time',
                  dataIndex: 'dateTime',
                  key: 'dateTime',
            },
            {
                  title: 'Mentee',
                  dataIndex: 'mentee',
                  key: 'mentee',
                  render: (text: string) => (
                        <div className="flex items-center space-x-2">
                              <Image
                                    width={40}
                                    height={40}
                                    src="https://picsum.photos/40/40"
                                    alt="mentee"
                                    className="w-8 h-8 rounded-full"
                              />
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
                              case 'completed':
                                    bgColor = 'bg-green-500';

                                    break;
                              case 'cancelled':
                                    bgColor = 'bg-yellow-500';

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
                              <Tooltip title="Delete">
                                    <Button
                                          icon={<RxTrash />}
                                          style={{
                                                backgroundColor: '#FF0000',
                                          }}
                                          type="primary"
                                          danger
                                          size="small"
                                    ></Button>
                              </Tooltip>
                              <Tooltip title="Review">
                                    <Button
                                          onClick={() => setIsModalOpen(true)}
                                          icon={<TbMessageStar />}
                                          style={{
                                                backgroundColor: '#FFC107',
                                          }}
                                          type="primary"
                                          size="small"
                                    ></Button>
                              </Tooltip>
                        </Space>
                  ),
            },
      ];
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

                  <Modal title="Session Review" visible={isModalOpen} onCancel={() => setIsModalOpen(false)}>
                        <ReviewForm />
                  </Modal>
            </div>
      );
};

export default SessionHistoryTable;
