'use client';
import Modal from '@/components/ui/Modal';
import { Button, Form, Input, InputNumber, Popconfirm, Tooltip } from 'antd';
import { useState } from 'react';
import { BsPencil, BsPlus, BsTrash } from 'react-icons/bs';

const Sessions = () => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const sessions = [
            {
                  name: 'Career Guided Session',
                  duration: '30 min',
                  fee: '$30',
            },
            {
                  name: 'Career Guided Session',
                  duration: '30 min',
                  fee: '$30',
            },
            {
                  name: 'Career Guided Session',
                  duration: '30 min',
                  fee: '$30',
            },
            {
                  name: 'Career Guided Session',
                  duration: '30 min',
                  fee: '$30',
            },
      ];

      const onFinish = (values: any) => {
            console.log('Success:', values);
            setIsModalOpen(false);
      };
      return (
            <div>
                  <div className="flex-end mb-3">
                        <Button onClick={() => setIsModalOpen(true)} icon={<BsPlus />} type="primary">
                              Add Session
                        </Button>
                  </div>
                  {sessions.map((session, index) => (
                        <div className="border rounded-lg p-3 mb-2" key={index}>
                              <div className="flex-between">
                                    <div>
                                          <h3 className="font-semibold text-lg">{session.name}</h3>
                                          <div className="flex gap-5">
                                                <p>{session.duration}</p>
                                                <p>{session.fee} per session</p>
                                          </div>
                                    </div>
                                    <div>
                                          <div className="flex gap-5">
                                                <Tooltip title="Edit">
                                                      <button className="text-green-500">
                                                            <BsPencil size={20} />
                                                      </button>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                      <Popconfirm title="Are you sure to delete this session?" onConfirm={() => {}}>
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

                  <Modal title="Add Session" visible={isModalOpen} width={600} onCancel={() => setIsModalOpen(false)}>
                        <Form onFinish={onFinish} layout="vertical">
                              <Form.Item
                                    rules={[{ required: true, message: 'Please enter the session name' }]}
                                    name="sessionName"
                                    label="Session Name"
                              >
                                    <Input placeholder="Enter session name" />
                              </Form.Item>
                              <Form.Item rules={[{ required: true, message: 'Please enter the fee' }]} name="fee" label="Fee">
                                    <InputNumber type="number" placeholder="Enter fee" style={{ width: '100%' }} />
                              </Form.Item>
                              <Form.Item
                                    rules={[{ required: true, message: 'Please enter the duration' }]}
                                    name="duration"
                                    label="Duration"
                              >
                                    <Input addonBefore="Min" placeholder="Enter duration" />
                              </Form.Item>
                              <Form.Item className="flex-end">
                                    <Button type="primary" htmlType="submit">
                                          Submit
                                    </Button>
                              </Form.Item>
                        </Form>
                  </Modal>
            </div>
      );
};

export default Sessions;
