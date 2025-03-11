'use client';
import Modal from '@/components/ui/Modal';
import { Button, Input, Space, Form, Table, Tooltip, Popconfirm } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import { BsPencil, BsPlus, BsTrash } from 'react-icons/bs';
import { SlDocs } from 'react-icons/sl';

const ContentManagement = () => {
      const [open, setOpen] = useState(false);
      const [editData, setEditData] = useState(null);
      return (
            <div>
                  <h1 className="text-2xl font-semibold mb-2">Content Management</h1>
                  <p>Upload your introductory video and any additional documents here.</p>

                  <div style={{ width: '100%', marginTop: '20px' }}>
                        <Form className="space-y-4 bg-white p-4 custom-shadow" layout="vertical" validateTrigger={['onChange', 'onBlur']}>
                              <Form.Item
                                    rules={[{ required: true, message: 'Please enter introductory video url', type: 'url' }]}
                                    name="url"
                                    label="Introductory Video URL"
                              >
                                    <Input placeholder="Enter introductory video url" />
                              </Form.Item>
                              <Form.Item className="flex justify-start">
                                    <Button
                                          style={{
                                                height: 32,
                                                width: 100,
                                          }}
                                          htmlType="submit"
                                          type="primary"
                                    >
                                          Submit
                                    </Button>
                              </Form.Item>
                        </Form>

                        <div className="my-5">
                              <div className="flex justify-end my-2">
                                    <Button
                                          style={{
                                                height: 32,
                                                width: 100,
                                          }}
                                          icon={<BsPlus />}
                                          size="small"
                                          onClick={() => setOpen(true)}
                                          type="primary"
                                    >
                                          Add <SlDocs />
                                    </Button>
                              </div>
                              <Table
                                    columns={[
                                          {
                                                title: 'Document Title',
                                                dataIndex: 'title',
                                                key: 'title',
                                          },
                                          {
                                                title: 'Document URL',
                                                dataIndex: 'url',
                                                key: 'url',
                                                render: (string, record) => (
                                                      <Link href={record.url} target="_blank" rel="noopener noreferrer">
                                                            {record.url}
                                                      </Link>
                                                ),
                                          },
                                          {
                                                title: 'Action',
                                                dataIndex: 'action',
                                                key: 'action',
                                                render: (string, record) => (
                                                      <Space>
                                                            <Tooltip title="Edit">
                                                                  <Button
                                                                        onClick={() => {
                                                                              setEditData(record as any);
                                                                              setOpen(true);
                                                                        }}
                                                                        size="small"
                                                                        type="primary"
                                                                        danger={false}
                                                                  >
                                                                        <BsPencil />
                                                                  </Button>
                                                            </Tooltip>
                                                            <Tooltip title="Delete">
                                                                  <Popconfirm
                                                                        title="Are you sure you want to delete this document?"
                                                                        onConfirm={() => {}}
                                                                        okText="Yes"
                                                                        cancelText="No"
                                                                  >
                                                                        <Button size="small" type="primary" danger>
                                                                              <BsTrash />
                                                                        </Button>
                                                                  </Popconfirm>
                                                            </Tooltip>
                                                      </Space>
                                                ),
                                          },
                                    ]}
                                    dataSource={[
                                          {
                                                _id: '1',
                                                title: 'Document Title',
                                                url: 'https://www.youtube.com/watch?v=1234567890',
                                          },
                                          {
                                                _id: '2',
                                                title: 'Document Title',
                                                url: 'https://www.youtube.com/watch?v=1234567890',
                                          },
                                          {
                                                _id: '3',
                                                title: 'Document Title',
                                                url: 'https://www.youtube.com/watch?v=1234567890',
                                          },
                                    ]}
                              />
                        </div>
                  </div>

                  <Modal visible={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} title="Add Document">
                        <Form layout="vertical">
                              <Form.Item name="title" label="Document Title">
                                    <Input placeholder="Enter document title" />
                              </Form.Item>
                              <Form.Item
                                    name="url"
                                    rules={[{ required: true, message: 'Please enter document url', type: 'url' }]}
                                    label="Document URL"
                              >
                                    <Input placeholder="Enter document url" />
                              </Form.Item>
                              <Form.Item>
                                    <Button htmlType="submit" type="primary" style={{ marginTop: '20px' }}>
                                          Submit
                                    </Button>
                              </Form.Item>
                        </Form>
                  </Modal>
            </div>
      );
};

export default ContentManagement;
