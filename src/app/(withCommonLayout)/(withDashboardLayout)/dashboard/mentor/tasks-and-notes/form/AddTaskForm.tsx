'use client';
import React from 'react';
import { Form, Input, DatePicker, Button, Select, Upload } from 'antd';
import { useGetMyMenteesQuery } from '@/redux/features/mentee/menteeApi';
import formattedSelectOptions from '@/utils/formattedSelectOptions';
import { UploadOutlined } from '@ant-design/icons';
import { useCreateTaskMutation } from '@/redux/features/task/taskApi';
import { toast } from 'react-toastify';

const AddTaskForm = () => {
      const { data: menteesData } = useGetMyMenteesQuery([]);
      const [addTask] = useCreateTaskMutation();
      const [form] = Form.useForm();

      const handleSave = async (values: any) => {
            console.log(values);
            const formData = new FormData();
            // formData.append('mentee_id', values.mentee_id);
            // formData.append('title', values.title);
            // formData.append('priority', values.priority);
            // formData.append('description', values.description);
            // formData.append('deadline', values.deadline);
            formData.append('doc', values.file?.fileList[0]?.originFileObj);
            delete values.file;
            formData.append('data', JSON.stringify(values));
            try {
                  const res = await addTask(formData).unwrap();
                  if (res.success) {
                        toast.success(res?.message);
                  }
            } catch (error: any) {
                  toast.error(error?.data?.message);
            }
      };

      const menteeOptions = formattedSelectOptions(menteesData?.data || []);
      return (
            <Form onFinish={handleSave} form={form} layout="vertical">
                  <Form.Item label="Mentee" name="mentee_id" rules={[{ required: true, message: 'Please enter the task title' }]}>
                        <Select placeholder="Select a mentee" style={{ width: '100%' }} options={menteeOptions} />
                  </Form.Item>
                  <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter the task title' }]}>
                        <Input placeholder="Enter task title" />
                  </Form.Item>

                  <Form.Item label="Priority" name="priority" rules={[{ required: true, message: 'Please select the task priority' }]}>
                        <Select
                              placeholder="Select a priority"
                              style={{ width: '100%' }}
                              defaultActiveFirstOption={false}
                              options={[
                                    { value: 'low', label: 'Low' },
                                    { value: 'medium', label: 'Medium' },
                                    { value: 'high', label: 'High' },
                                    { value: 'urgent', label: 'Urgent' },
                              ]}
                        />
                  </Form.Item>

                  <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please enter the task description' }]}
                  >
                        <Input.TextArea placeholder="Enter task description" rows={4} />
                  </Form.Item>

                  <Form.Item label="Deadline" name="deadline" rules={[{ required: true, message: 'Please select the deadline' }]}>
                        <DatePicker className="w-full" placeholder="dd/mm/yyyy" format="DD/MM/YYYY" />
                  </Form.Item>

                  <Form.Item label="Attachment" name="file" rules={[{ required: true, message: 'Please attach a file' }]}>
                        <Upload
                              style={{ width: '100%' }}
                              beforeUpload={() => false}
                              accept=".pdf,.doc,.docx"
                              name="logo"
                              action="/upload.do"
                              listType="picture"
                        >
                              <Button style={{ width: '100%' }} icon={<UploadOutlined />}>
                                    Upload
                              </Button>
                        </Upload>
                  </Form.Item>

                  <div className="flex justify-end space-x-4 mt-4">
                        <Button type="primary" className="bg-orange-500 hover:bg-orange-600" htmlType="submit">
                              Save
                        </Button>
                  </div>
            </Form>
      );
};

export default AddTaskForm;
