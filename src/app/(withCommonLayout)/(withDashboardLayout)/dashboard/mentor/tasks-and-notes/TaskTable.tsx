import Modal from '@/components/ui/Modal';
import { Button, Popconfirm, Select, Space, Table } from 'antd';
import { useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { RxCross2, RxEyeOpen } from 'react-icons/rx';
import AddTaskForm from './form/AddTaskForm';
import { useGetTasksQuery } from '@/redux/features/task/taskApi';
import { useGetMyMenteesQuery } from '@/redux/features/mentee/menteeApi';
import formattedSelectOptions from '@/utils/formattedSelectOptions';
import { toast } from 'react-toastify';
import { useDeleteTaskMutation } from '@/redux/features/task/taskApi';
// import { useAppSelector } from '@/redux/hooks';
// import { useGetChatListMutation } from '@/redux/features/chatlist/chatlistApi';

const TaskTable = () => {
      const [page, setPage] = useState(1);
      const [menteeId, setMenteeId] = useState('');
      // const { chatList } = useAppSelector((state) => state.chat);
      // const [getChatList] = useGetChatListMutation();
      // console.log('chat', chatList);

      const { data: taskData } = useGetTasksQuery([
            {
                  name: 'menteeId',
                  value: menteeId,
            },
            {
                  name: 'page',
                  value: page,
            },
            {
                  name: 'limit',
                  value: 9,
            },
      ]);
      const { data: menteesData } = useGetMyMenteesQuery([]);
      const [deleteTask] = useDeleteTaskMutation();
      const menteeOptions = formattedSelectOptions(menteesData?.data || []);

      const [isModalOpen, setIsModalOpen] = useState(false);
      const columns = [
            {
                  title: 'Task',
                  dataIndex: 'title',
                  key: 'title',
            },
            {
                  title: 'Assign To',
                  dataIndex: 'mentee_id',
                  key: 'mentee_id',
                  render: (text: { name: string }) => <h2>{text.name}</h2>,
            },
            {
                  title: 'Assign Date',
                  dataIndex: 'createdAt',
                  key: 'createdAt',
                  render: (text: string) => new Date(text).toLocaleDateString(),
            },
            {
                  title: 'Deadline',
                  dataIndex: 'deadline',
                  key: 'deadline',
                  render: (text: string) => new Date(text).toLocaleDateString(),
            },
            {
                  title: 'Status',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status: string) => (
                        <div className={`flex items-center gap-3 text-${status === 'complete' ? 'green' : 'red'}-500`}>
                              <span className={`w-2 h-2 rounded-full bg-${status === 'complete' ? 'green' : 'red'}-500`} />
                              <span>{status}</span>
                        </div>
                  ),
            },
            {
                  title: 'Action',
                  key: 'action',
                  render: (_text: any, record: { _id: string }) => (
                        <Space size="middle">
                              {/* <Button icon={<RxPencil1 size={16} />} type="primary" size="small" /> */}
                              <Popconfirm
                                    title="Are you sure you want to delete this task?"
                                    onConfirm={() => handleDelete(record._id)}
                                    okText="Yes"
                                    cancelText="No"
                              >
                                    <Button icon={<RxCross2 size={16} />} type="primary" danger size="small" />
                              </Popconfirm>

                              <Button
                                    href={`/dashboard/mentor/tasks-and-notes/${record._id}`}
                                    icon={<RxEyeOpen size={16} />}
                                    type="primary"
                                    size="small"
                              />
                        </Space>
                  ),
            },
      ];

      const handleDelete = (id: string) => {
            const tryDelete = async () => {
                  try {
                        const res = await deleteTask(id).unwrap();
                        if (res.success) {
                              toast.success(res?.message);
                        }
                  } catch (error: any) {
                        toast.error(error?.data?.message);
                  }
            };
            tryDelete();
      };
      const handleFilter = (value: string) => {
            setMenteeId(value);
      };
      return (
            <>
                  <div className="flex justify-between mb-3">
                        <div className="">
                              <Select
                                    onChange={(value) => handleFilter(value)}
                                    showSearch
                                    placeholder="Select a mentee"
                                    style={{ width: '200px' }}
                                    options={menteeOptions}
                              />
                        </div>
                        <div>
                              <Button onClick={() => setIsModalOpen(true)} icon={<BsPlus color="white" />} type="primary">
                                    Add Task
                              </Button>
                        </div>
                  </div>

                  <Table
                        pagination={{
                              current: page,
                              total: taskData?.meta?.total,
                              pageSize: taskData?.meta?.limit,
                              onChange: (page: number) => setPage(page),
                        }}
                        rowKey="_id"
                        columns={columns}
                        dataSource={taskData?.data || []}
                  />

                  <Modal title="Add Task" visible={isModalOpen} onCancel={() => setIsModalOpen(false)} width={600}>
                        <AddTaskForm setIsModalOpen={setIsModalOpen} />
                  </Modal>
            </>
      );
};

export default TaskTable;
