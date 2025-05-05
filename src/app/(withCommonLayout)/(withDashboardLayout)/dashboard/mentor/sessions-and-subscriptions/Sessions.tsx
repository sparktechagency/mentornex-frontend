'use client';
import Modal from '@/components/ui/Modal';
import {
      useAddPayPerSessionMutation,
      useDeletePayPerSessionMutation,
      useUpdatePayPerSessionMutation,
} from '@/redux/features/pay-per-session/pay-per-sessionApi';
import { Button, Form, Input, InputNumber, Popconfirm, Tooltip } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { BsPencil, BsPlus, BsTrash } from 'react-icons/bs';
import { toast } from 'react-toastify';

const Sessions = ({ sessions }: any) => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [form] = Form.useForm();
      const [editedSession, setEditedSession] = useState<any>(null);
      const [createSession, { isLoading: isCreating }] = useAddPayPerSessionMutation();
      const [updateSession, { isLoading: isUpdating }] = useUpdatePayPerSessionMutation();
      const [deleteSession] = useDeletePayPerSessionMutation();
      useEffect(() => {
            if (editedSession) {
                  form.setFieldsValue({
                        title: editedSession?.title,
                        description: editedSession?.description,
                        amount: editedSession?.amount,
                        duration: editedSession?.duration,
                  });
            }
      });
      const onFinish = async (values: any) => {
            if (editedSession) {
                  try {
                        const res = await updateSession({ id: editedSession._id, perPerSession: values }).unwrap();
                        if (res?.success) {
                              toast.success(res?.message);
                              setIsModalOpen(false);
                        }
                  } catch (error: any) {
                        toast.error(error?.data?.message || error?.error);
                  }
            } else {
                  try {
                        const res = await createSession(values).unwrap();
                        if (res?.success) {
                              toast.success(res?.message);
                              setIsModalOpen(false);
                        }
                  } catch (error: any) {
                        toast.error(error?.data?.message || error?.error);
                  }
            }
      };

      const handleDelete = async (id: string) => {
            try {
                  const res = await deleteSession(id).unwrap();
                  if (res?.success) {
                        toast.success(res?.message);
                  }
            } catch (error: any) {
                  toast.error(error?.data?.message || error?.error);
            }
      };

      return (
            <div>
                  <div className="flex-end mb-3">
                        <Button
                              onClick={() => {
                                    setEditedSession(null);
                                    setIsModalOpen(true);
                              }}
                              icon={<BsPlus />}
                              type="primary"
                        >
                              Add Session
                        </Button>
                  </div>
                  {sessions?.map((session: any, index: string) => (
                        <div className="border rounded-lg p-3 mb-2" key={index}>
                              <div className="flex-between">
                                    <div>
                                          <h3 className="font-semibold text-lg">{session.title}</h3>
                                          <div className="flex gap-5">
                                                <p>{session.duration} min</p>
                                                <p>${session.amount} per session</p>
                                          </div>
                                    </div>
                                    <div>
                                          <div className="flex gap-5">
                                                <Tooltip title="Edit">
                                                      <button
                                                            onClick={() => {
                                                                  setEditedSession(session);
                                                                  setIsModalOpen(true);
                                                            }}
                                                            className="text-green-500"
                                                      >
                                                            <BsPencil size={20} />
                                                      </button>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                      <Popconfirm
                                                            title="Are you sure to delete this session?"
                                                            onConfirm={() => handleDelete(session._id)}
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

                  <Modal
                        title={editedSession ? 'Update Session' : 'Add Session'}
                        visible={isModalOpen}
                        width={600}
                        onCancel={() => setIsModalOpen(false)}
                  >
                        <Form form={form} onFinish={onFinish} layout="vertical">
                              <Form.Item
                                    rules={[{ required: true, message: 'Please enter the session name' }]}
                                    name="title"
                                    label="Session Name"
                              >
                                    <Input placeholder="Enter session name" />
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
                              {/* <Form.Item
                                    rules={[{ required: true, message: 'Please enter the duration' }]}
                                    name="duration"
                                    label="Duration"
                              >
                                    <Input addonBefore="Min" placeholder="Enter duration" />
                              </Form.Item> */}
                              <Form.Item className="flex-end">
                                    <Button type="primary" htmlType="submit">
                                          {editedSession ? 'Update' : 'Add'} {isCreating || isUpdating ? '...' : ''}
                                    </Button>
                              </Form.Item>
                        </Form>
                  </Modal>
            </div>
      );
};

export default Sessions;
