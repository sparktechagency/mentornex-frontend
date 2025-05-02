import { Table } from 'antd';
import React from 'react';

const PackageManage = () => {
      const packages = [
            {
                  _id: '1',
                  title: 'Basic Package',
                  amount: 99,
                  sessions: 5,
                  takenSessions: 2,
                  remainingSessions: 3,
                  createdAt: '2025-04-01T00:00:00.000Z',
                  expiryDate: '2025-05-01T00:00:00.000Z',
            },
            {
                  _id: '2',
                  title: 'Premium Package',
                  amount: 199,
                  sessions: 10,
                  takenSessions: 5,
                  remainingSessions: 5,
                  createdAt: '2025-04-15T00:00:00.000Z',
                  expiryDate: '2025-05-15T00:00:00.000Z',
            },
            {
                  _id: '3',
                  title: 'Ultimate Package',
                  amount: 299,
                  sessions: 20,
                  takenSessions: 8,
                  remainingSessions: 12,
                  createdAt: '2025-04-20T00:00:00.000Z',
                  expiryDate: '2025-05-20T00:00:00.000Z',
            },
      ];

      const columns = [
            {
                  title: 'Package Name',
                  dataIndex: 'title',
                  key: 'title',
                  render: (text: string) => <span className="font-medium">{text}</span>,
            },
            {
                  title: 'Price',
                  dataIndex: 'amount',
                  key: 'amount',
                  render: (amount: number) => <span>${amount}</span>,
            },
            {
                  title: 'Total Sessions',
                  dataIndex: 'sessions',
                  key: 'sessions',
            },
            {
                  title: 'Taken Sessions',
                  dataIndex: 'takenSessions',
                  key: 'takenSessions',
            },
            {
                  title: 'Remaining Sessions',
                  dataIndex: 'remainingSessions',
                  key: 'remainingSessions',
            },
            {
                  title: 'Purchase Date',
                  dataIndex: 'createdAt',
                  key: 'createdAt',
                  render: (date: string) => new Date(date).toLocaleDateString(),
            },
            {
                  title: 'Expiry Date',
                  dataIndex: 'expiryDate',
                  key: 'expiryDate',
                  render: (date: string) => new Date(date).toLocaleDateString(),
            },
      ];

      return (
            <div className="p-4">
                  <h2 className="text-2xl font-bold mb-4">Purchased Packages</h2>
                  
                  {!packages || packages.length === 0 ? (
                        <div className="text-center py-8">
                              <p className="text-gray-600">No packages purchased yet</p>
                              <p className="text-gray-500 text-sm mt-2">You can purchase packages from mentor profiles</p>
                        </div>
                  ) : (
                        <Table
                              columns={columns}
                              dataSource={packages}
                              rowKey="_id"
                              pagination={{ pageSize: 10 }}
                              className="custom-shadow"
                        />
                  )}
            </div>
      );
};

export default PackageManage;
