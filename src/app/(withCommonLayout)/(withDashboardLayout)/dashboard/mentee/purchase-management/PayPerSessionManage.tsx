import { Select, Table } from 'antd';
import React from 'react';

const PayPerSessionManage = () => {
      const sessions = [
            {
                  _id: '1',
                  mentorName: 'John Doe',
                  amount: 50,
                  sessionType: '1-on-1 Session',
                  duration: '60 minutes',
                  status: 'Completed',
                  createdAt: '2025-04-01T00:00:00.000Z',
                  sessionDate: '2025-04-01T10:00:00.000Z',
            },
            {
                  _id: '2',
                  mentorName: 'Jane Smith',
                  amount: 75,
                  sessionType: 'Group Session',
                  duration: '90 minutes',
                  status: 'Scheduled',
                  createdAt: '2025-04-05T00:00:00.000Z',
                  sessionDate: '2025-04-10T14:00:00.000Z',
            },
            {
                  _id: '3',
                  mentorName: 'Bob Johnson',
                  amount: 100,
                  sessionType: 'Workshop',
                  duration: '120 minutes',
                  status: 'Completed',
                  createdAt: '2025-04-15T00:00:00.000Z',
                  sessionDate: '2025-04-15T16:00:00.000Z',
            },
      ];

      const columns = [
            {
                  title: 'Mentor',
                  dataIndex: 'mentorName',
                  key: 'mentorName',
                  render: (text: string) => <span className="font-medium">{text}</span>,
            },
            {
                  title: 'Amount',
                  dataIndex: 'amount',
                  key: 'amount',
                  render: (amount: number) => <span>${amount}</span>,
            },
            {
                  title: 'Session Type',
                  dataIndex: 'sessionType',
                  key: 'sessionType',
            },
            {
                  title: 'Duration',
                  dataIndex: 'duration',
                  key: 'duration',
            },
            {
                  title: 'Status',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status: string) => (
                        <span
                              className={`px-2 py-1 rounded-full text-sm ${
                                    status === 'Completed'
                                          ? 'bg-green-100 text-green-800'
                                          : status === 'Scheduled'
                                          ? 'bg-blue-100 text-blue-800'
                                          : 'bg-gray-100 text-gray-800'
                              }`}
                        >
                              {status}
                        </span>
                  ),
            },
            {
                  title: 'Purchase Date',
                  dataIndex: 'createdAt',
                  key: 'createdAt',
                  render: (date: string) => new Date(date).toLocaleDateString(),
            },
            {
                  title: 'Session Date',
                  dataIndex: 'sessionDate',
                  key: 'sessionDate',
                  render: (date: string) => new Date(date).toLocaleString(),
            },
      ];

      return (
            <div className="p-4">
                  <h2 className="text-2xl font-bold mb-4">Pay Per Session History</h2>

                  <div className="flex justify-between mb-3">
                        <div className="">
                              <Select
                                    showSearch
                                    placeholder="Select a mentor"
                                    style={{ width: '200px' }}
                                    options={[
                                          { value: 'all', label: 'All' },
                                          { value: 'active', label: 'Active' },
                                          { value: 'inactive', label: 'Inactive' },
                                    ]}
                              />
                        </div>
                  </div>

                  {!sessions || sessions.length === 0 ? (
                        <div className="text-center py-8">
                              <p className="text-gray-600">No pay-per-session purchases yet</p>
                              <p className="text-gray-500 text-sm mt-2">You can book sessions from mentor profiles</p>
                        </div>
                  ) : (
                        <Table
                              columns={columns}
                              dataSource={sessions}
                              rowKey="_id"
                              pagination={{ pageSize: 10 }}
                              className="custom-shadow"
                        />
                  )}
            </div>
      );
};

export default PayPerSessionManage;
