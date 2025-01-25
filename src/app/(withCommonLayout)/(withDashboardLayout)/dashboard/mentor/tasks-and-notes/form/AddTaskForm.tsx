'use client';
import React from 'react';
import { Form, Input, DatePicker, Button, Select } from 'antd';

const AddTaskForm = () => {
      const [form] = Form.useForm();

      const handleSave = () => {};

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
                  <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter the task title' }]}>
                        <Input placeholder="Enter task title" />
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

                  <div className="flex justify-end space-x-4 mt-4">
                        <Button type="primary" className="bg-orange-500 hover:bg-orange-600" onClick={handleSave}>
                              Save
                        </Button>
                  </div>
            </Form>
      );
};

export default AddTaskForm;
