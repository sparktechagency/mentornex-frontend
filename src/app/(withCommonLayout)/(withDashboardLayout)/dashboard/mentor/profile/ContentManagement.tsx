'use client';
import Modal from '@/components/ui/Modal';
import {
      useCreateContentMutation,
      useDeleteContentMutation,
      useGetIntroductoryContentQuery,
      useGetTutorialContentQuery,
} from '@/redux/features/content/contentApi';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Input, Space, Form, Table, Tooltip, Popconfirm } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BsPencil, BsPlus, BsTrash } from 'react-icons/bs';
import { SlDocs } from 'react-icons/sl';
import { toast } from 'react-toastify';
import AddTutorialForm from './AddTutorialForm';

const ContentManagement = () => {
      const [form] = Form.useForm();
      const [modalForm] = Form.useForm();
      const [open, setOpen] = useState(false);

      const [createContent, { isLoading }] = useCreateContentMutation();
      const [deleteContent] = useDeleteContentMutation();
      const { data: introductoryContent } = useGetIntroductoryContentQuery([]);
      const { data: tutorialContent, isLoading: tutorialLoading } = useGetTutorialContentQuery([]);
      console.log(introductoryContent);

      const [editData, setEditData] = useState(null);

      useEffect(() => {
            if (introductoryContent) {
                  form.setFieldsValue({
                        url: introductoryContent?.url,
                  });
            }
      }, [introductoryContent, form]);

      const handleCreateContent = async (values: any) => {
            console.log(values);
            const formattedData = {
                  title: 'Introductory Video URL',
                  url: values.url,
                  type: 'intro',
            };
            try {
                  const res = await createContent(formattedData).unwrap();
                  if (res?.success) {
                        toast.success(res?.message);
                  }
            } catch (error: any) {
                  toast.error(error.data.message || 'Something went wrong');
            }
      };

      const handleDelete = async (id: string) => {
            try {
                  const res = await deleteContent(id).unwrap();
                  if (res?.success) {
                        toast.success(res?.message);
                  }
            } catch (error: any) {
                  toast.error(error.data.message || 'Something went wrong');
            }
      };

      return (
            <div>
                  <h1 className="text-2xl font-semibold mb-2">Content Management</h1>
                  <p>Upload your introductory video and any additional documents here.</p>

                  <div style={{ width: '100%', marginTop: '20px' }}>
                        <Form
                              form={form}
                              onFinish={handleCreateContent}
                              className="space-y-4 bg-white p-4 custom-shadow"
                              layout="vertical"
                              validateTrigger={['onChange', 'onBlur']}
                        >
                              <Form.Item
                                    rules={[{ required: true, message: 'Please enter introductory video url', type: 'url' }]}
                                    name="url"
                                    label="Introductory Video URL"
                              >
                                    <Input
                                          suffix={
                                                <div
                                                      style={{
                                                            display: introductoryContent?.url ? 'block' : 'none',
                                                      }}
                                                >
                                                      <Popconfirm
                                                            onConfirm={(e) => {
                                                                  e?.preventDefault();
                                                                  handleDelete(introductoryContent?._id);
                                                            }}
                                                            title="Are you sure to delete this content?"
                                                      >
                                                            <div className="text-red-500 cursor-pointer">
                                                                  <BsTrash size={20} />
                                                            </div>
                                                      </Popconfirm>
                                                </div>
                                          }
                                          style={{ width: '100%' }}
                                          placeholder="Enter introductory video url"
                                    />
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
                                          {isLoading ? <LoadingOutlined /> : 'Submit'}
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
                                          onClick={() => {
                                                setEditData(null);
                                                modalForm.resetFields();
                                                setOpen(true);
                                          }}
                                          type="primary"
                                    >
                                          Add <SlDocs />
                                    </Button>
                              </div>
                              <Table
                                    rowKey="_id"
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
                                                render: (string, record: any) => (
                                                      <Link href={record.url as string} target="_blank" rel="noopener noreferrer">
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
                                                                        onConfirm={() => handleDelete(record._id)}
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
                                    dataSource={tutorialContent}
                                    loading={tutorialLoading}
                                    pagination={false}
                              />
                        </div>
                  </div>

                  <Modal visible={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} title="Add Document">
                        <AddTutorialForm setOpen={setOpen} form={modalForm} editData={editData} />
                  </Modal>
            </div>
      );
};

export default ContentManagement;
