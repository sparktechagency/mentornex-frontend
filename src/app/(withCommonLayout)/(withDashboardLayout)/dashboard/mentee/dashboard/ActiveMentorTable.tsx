'use client';
import React from 'react';
import { Table, Avatar } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { IoMdStar } from 'react-icons/io';

interface Mentor {
      key: string;
      name: string;
      avatar: string;
      rating: number;
      expertise: string;
      sessionType: string;
      nextSession: string;
}

const ActiveMentorTable = () => {
      const data: Mentor[] = [
            {
                  key: '1',
                  name: 'Henry, Arthur',
                  avatar: 'https://picsum.photos/40',
                  rating: 4.8,
                  expertise: 'Career Growth, Interviews',
                  sessionType: 'Pay Per Session',
                  nextSession: 'Last: 1 Jan 2025',
            },
            {
                  key: '2',
                  name: 'Miles, Esther',
                  avatar: 'https://picsum.photos/40',
                  rating: 4.8,
                  expertise: 'Career Growth, Interviews',
                  sessionType: 'Pay Per Session',
                  nextSession: 'Last: 1 Jan 2025',
            },
            {
                  key: '3',
                  name: 'Cooper, Kristin',
                  avatar: 'https://picsum.photos/40',
                  rating: 4.8,
                  expertise: 'Career Growth, Interviews',
                  sessionType: 'Pay Per Session',
                  nextSession: 'Last: 1 Jan 2025',
            },
            {
                  key: '4',
                  name: 'Nguyen, Shane',
                  avatar: 'https://picsum.photos/40',
                  rating: 4.8,
                  expertise: 'Career Growth, Interviews',
                  sessionType: 'Pay Per Session',
                  nextSession: 'Last: 1 Jan 2025',
            },
      ];

      const columns = [
            {
                  title: 'Name',
                  dataIndex: 'name',
                  key: 'name',
                  render: (text: string, record: Mentor) => (
                        <div className="flex items-center space-x-3">
                              <Avatar src={record.avatar} />
                              <span className="font-medium">{text}</span>
                        </div>
                  ),
            },
            {
                  title: 'Avg. Rating',
                  dataIndex: 'rating',
                  key: 'rating',
                  render: (rating: number) => (
                        <div className="flex items-center gap-1">
                              <span>{rating}</span>
                              <IoMdStar color="#FF6F3C" size={20} />
                        </div>
                  ),
            },
            {
                  title: 'Expertise',
                  dataIndex: 'expertise',
                  key: 'expertise',
                  render: (text: string) => <span className="text-gray-600">{text}</span>,
            },
            {
                  title: 'Session Type',
                  dataIndex: 'sessionType',
                  key: 'sessionType',
                  render: (text: string) => <span className="text-gray-600">{text}</span>,
            },
            {
                  title: 'Next Session',
                  dataIndex: 'nextSession',
                  key: 'nextSession',
                  render: (text: string) => <span className="text-gray-600">{text}</span>,
            },
            {
                  title: '',
                  key: 'actions',
                  render: () => <EllipsisOutlined className="text-gray-500 cursor-pointer" />,
            },
      ];

      return (
            <div className="my-4">
                  <h1 className="text-xl font-semibold my-4">Active Mentors</h1>
                  <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        bordered={false}
                        className="rounded-lg"
                        rowClassName="hover:bg-gray-50"
                  />
            </div>
      );
};

export default ActiveMentorTable;
