'use client';
import React from 'react';
import { Table, Button, DatePicker, Space, Avatar } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';

import { HiOutlineArrowUpTray } from 'react-icons/hi2';

const BillingTransactionTable = () => {
      const data = Array.from({ length: 8 }).map((_, index) => ({
            key: index,
            date: '12 Nov 2024',
            menteeName: 'Jonathan Doe',
            invoice: `#IN000${index + 1}`,
            menteeID: `#0${index + 1}`,
            amount: `$100.00`,
            status: 'Paid',
            avatar: `https://picsum.photos/${index + 1}`,
      }));

      const columns = [
            {
                  title: 'Date',
                  dataIndex: 'date',
                  key: 'date',
            },
            {
                  title: 'Mentee Name',
                  dataIndex: 'menteeName',
                  key: 'menteeName',
                  render: (text: any, record: any) => (
                        <div className="flex items-center space-x-3">
                              <Avatar src={record.avatar} />
                              <span>{text}</span>
                        </div>
                  ),
            },
            {
                  title: 'Invoice',
                  dataIndex: 'invoice',
                  key: 'invoice',
            },
            {
                  title: 'Mentee ID',
                  dataIndex: 'menteeID',
                  key: 'menteeID',
            },
            {
                  title: 'Amount',
                  dataIndex: 'amount',
                  key: 'amount',
                  sorter: (a: any, b: any) => parseFloat(a.amount.slice(1)) - parseFloat(b.amount.slice(1)),
            },
            {
                  title: 'Status',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status: string) => <p className="text-green-500">{status}</p>,
            },
            {
                  title: 'Actions',
                  key: 'actions',
                  render: () => (
                        <Space size="middle">
                              <Button size="small" icon={<EditOutlined />} type="primary" />
                              <Button size="small" icon={<EyeOutlined />} type="default" />
                              <Button size="small" icon={<DeleteOutlined />} type="primary" danger />
                        </Space>
                  ),
            },
      ];

      const handleExport = () => {
            console.log('Exporting data...');
      };

      return (
            <div className="">
                  <div className="flex justify-end gap-3 items-center mb-4">
                        <Space size="middle">
                              <DatePicker
                                    picker="month"
                                    format="MMMM YYYY"
                                    className="w-[200px] rounded-md"
                                    onChange={(date, dateString) => console.log('Selected Month and Year:', date, dateString)}
                              />
                        </Space>
                        <Button icon={<HiOutlineArrowUpTray color="#FF6F3C" />} onClick={handleExport}>
                              Export
                        </Button>
                  </div>
                  <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} bordered rowSelection={{ type: 'checkbox' }} />
            </div>
      );
};

export default BillingTransactionTable;
