'use client';
import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';

const AddNoteForm = () => {
      const [form] = Form.useForm();

      const handleSave = () => {};

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
            <Form form={form} layout="vertical">
                  <Form.Item label="Mentee" name="mentee" rules={[{ required: true, message: 'Please enter the task title' }]}>
                        <Select
                              showSearch
                              placeholder="Select a mentee"
                              style={{ width: '100%' }}
                              defaultActiveFirstOption={false}
                              options={[
                                    { value: 'lucy', label: 'Lucy' },
                                    { value: 'Yiminghe1', label: 'Yiminghe1' },
                                    { value: 'Yiminghe2', label: 'Yiminghe2' },
                                    { value: 'Yiminghe3', label: 'Yiminghe3' },
                                    { value: 'Yiminghe4', label: 'Yiminghe4' },
                                    { value: 'Yiminghe5', label: 'Yiminghe5' },
                              ]}
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
                        <Dragger {...props} className="border-dashed border-gray-300 bg-gray-50 p-4 rounded-md">
                              <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                              </p>
                              <p className="text-sm font-medium">Choose a file</p>
                              <p className="text-xs text-gray-500">or drag it here</p>
                        </Dragger>
                  </Form.Item>

                  <div className="flex justify-end space-x-4 mt-4">
                        <Button type="primary" className="bg-orange-500 hover:bg-orange-600" onClick={handleSave}>
                              Save
                        </Button>
                  </div>
            </Form>
      );
};

export default AddNoteForm;
