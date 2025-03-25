import { useAddPackageMutation, useDeletePackageMutation, useUpdatePackageMutation } from '@/redux/features/package/packageApi';
import { Button, Form, Input, InputNumber, Modal, Popconfirm, Select, Tooltip } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { BsPencil, BsPlus, BsTrash } from 'react-icons/bs';
import { toast } from 'react-toastify';

const Package = ({ packages }: { packages: any }) => {
      const [form] = Form.useForm();
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [editedPackage, setEditedPackage] = useState<any>(null);
      const [addPackage, { isLoading }] = useAddPackageMutation();
      const [updatePackage, { isLoading: updateLoading }] = useUpdatePackageMutation();
      const [deletePackage] = useDeletePackageMutation();

      const onFinish = async (values: any) => {
            if (editedPackage) {
                  try {
                        const res = await updatePackage({ id: editedPackage._id, data: values }).unwrap();
                        if (res.success) {
                              toast.success(res.message);
                              setIsModalOpen(false);
                        }
                  } catch (error: any) {
                        toast.error(error?.data?.message || error?.error);
                  }
            } else {
                  try {
                        const res = await addPackage(values).unwrap();
                        if (res.success) {
                              toast.success(res.message);
                              setIsModalOpen(false);
                        }
                  } catch (error: any) {
                        toast.error(error?.data?.message || error?.error);
                  }
            }
      };

      useEffect(() => {
            if (editedPackage) {
                  form.setFieldsValue(editedPackage);
            } else {
                  form.resetFields();
            }
      }, [editedPackage, form]);

      const handleDelete = async (id: string) => {
            try {
                  const res = await deletePackage(id).unwrap();
                  if (res.success) {
                        toast.success(res.message);
                  }
            } catch (error: any) {
                  toast.error(error?.data?.message || error?.error);
            }
      };
      return (
            <div>
                  <div className="flex-end mb-1">
                        <Button
                              onClick={() => {
                                    setEditedPackage(null);
                                    setIsModalOpen(true);
                              }}
                              icon={<BsPlus />}
                              type="primary"
                        >
                              Add Package
                        </Button>
                  </div>
                  <div className="my-2">
                        {packages?.map((item: any, index: number) => (
                              <div className="border rounded-lg p-3 mb-2" key={index}>
                                    <div className="flex-between">
                                          <div>
                                                <h3 className="font-semibold text-lg">{item.title}</h3>
                                                <div className="flex gap-5">
                                                      {item.sessions} sessions ${item.amount}
                                                </div>
                                          </div>
                                          <div>
                                                <div className="flex gap-5">
                                                      <Tooltip title="Edit">
                                                            <button
                                                                  onClick={() => {
                                                                        setEditedPackage(item);
                                                                        setIsModalOpen(true);
                                                                  }}
                                                                  className="text-green-500"
                                                            >
                                                                  <BsPencil size={20} />
                                                            </button>
                                                      </Tooltip>
                                                      <Tooltip title="Delete">
                                                            <Popconfirm
                                                                  title="Are you sure to delete this package?"
                                                                  onConfirm={() => handleDelete(item._id)}
                                                            >
                                                                  <button className="text-red-500">
                                                                        <BsTrash size={20} />
                                                                  </button>
                                                            </Popconfirm>
                                                      </Tooltip>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        ))}
                  </div>

                  <Modal
                        footer={null}
                        title={editedPackage ? 'Update Package' : 'Add Package'}
                        open={isModalOpen}
                        width={600}
                        onCancel={() => setIsModalOpen(false)}
                  >
                        <Form form={form} onFinish={onFinish} layout="vertical">
                              <Form.Item
                                    rules={[{ required: true, message: 'Please enter the package name' }]}
                                    name="title"
                                    label="Package Name"
                              >
                                    <Input placeholder="Enter package name" />
                              </Form.Item>
                              <Form.Item
                                    rules={[{ required: true, message: 'Please enter the description' }]}
                                    name="description"
                                    label="Description"
                              >
                                    <TextArea placeholder="Enter session description" />
                              </Form.Item>
                              <Form.Item rules={[{ required: true, message: 'Please enter the fee' }]} name="amount" label="Fee">
                                    <InputNumber type="number" placeholder="Enter fee" style={{ width: '100%' }} />
                              </Form.Item>
                              <Form.Item
                                    rules={[{ required: true, message: 'Please enter total Sessions' }]}
                                    name="sessions"
                                    label="Total Sessions"
                              >
                                    <InputNumber type="number" placeholder="Enter sessions" style={{ width: '100%' }} />
                              </Form.Item>

                              <Form.Item
                                    name="features"
                                    label="Features"
                                    rules={[{ required: true, message: 'Please enter the features' }]}
                              >
                                    <Select mode="tags" maxCount={3} maxLength={3} placeholder="Select features">
                                          <Select.Option value="initial Assessment">Initial Assessment</Select.Option>
                                          <Select.Option value="Basic goal setting">Basic goal setting</Select.Option>
                                          <Select.Option value="Limited access to resources">Limited access to resources</Select.Option>
                                          <Select.Option value="Q&A">Q&A</Select.Option>
                                          <Select.Option value="Fast Response">Fast Response</Select.Option>
                                    </Select>
                              </Form.Item>
                              <Form.Item className="flex-end">
                                    <Button type="primary" htmlType="submit">
                                          {editedPackage ? 'Update' : isLoading || updateLoading ? 'Adding...' : 'Add'}
                                    </Button>
                              </Form.Item>
                        </Form>
                  </Modal>
            </div>
      );
};

export default Package;
