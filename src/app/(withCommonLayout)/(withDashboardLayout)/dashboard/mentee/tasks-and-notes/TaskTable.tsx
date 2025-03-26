'use client';

import { Table, Tag, Button, Input, Select, Space } from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useGetTasksQuery } from '@/redux/features/task/taskApi';

interface Task {
      key: string;
      title: string;
      assignedBy: string;
      dueDate: string;
      status: 'Completed' | 'In Progress' | 'Pending';
      priority: 'High' | 'Medium' | 'Low';
}

const TaskTable = () => {
      const [page, setPage] = useState(1);
      const router = useRouter();
      const [searchText, setSearchText] = useState('');
      const [statusFilter, setStatusFilter] = useState<string[]>([]);
      const [priorityFilter, setPriorityFilter] = useState<string[]>([]);
      const { data: tasksData } = useGetTasksQuery([
            { name: 'page', value: page },
            { name: 'limit', value: 8 },
            { name: 'status', value: statusFilter },
            { name: 'priority', value: priorityFilter },
      ]);

      const getStatusColor = (status: string) => {
            switch (status.toLowerCase()) {
                  case 'complete':
                        return 'success';
                  case 'incomplete':
                        return 'incomplete';

                  default:
                        return 'default';
            }
      };

      const getPriorityColor = (priority: string) => {
            switch (priority.toLowerCase()) {
                  case 'high':
                        return 'red';
                  case 'medium':
                        return 'orange';
                  case 'low':
                        return 'green';

                  case 'urgent':
                        return 'red';
                  default:
                        return 'blue';
            }
      };

      const columns: ColumnsType<Task> = [
            {
                  title: 'Title',
                  dataIndex: 'title',
                  key: 'title',
                  filteredValue: [searchText],
                  onFilter: (value, record) => record.title.toLowerCase().includes(value.toString().toLowerCase()),
                  render: (text) => <span className="font-medium">{text}</span>,
            },
            {
                  title: 'Assigned By',
                  dataIndex: 'assignedBy',
                  key: 'assignedBy',
                  render: (text, record: any) => <span className="font-medium">{record.mentor_id.name}</span>,
            },
            {
                  title: 'Due Date',
                  dataIndex: 'deadline',
                  key: 'deadline',
                  render: (text) => <span className="font-medium">{new Date(text).toLocaleDateString()}</span>,
            },
            {
                  title: 'Status',
                  dataIndex: 'status',
                  key: 'status',

                  render: (status: string) => <Tag color={getStatusColor(status)}>{status}</Tag>,
            },
            {
                  title: 'Priority',
                  dataIndex: 'priority',
                  key: 'priority',

                  render: (priority: string) => <Tag color={getPriorityColor(priority)}>{priority}</Tag>,
            },
            {
                  title: 'Action',
                  key: 'action',
                  render: (_, record: any) => (
                        <Button
                              type="text"
                              icon={<EyeOutlined />}
                              onClick={() => router.push(`/dashboard/mentee/tasks-and-notes/${record._id}`)}
                              className="text-[#FF6F3C]"
                        >
                              View Details
                        </Button>
                  ),
            },
      ];

      return (
            <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white p-4 rounded-lg">
                        <Input
                              placeholder="Search tasks..."
                              prefix={<SearchOutlined className="text-gray-400" />}
                              className="max-w-xs"
                              value={searchText}
                              onChange={(e) => setSearchText(e.target.value)}
                        />
                        <Space>
                              <Select
                                    placeholder="Filter by status"
                                    style={{ minWidth: '150px' }}
                                    value={statusFilter}
                                    onChange={setStatusFilter}
                                    options={[
                                          { label: 'Incomplete', value: 'incomplete' },
                                          { label: 'Complete', value: 'complete' },
                                    ]}
                              />
                              <Select
                                    placeholder="Filter by priority"
                                    style={{ minWidth: '150px' }}
                                    value={priorityFilter}
                                    onChange={setPriorityFilter}
                                    options={[
                                          { label: 'High', value: 'high' },
                                          { label: 'Medium', value: 'medium' },
                                          { label: 'Low', value: 'low' },
                                          { label: 'Urgent', value: 'urgent' },
                                    ]}
                              />
                        </Space>
                  </div>

                  <Table
                        rowKey="_id"
                        columns={columns}
                        dataSource={tasksData?.data}
                        className="bg-white rounded-lg"
                        pagination={{
                              pageSize: tasksData?.meta?.limit,
                              total: tasksData?.meta?.total,
                              current: tasksData?.meta?.page,
                              onChange: (page) => setPage(page),
                        }}
                  />
            </div>
      );
};

export default TaskTable;
