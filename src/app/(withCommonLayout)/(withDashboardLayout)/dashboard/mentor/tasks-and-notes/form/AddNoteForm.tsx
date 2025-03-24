'use client';
import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import { useGetMyMenteesQuery } from '@/redux/features/mentee/menteeApi';
import formattedSelectOptions from '@/utils/formattedSelectOptions';
import { useCreateNoteMutation } from '@/redux/features/note/noteApi';
import { toast } from 'react-toastify';

const AddNoteForm = ({ setIsModalOpen }: { setIsModalOpen: (value: boolean) => void }) => {
      const { data: menteesData } = useGetMyMenteesQuery([]);
      const [createNote, { isLoading }] = useCreateNoteMutation();
      const menteeOptions = formattedSelectOptions(menteesData?.data || []);
      const [form] = Form.useForm();

      const onFinish = async (values: any) => {
            const formData = new FormData();
            formData.append('mentee_id', values.mentee_id);
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('doc', values.file?.fileList[0]?.originFileObj);
            delete values.file;
            formData.append('data', JSON.stringify(values));
            try {
                  const res = await createNote(formData).unwrap();
                  if (res.success) {
                        toast.success(res?.message);
                        form.resetFields();
                        setIsModalOpen(false);
                  }
            } catch (error: any) {
                  toast.error(error?.data?.message);
                  setIsModalOpen(false);
            }
      };

      const props = {
            name: 'file',
            multiple: false,
            action: '/upload.do', // Replace with your API endpoint
            onChange(info: any) {
                  const { status } = info.file;
                  if (status === 'done') {
                        console.log(`${info.file.name} file uploaded successfully.`);
                  } else if (status === 'error') {
                        console.error(`${info.file.name} file upload failed.`);
                  }
            },
      };
      return (
            <Form onFinish={onFinish} form={form} layout="vertical">
                  <Form.Item label="Mentee" name="mentee_id" rules={[{ required: true, message: 'Please enter the task title' }]}>
                        <Select
                              showSearch
                              placeholder="Select a mentee"
                              style={{ width: '100%' }}
                              defaultActiveFirstOption={false}
                              options={menteeOptions}
                        />
                  </Form.Item>
                  <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter the note title' }]}>
                        <Input placeholder="Enter note title" />
                  </Form.Item>

                  <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please enter the task description' }]}
                  >
                        <Input.TextArea placeholder="Enter task description" rows={4} />
                  </Form.Item>

                  <Form.Item name="file" rules={[{ required: true, message: 'Please select the file' }]}>
                        <Dragger
                              accept=".pdf,.doc,.docx"
                              beforeUpload={() => false}
                              {...props}
                              className="border-dashed border-gray-300 bg-gray-50 p-4 rounded-md"
                        >
                              <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                              </p>
                              <p className="text-sm font-medium">Choose a file</p>
                              <p className="text-xs text-gray-500">or drag it here</p>
                        </Dragger>
                  </Form.Item>

                  <Form.Item className="flex justify-end space-x-4 mt-4">
                        <Button htmlType="submit" type="primary" className="bg-orange-500 hover:bg-orange-600">
                              {isLoading ? 'Saving...' : 'Save'}
                        </Button>
                  </Form.Item>
            </Form>
      );
};

export default AddNoteForm;
