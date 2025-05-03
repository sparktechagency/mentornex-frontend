'use client';

import { useCancelSubscriptionMutation } from '@/redux/features/purchase/purchaseApi';
import { getImageUrl } from '@/utils/getImageUrl';
import { Button, Table } from 'antd';
import Image from 'next/image';
import React from 'react';
import { IoIosBook, IoMdEye } from 'react-icons/io';
import { toast } from 'react-toastify';

const SubscriptionManage = ({ subscriptions }: { subscriptions: any }) => {
      const [cancelSubscription, { isLoading: cancelLoading }] = useCancelSubscriptionMutation();

      const handleCancelSubscription = async (id: string) => {
            try {
                  const res = await cancelSubscription({ id }).unwrap();
                  if (res.success) {
                        toast.success(res.message);
                  }
            } catch (error: any) {
                  toast.error(error.data.message || 'Failed to cancel subscription');
            }
      };

      if (!subscriptions || subscriptions.length === 0) {
            return (
                  <div className="text-center py-8">
                        <p className="text-gray-600">No subscriptions purchased yet</p>
                        <p className="text-gray-500 text-sm mt-2">You can purchase subscriptions from mentor profiles</p>
                  </div>
            );
      }

      const columns = [
            {
                  title: 'Mentor Name',
                  dataIndex: 'mentor_id',
                  key: 'mentor_id',
                  render: (text: string, record: any) => {
                        return (
                              <div className="flex items-center space-x-2">
                                    <Image
                                          className="rounded-full size-10"
                                          src={getImageUrl(record?.mentor_id?.image)}
                                          width={50}
                                          height={50}
                                          alt="mentor"
                                    />
                                    <span>{record.mentor_id.name}</span>
                              </div>
                        );
                  },
            },
            {
                  title: 'Price',
                  dataIndex: 'amount',
                  key: 'amount',
                  render: (amount: number) => `$${amount} /month`,
            },
            {
                  title: 'Features',
                  dataIndex: 'features',
                  key: 'features',
                  render: () => (
                        <ul className="space-y-2">
                              <li className="flex items-center space-x-2">
                                    <span className="flex-shrink-0 p-1 text-primary bg-primary/10 rounded-full">
                                          <IoIosBook size={20} />
                                    </span>
                                    <span>Unlimited Access to Premium Content</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                    <span className="flex-shrink-0 p-1 text-primary bg-primary/10 rounded-full">
                                          <IoMdEye size={20} />
                                    </span>
                                    <span>View All Exclusive Materials</span>
                              </li>
                        </ul>
                  ),
            },
            {
                  title: 'Actions',
                  key: 'actions',
                  render: (text: string, record: any) => (
                        <Button
                              onClick={() => handleCancelSubscription(record._id)}
                              type="primary"
                              className="bg-orange-500 hover:bg-orange-600 transition-colors duration-200"
                        >
                              {cancelLoading ? 'Loading...' : 'Cancel Subscription'}
                        </Button>
                  ),
            },
      ];

      return (
            <div className="space-y-6">
                  <Table columns={columns} dataSource={subscriptions} className="custom-shadow" pagination={false} rowKey="_id" />
            </div>
      );
};

export default SubscriptionManage;
