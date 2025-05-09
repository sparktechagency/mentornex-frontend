'use client';
import ReviewForm from '@/components/forms/ReviewForm';
import Modal from '@/components/ui/Modal';
import { useGetSessionQuery } from '@/redux/features/booking/bookingApi';
import { Button, Space, Table, Tooltip } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { TbMessageStar } from 'react-icons/tb';

const SessionHistoryTable = () => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [selectedSession, setSelectedSession] = useState(null);
      const [page, setPage] = useState(1);

      const { data: sessionHistoryData, isLoading } = useGetSessionQuery([
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
                              case 'cancelled':
                                    bgColor = 'bg-red-500';

                                    break;
                              case 'rejected':
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
                  title: 'Action',
                  dataIndex: 'action',
                  key: 'action',
                  render: (text: string, record: any) => (
                        <Space>
                              <Tooltip title={record?.status === 'completed' ? 'Review' : 'This session is not completed'}>
                                    <Button
                                          disabled={record?.status !== 'completed'}
                                          onClick={() => {
                                                setSelectedSession(record);
                                                setIsModalOpen(true);
                                          }}
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
                        loading={isLoading}
                        rowKey="_id"
                        columns={columns}
                        dataSource={sessionHistoryData?.data}
                        pagination={{
                              pageSize: sessionHistoryData?.meta?.limit,
                              showSizeChanger: false,
                              position: ['bottomCenter'],
                              total: sessionHistoryData?.meta?.total,

                              onChange: (page) => setPage(page),
                        }}
                  />

                  <Modal title="Session Review" visible={isModalOpen} onCancel={() => setIsModalOpen(false)}>
                        <ReviewForm setIsModalOpen={setIsModalOpen} session={selectedSession} />
                  </Modal>
            </div>
      );
};

export default SessionHistoryTable;
