'use client';
import React, { useEffect, useState } from 'react';
import { Button, Table, Tag, Input, Form, DatePicker, Select, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import Modal from '@/components/ui/Modal';
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from '@/redux/features/todo/todoApi';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const TodoPage = () => {
  const [page, setPage] = useState(1);
  const [createTodo, { isLoading }] = useAddTodoMutation();
  const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const { data: todos } = useGetTodosQuery([
    { name: 'page', value: page },
    { name: 'limit', value: 6 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedData, setEditedData] = useState<any>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (editedData) {
      form.setFieldsValue({
        title: editedData.title,
        description: editedData.description,
        assignedDate: dayjs(editedData.assignedDate),
        priority: editedData.priority,
        status: editedData.status,
        key: editedData._id,
      });
    }
  }, [editedData, form]);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Assigned Date',
      dataIndex: 'assignedDate',
      key: 'assignedDate',
      render: (assignedDate: string) => <span>{new Date(assignedDate).toLocaleDateString()}</span>,
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => (
        <Tag color={priority === 'High' ? 'red' : priority === 'Medium' ? 'orange' : 'green'}>
          {priority}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag
          color={status === 'Completed' ? 'green' : status === 'In Progress' ? 'blue' : 'orange'}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (string: any, record: any) => (
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setEditedData(record);
              setIsModalOpen(true);
            }}
            type="text"
            icon={<EditOutlined className="text-blue-500" />}
          />
          <Popconfirm
            title="Are you sure to delete this todo?"
            onConfirm={async () => {
              try {
                const res = await deleteTodo(record._id).unwrap();
                if (res.success) {
                  toast.success(res.message);
                }
              } catch (error: any) {
                toast.error(error?.data?.message || 'Something went wrong');
              }
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" icon={<DeleteOutlined className="text-red-500" />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleCreateTodo = async (values: any) => {
    try {
      let res;
      if (editedData?._id) {
        res = await updateTodo({ id: editedData._id, data: values }).unwrap();
      } else {
        res = await createTodo(values).unwrap();
      }
      if (res.success) {
        toast.success(res.message);
        form.resetFields();
        setIsModalOpen(false);
        setEditedData(null);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-title">Todo Management</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditedData(null);
            setIsModalOpen(true);
          }}
          className="bg-[#FF6F3C]"
        >
          Add Todo
        </Button>
      </div>

      <Table
        pagination={{
          total: todos?.meta?.total,
          pageSize: todos?.meta?.limit,
          onChange: (page) => setPage(page),
        }}
        columns={columns}
        dataSource={todos?.data}
        className="bg-white rounded-lg shadow-md"
      />

      <Modal
        onCancel={() => setIsModalOpen(false)}
        width={700}
        title={form.getFieldValue('key') ? 'Edit Todo' : 'Add Todo'}
        visible={isModalOpen}
      >
        <Form onFinish={handleCreateTodo} form={form} layout="vertical" className="mt-4">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="assignedDate"
            label="Assigned Date"
            rules={[{ required: true, message: 'Please select the assigned date!' }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true, message: 'Please select the priority!' }]}
          >
            <Select>
              <Select.Option value="high">High</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="low">Low</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select the status!' }]}
          >
            <Select>
              <Select.Option value="in_progress">In Progress</Select.Option>
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="completed">Completed</Select.Option>
            </Select>
          </Form.Item>

          <div className="flex justify-end">
            <Button type="primary" htmlType="submit" className="bg-[#FF6F3C]">
              {isLoading || isUpdating ? 'Loading...' : 'Save'}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default TodoPage;
