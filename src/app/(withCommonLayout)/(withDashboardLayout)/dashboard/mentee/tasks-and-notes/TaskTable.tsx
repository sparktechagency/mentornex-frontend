'use client';

import { Table, Tag, Button, Input, Select, Space } from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

interface Task {
      key: string;
      title: string;
      assignedBy: string;
      dueDate: string;
      status: 'Completed' | 'In Progress' | 'Pending';
      priority: 'High' | 'Medium' | 'Low';
}

const TaskTable = () => {
      const router = useRouter();
      const [searchText, setSearchText] = useState('');
      const [statusFilter, setStatusFilter] = useState<string[]>([]);
      const [priorityFilter, setPriorityFilter] = useState<string[]>([]);

      // Mock data
      const data: Task[] = [
            {
                  key: '1',
                  title: 'Complete Frontend Dashboard',
                  assignedBy: 'John Doe',
                  dueDate: '2024-03-01',
                  status: 'In Progress',
                  priority: 'High',
            },
            {
                  key: '2',
                  title: 'Implement User Authentication',
                  assignedBy: 'Jane Smith',
                  dueDate: '2024-03-05',
                  status: 'Pending',
                  priority: 'Medium',
            },
            {
                  key: '3',
                  title: 'Design System Documentation',
                  assignedBy: 'Mike Johnson',
                  dueDate: '2024-02-28',
                  status: 'Completed',
                  priority: 'Low',
            },
      ];

      const getStatusColor = (status: string) => {
            switch (status.toLowerCase()) {
                  case 'completed':
                        return 'success';
                  case 'in progress':
                        return 'processing';
                  case 'pending':
                        return 'warning';
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
            },
            {
                  title: 'Due Date',
                  dataIndex: 'dueDate',
                  key: 'dueDate',
                  sorter: (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
            },
            {
                  title: 'Status',
                  dataIndex: 'status',
                  key: 'status',
                  filters: [
                        { text: 'Completed', value: 'Completed' },
                        { text: 'In Progress', value: 'In Progress' },
                        { text: 'Pending', value: 'Pending' },
                  ],
                  filteredValue: statusFilter,
                  onFilter: (value, record) => record.status === value,
                  render: (status: string) => <Tag color={getStatusColor(status)}>{status}</Tag>,
            },
            {
                  title: 'Priority',
                  dataIndex: 'priority',
                  key: 'priority',
                  filters: [
                        { text: 'High', value: 'High' },
                        { text: 'Medium', value: 'Medium' },
                        { text: 'Low', value: 'Low' },
                  ],
                  filteredValue: priorityFilter,
                  onFilter: (value, record) => record.priority === value,
                  render: (priority: string) => <Tag color={getPriorityColor(priority)}>{priority}</Tag>,
            },
            {
                  title: 'Action',
                  key: 'action',
                  render: (_, record) => (
                        <Button
                              type="text"
                              icon={<EyeOutlined />}
                              onClick={() => router.push(`/dashboard/mentee/tasks-and-notes/${record.key}`)}
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
                                    mode="multiple"
                                    placeholder="Filter by status"
                                    style={{ minWidth: '150px' }}
                                    value={statusFilter}
                                    onChange={setStatusFilter}
                                    options={[
                                          { label: 'Completed', value: 'Completed' },
                                          { label: 'In Progress', value: 'In Progress' },
                                          { label: 'Pending', value: 'Pending' },
                                    ]}
                              />
                              <Select
                                    mode="multiple"
                                    placeholder="Filter by priority"
                                    style={{ minWidth: '150px' }}
                                    value={priorityFilter}
                                    onChange={setPriorityFilter}
                                    options={[
                                          { label: 'High', value: 'High' },
                                          { label: 'Medium', value: 'Medium' },
                                          { label: 'Low', value: 'Low' },
                                    ]}
                              />
                        </Space>
                  </div>

                  <Table
                        columns={columns}
                        dataSource={data}
                        className="bg-white rounded-lg"
                        pagination={{
                              pageSize: 10,
                              showTotal: (total) => `Total ${total} tasks`,
                        }}
                  />
            </div>
      );
};

export default TaskTable;
