'use client';
import React from 'react';
import { Table, Avatar } from 'antd';
import { useGetMyMenteesQuery } from '@/redux/features/mentee/menteeApi';
import { getImageUrl } from '@/utils/getImageUrl';

// const data = [
//       {
//             key: '1',
//             name: 'Cody Fisher',
//             focusArea: 'Career Growth, Interviews',
//             sessionType: 'Pay Per Session',
//             nextSession: 'Last: 1 Jan 2025',
//             avatar: 'https://picsum.photos/40',
//       },
//       {
//             key: '2',
//             name: 'Bessie Cooper',
//             focusArea: 'Career Growth, Interviews',
//             sessionType: 'Subscription',
//             nextSession: 'Next: 3 Jan 2025',
//             avatar: 'https://picsum.photos/40',
//       },
//       {
//             key: '3',
//             name: 'Guy Hawkins',
//             focusArea: 'Career Growth, Interviews',
//             sessionType: 'Pay Per Session',
//             nextSession: 'Last: 1 Jan 2025',
//             avatar: 'https://picsum.photos/41',
//       },
//       // Add more data entries as needed
// ];

const MyMenteeTable = () => {
      const [page, setPage] = React.useState(1);
      const { data: menteeData, isLoading } = useGetMyMenteesQuery([
            { name: 'page', value: page },
            { name: 'limit', value: 6 },
      ]);

      const columns = [
            {
                  title: 'Name',
                  dataIndex: 'name',
                  key: 'name',
                  render: (text: any, record: any) => (
                        <div className="flex items-center space-x-3">
                              <Avatar size={40} src={getImageUrl(record.image)} />
                              <span className="font-medium">{text}</span>
                        </div>
                  ),
            },
            {
                  title: 'Focus Area',
                  dataIndex: 'focus_area',
                  key: 'focus_area',
                  render: (text: any) => <span className="text-gray-600">{text}</span>,
            },
            {
                  title: 'Phone',
                  dataIndex: 'phone',
                  key: 'phone',
                  render: (text: any) => <span className="text-gray-600">{text}</span>,
            },
            {
                  title: 'Email',
                  dataIndex: 'email',
                  key: 'email',
                  render: (text: any) => <span className="text-gray-600">{text}</span>,
            },
            // {
            //       title: '',
            //       key: 'action',
            //       render: () => (
            //             <Dropdown
            //                   overlay={
            //                         <Menu>
            //                               <Menu.Item key="1">Option 1</Menu.Item>
            //                               <Menu.Item key="2">Option 2</Menu.Item>
            //                         </Menu>
            //                   }
            //                   trigger={['click']}
            //             >
            //                   <EllipsisOutlined className="text-gray-500 cursor-pointer" />
            //             </Dropdown>
            //       ),
            // },
      ];

      return (
            <Table
                  pagination={{
                        current: page,
                        pageSize: menteeData?.meta?.limit,
                        total: menteeData?.meta?.total,
                        onChange: (page) => setPage(page),
                  }}
                  loading={isLoading}
                  columns={columns}
                  rowKey="_id"
                  dataSource={menteeData?.mentees}
                  bordered={false}
                  className="rounded-lg shadow-sm"
                  rowClassName="hover:bg-gray-50"
            />
      );
};

export default MyMenteeTable;
