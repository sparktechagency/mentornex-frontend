'use client';
import React from 'react';
import { Table, Avatar, Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

const data = [
      {
            key: '1',
            name: 'Cody Fisher',
            focusArea: 'Career Growth, Interviews',
            sessionType: 'Pay Per Session',
            nextSession: 'Last: 1 Jan 2025',
            avatar: 'https://picsum.photos/40',
      },
      {
            key: '2',
            name: 'Bessie Cooper',
            focusArea: 'Career Growth, Interviews',
            sessionType: 'Subscription',
            nextSession: 'Next: 3 Jan 2025',
            avatar: 'https://picsum.photos/40',
      },
      {
            key: '3',
            name: 'Guy Hawkins',
            focusArea: 'Career Growth, Interviews',
            sessionType: 'Pay Per Session',
            nextSession: 'Last: 1 Jan 2025',
            avatar: 'https://picsum.photos/41',
      },
      // Add more data entries as needed
];

const MyMenteeTable = () => {
      const columns = [
            {
                  title: 'Name',
                  dataIndex: 'name',
                  key: 'name',
                  render: (text: any, record: any) => (
                        <div className="flex items-center space-x-3">
                              <Avatar src={record.avatar} />
                              <span className="font-medium">{text}</span>
                        </div>
                  ),
            },
            {
                  title: 'Focus Area',
                  dataIndex: 'focusArea',
                  key: 'focusArea',
                  render: (text: any) => <span className="text-gray-600">{text}</span>,
            },
            {
                  title: 'Session Type',
                  dataIndex: 'sessionType',
                  key: 'sessionType',
                  render: (text: any) => <span className="text-gray-600">{text}</span>,
            },
            {
                  title: 'Next Session',
                  dataIndex: 'nextSession',
                  key: 'nextSession',
                  render: (text: any) => <span className="text-gray-600">{text}</span>,
            },
            {
                  title: '',
                  key: 'action',
                  render: () => (
                        <Dropdown
                              overlay={
                                    <Menu>
                                          <Menu.Item key="1">Option 1</Menu.Item>
                                          <Menu.Item key="2">Option 2</Menu.Item>
                                    </Menu>
                              }
                              trigger={['click']}
                        >
                              <EllipsisOutlined className="text-gray-500 cursor-pointer" />
                        </Dropdown>
                  ),
            },
      ];

      return (
            <Table
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  bordered={false}
                  className="rounded-lg shadow-sm"
                  rowClassName="hover:bg-gray-50"
            />
      );
};

export default MyMenteeTable;
