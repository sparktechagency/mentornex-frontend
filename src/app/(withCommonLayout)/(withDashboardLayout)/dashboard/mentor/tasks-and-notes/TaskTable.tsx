import Modal from '@/components/ui/Modal';
import { Button, Select, Space, Table } from 'antd';
import { useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { RxCross2, RxPencil1 } from 'react-icons/rx';
import AddTaskForm from './form/AddTaskForm';

const TaskTable = () => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const columns = [
            {
                  title: 'Task',
                  dataIndex: 'task',
                  key: 'task',
            },
            {
                  title: 'Assign Date',
                  dataIndex: 'assignDate',
                  key: 'assignDate',
            },
            {
                  title: 'Deadline',
                  dataIndex: 'deadline',
                  key: 'deadline',
            },
            {
                  title: 'Status',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status: string) => (
                        <div className={`flex items-center gap-3 text-${status === 'In Progress' ? 'green' : 'red'}-500`}>
                              <span className={`w-2 h-2 rounded-full bg-${status === 'In Progress' ? 'green' : 'red'}-500`} />
                              <span>{status}</span>
                        </div>
                  ),
            },
            {
                  title: 'Action',
                  key: 'action',
                  render: () => (
                        <Space size="middle">
                              <Button icon={<RxPencil1 size={16} />} type="primary" size="small" />
                              <Button icon={<RxCross2 size={16} />} type="primary" danger size="small" />
                        </Space>
                  ),
            },
      ];

      const data = [
            {
                  key: '1',
                  task: 'Design a new website',
                  assignDate: '2024-01-01',
                  deadline: '2024-01-15',
                  status: 'In Progress',
            },
            {
                  key: '2',
                  task: 'Develop a new website',
                  assignDate: '2024-01-16',
                  deadline: '2024-02-01',
                  status: 'Not Started',
            },
      ];

      return (
            <>
                  <div className="flex justify-between mb-3">
                        <div className="">
                              <Select
                                    showSearch
                                    placeholder="Select a mentee"
                                    style={{ width: '200px' }}
                                    options={[
                                          { value: 'lucy', label: 'Lucy' },
                                          { value: 'Yiminghe1', label: 'Yiminghe1' },
                                          { value: 'Yiminghe2', label: 'Yiminghe2' },
                                          { value: 'Yiminghe3', label: 'Yiminghe3' },
                                          { value: 'Yiminghe4', label: 'Yiminghe4' },
                                          { value: 'Yiminghe5', label: 'Yiminghe5' },
                                    ]}
                              />
                        </div>
                        <div>
                              <Button onClick={() => setIsModalOpen(true)} icon={<BsPlus color="white" size={20} />} type="primary">
                                    Add Task
                              </Button>
                        </div>
                  </div>

                  <Table columns={columns} dataSource={data} />

                  <Modal title="Add Task" visible={isModalOpen} onCancel={() => setIsModalOpen(false)} width={600}>
                        <AddTaskForm />
                  </Modal>
            </>
      );
};

export default TaskTable;
