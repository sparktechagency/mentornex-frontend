import Modal from '@/components/ui/Modal';
import {
      useAddSubscriptionMutation,
      useDeleteSubscriptionMutation,
      useUpdateSubscriptionMutation,
} from '@/redux/features/subscription/subscriptionApi';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Popconfirm, Radio, Select } from 'antd';
import { useEffect, useState } from 'react';
import { BsCurrencyDollar, BsPlus } from 'react-icons/bs';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

const Subscription = ({ pricingPlans }: any) => {
      const [isContent, setIsContent] = useState(false); // State to manage content type
      const [editedPlan, setEditedPlan] = useState<any>(null);
      const [form] = Form.useForm();

      useEffect(() => {
            if (editedPlan) {
                  form.setFieldsValue({
                        title: editedPlan.title,
                        description: editedPlan.description,
                        amount: editedPlan.amount,
                        isContent: editedPlan.isContent,
                        sessions: editedPlan.sessions,
                        features: editedPlan.features,
                  });
            }
      }, [editedPlan, form]);

      const handleRadioChange = (e: any) => {
            setIsContent(e.target.value);
      };

      const [addSubscription, { isLoading }] = useAddSubscriptionMutation();
      const [updateSubscription, { isLoading: isUpdating }] = useUpdateSubscriptionMutation();
      const [deleteSubscription] = useDeleteSubscriptionMutation();
      const [isModalOpen, setIsModalOpen] = useState(false);
      const onFinish = async (values: any) => {
            if (editedPlan) {
                  const res = await updateSubscription({ id: editedPlan?._id, data: values }).unwrap();
                  if (res.success) {
                        toast.success(res.message);
                        setIsModalOpen(false);
                        setEditedPlan(null);
                  }
            } else {
                  try {
                        const res = await addSubscription(values).unwrap();
                        if (res.success) {
                              toast.success(res.message);
                              setIsModalOpen(false);
                        }
                  } catch (error: any) {
                        toast.error(error?.data?.message);
                  }
            }
      };

      const handleDelete = async (id: string) => {
            try {
                  const res = await deleteSubscription(id).unwrap();
                  if (res.success) {
                        toast.success(res.message);
                  }
            } catch (error: any) {
                  toast.error(error?.data?.message);
            }
      };
      return (
            <div>
                  <div className="flex-end mb-1">
                        <Button
                              onClick={() => {
                                    setEditedPlan(null);
                                    setIsModalOpen(true);
                              }}
                              icon={<BsPlus />}
                              type="primary"
                        >
                              Add Subscription
                        </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                        {pricingPlans?.map((plan: any) => (
                              <div key={plan?._id} className="p-5 max-w-md h-full flex flex-col rounded-lg custom-shadow">
                                    <div className="mb-3 uppercase text-title text-2xl font-bold">{plan?.title}</div>

                                    <h1 className="text-xl font-semibold">${plan?.amount} / month</h1>

                                    <h1 className="text-xl my-3">
                                          <strong>Total Sessions:</strong>{' '}
                                          <span className="text-[#FF6F3C]">{plan?.sessions === -1 ? 'Unlimited' : plan?.sessions}</span>
                                    </h1>

                                    <p className="text-gray-600 my-4">{plan?.description}</p>

                                    <ul className="space-y-2 list-disc text-gray-600 flex-grow">
                                          {plan?.features?.map((feature: any) => (
                                                <li key={feature} className="flex items-center">
                                                      <IoCheckmarkCircleOutline size={20} color="#FF6F3C" className="mr-2" />
                                                      {feature}
                                                </li>
                                          ))}
                                    </ul>

                                    <div className="flex items-center gap-3 mt-3 bottom-0">
                                          <Button
                                                onClick={() => {
                                                      setEditedPlan(plan);
                                                      setIsModalOpen(true);
                                                }}
                                                type="default"
                                                style={{
                                                      width: '100%',
                                                      border: '1px solid #FF6F3C',
                                                      color: '#FF6F3C',
                                                }}
                                          >
                                                Edit
                                          </Button>
                                          <Popconfirm
                                                title="Are you sure you want to delete this plan?"
                                                onConfirm={() => handleDelete(plan?._id)}
                                          >
                                                <Button
                                                      style={{
                                                            width: '100%',
                                                            border: '1px solid #FF6F3C',
                                                            color: '#FFF',
                                                      }}
                                                      type="primary"
                                                      danger
                                                >
                                                      Delete
                                                </Button>
                                          </Popconfirm>
                                    </div>
                              </div>
                        ))}
                  </div>

                  <Modal
                        title={editedPlan ? 'Edit Subscription' : 'Add Subscription'}
                        visible={isModalOpen}
                        width={600}
                        onCancel={() => setIsModalOpen(false)}
                  >
                        <Form form={form} onFinish={onFinish} layout="vertical">
                              {/* Subscription Name */}
                              <Form.Item
                                    rules={[{ required: true, message: 'Please enter the subscription name' }]}
                                    name="title"
                                    label="Subscription Name"
                              >
                                    <Input placeholder="Enter subscription name" />
                              </Form.Item>

                              {/* Description */}
                              <Form.Item
                                    name="description"
                                    rules={[{ required: true, message: 'Please enter the description' }]}
                                    label="Description"
                              >
                                    <Input.TextArea placeholder="Enter description" />
                              </Form.Item>

                              {/* Fee */}
                              <Form.Item rules={[{ required: true, message: 'Please enter the fee' }]} name="amount" label="Fee">
                                    <InputNumber
                                          style={{ width: '100%' }}
                                          type="number"
                                          addonBefore={<BsCurrencyDollar />}
                                          placeholder="Enter fee"
                                    />
                              </Form.Item>

                              {/* Type of Subscription (Radio Group) */}
                              <Form.Item
                                    name="isContent"
                                    label="Type of Subscription"
                                    rules={[{ required: true, message: 'Please select the type of subscription' }]}
                              >
                                    <Radio.Group defaultValue={isContent} onChange={handleRadioChange}>
                                          <Radio value={true}>Content</Radio>
                                          <Radio value={false}>Sessions</Radio>
                                    </Radio.Group>
                              </Form.Item>

                              {/* Conditional Total Sessions (shown only for Non-Content type) */}
                              {!isContent && (
                                    <Form.Item
                                          name="sessions"
                                          label={
                                                <p>
                                                      Total Sessions
                                                      <span className="text-[#FF6F3C] ms-1 font-semibold">
                                                            (Enter a negative value for Unlimited Sessions)
                                                      </span>
                                                </p>
                                          }
                                          rules={[{ required: true, message: 'Please enter the total sessions' }]}
                                    >
                                          <InputNumber style={{ width: '100%' }} type="number" placeholder="Enter total sessions" />
                                    </Form.Item>
                              )}

                              {/* Features */}
                              <Form.Item
                                    name="features"
                                    label="Features"
                                    rules={[{ required: true, message: 'Please enter the features' }]}
                              >
                                    <Select mode="tags" maxCount={3} maxLength={3} placeholder="Select features">
                                          <Select.Option value="Chat">Chat</Select.Option>
                                          <Select.Option value="Response">Response</Select.Option>
                                          <Select.Option value="One-on-One">One-on-One</Select.Option>
                                          <Select.Option value="Q&A">Q&A</Select.Option>
                                          <Select.Option value="Fast Response">Fast Response</Select.Option>
                                    </Select>
                              </Form.Item>

                              {/* Submit Button */}
                              <Form.Item className="flex-end">
                                    <Button type="primary" htmlType="submit">
                                          {isUpdating || isLoading ? <LoadingOutlined /> : 'Submit'}
                                    </Button>
                              </Form.Item>
                        </Form>
                  </Modal>
            </div>
      );
};

export default Subscription;
