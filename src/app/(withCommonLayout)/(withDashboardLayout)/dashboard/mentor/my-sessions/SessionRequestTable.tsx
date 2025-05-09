'use client';
import { Button, Popconfirm, Space, Table } from 'antd';
import { useState } from 'react';
import moment from 'moment';
import { useGetSessionQuery, useUpdateSessionMutation } from '@/redux/features/booking/bookingApi';
import { RxCross2 } from 'react-icons/rx';
import { GrCalendar } from 'react-icons/gr';
import { toast } from 'react-toastify';
import Modal from '@/components/ui/Modal';
import BookingForm from '@/components/pages/mentor-details/booking-modal/BookingForm';

const SessionRequestTable = () => {
      const [page, setPage] = useState(1);
      const [openModal, setOpenModal] = useState(false);
      const [selectedSession, setSelectedSession] = useState<any>(null);

      const [updateSession] = useUpdateSessionMutation();
      const { data: upcomingSessionData, isLoading } = useGetSessionQuery([
            { name: 'status', value: 'pending' },
            { name: 'page', value: page },
            { name: 'limit', value: 5 },
      ]);

      const handleCancelSession = async (id: string, data: any) => {
            try {
                  const res = await updateSession({ id, data }).unwrap();
                  if (res.success) {
                        toast.success(res.message);
                  }
            } catch (error: any) {
                  toast.error(error?.data?.message || error?.error);
            }
      };

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
                  render: (_status: string, _record: any) => (
                        <Space>
                              <Popconfirm
                                    title="Are you sure to cancel this session?"
                                    onConfirm={() => {
                                          handleCancelSession(_record._id, { status: 'cancelled' });
                                    }}
                              >
                                    <Button icon={<RxCross2 />} type="primary" danger size="small"></Button>
                              </Popconfirm>

                              <Button
                                    onClick={() => {
                                          setSelectedSession(_record);
                                          setOpenModal(true);
                                    }}
                                    icon={<GrCalendar />}
                                    type="primary"
                                    size="small"
                              ></Button>
                        </Space>
                  ),
            },
      ];
      return (
            <div className="">
                  <Table
                        rowKey="_id"
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

                  <Modal title="Update Session" visible={openModal} onCancel={() => setOpenModal(false)} width={600}>
                        <BookingForm profile={selectedSession?.mentor_id} bookingType="session" session={selectedSession} />
                  </Modal>
            </div>
      );
};

export default SessionRequestTable;
