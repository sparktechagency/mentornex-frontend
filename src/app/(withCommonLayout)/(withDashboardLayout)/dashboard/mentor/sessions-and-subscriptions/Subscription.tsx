import Modal from '@/components/ui/Modal';
import { useAddSubscriptionMutation, useUpdateSubscriptionMutation } from '@/redux/features/subscription/subscriptionApi';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Form, InputNumber } from 'antd';
import { useEffect, useState } from 'react';
import { BsCurrencyDollar, BsPlus } from 'react-icons/bs';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

const Subscription = ({ pricingPlans }: any) => {
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

      const [addSubscription, { isLoading }] = useAddSubscriptionMutation();
      const [updateSubscription, { isLoading: isUpdating }] = useUpdateSubscriptionMutation();
      // const [deleteSubscription] = useDeleteSubscriptionMutation();
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

      // const handleDelete = async (id: string) => {
      //       try {
      //             const res = await deleteSubscription(id).unwrap();
      //             if (res.success) {
      //                   toast.success(res.message);
      //             }
      //       } catch (error: any) {
      //             toast.error(error?.data?.message);
      //       }
      // };
      return (
            <div>
                  <div className="grid grid-cols-3 gap-4">
                        {pricingPlans?.length === 0 ? (
                              <div className="col-span-3 text-center py-8">
                                    <Button
                                          onClick={() => {
                                                setEditedPlan(null);
                                                setIsModalOpen(true);
                                          }}
                                          icon={<BsPlus />}
                                          type="primary"
                                          className="w-full"
                                    >
                                          Add Premium Content Subscription
                                    </Button>
                              </div>
                        ) : (
                              pricingPlans?.map((plan: any) => (
                                    <div key={plan?._id} className="p-5 max-w-md h-full flex flex-col rounded-lg custom-shadow">
                                          <div className="mb-3 uppercase text-title text-2xl font-bold">{plan?.title}</div>

                                          <h1 className="text-xl font-semibold">${plan?.amount} / month</h1>

                                          <div className="text-sm text-gray-500 mt-2 mb-4">
                                                This is a premium content subscription that grants users access to your exclusive materials.
                                                <br />
                                                <span className="font-medium">Note:</span> You can only have one active premium content
                                                subscription at a time.
                                          </div>

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
                                                {/* <Popconfirm
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
                                          </Popconfirm> */}
                                          </div>
                                    </div>
                              ))
                        )}
                  </div>

                  <Modal
                        title={editedPlan ? 'Edit Premium Content Subscription' : 'Add Premium Content Subscription'}
                        visible={isModalOpen}
                        width={600}
                        onCancel={() => setIsModalOpen(false)}
                  >
                        <div className="mb-4 text-sm text-gray-600">
                              This subscription will grant users access to your premium content and exclusive materials. Users will be able
                              to view all your premium content for the specified fee.
                        </div>

                        <Form form={form} onFinish={onFinish} layout="vertical">
                              {/* Fee */}
                              <Form.Item
                                    rules={[{ required: true, message: 'Please enter the fee' }]}
                                    name="amount"
                                    label={
                                          <div>
                                                Monthly Fee
                                                <span className="text-sm text-gray-500 block">
                                                      This is the monthly fee users will pay to access your premium content
                                                </span>
                                          </div>
                                    }
                              >
                                    <InputNumber
                                          style={{ width: '100%' }}
                                          type="number"
                                          addonBefore={<BsCurrencyDollar />}
                                          placeholder="Enter monthly fee"
                                    />
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
