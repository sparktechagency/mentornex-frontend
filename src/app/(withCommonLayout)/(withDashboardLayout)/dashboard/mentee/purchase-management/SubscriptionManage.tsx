'use client';
import { useGetSubscriptionsQuery } from '@/redux/features/subscription/subscriptionApi';
import { useCancelSubscriptionMutation } from '@/redux/features/purchase/purchaseApi';
import { Button } from 'antd';
import React from 'react';
import { IoIosBook, IoMdEye } from 'react-icons/io';
import { toast } from 'react-toastify';

const SubscriptionManage = () => {
      const { data: subscriptions } = useGetSubscriptionsQuery(undefined);
      const [cancelSubscription, { isLoading: cancelLoading }] = useCancelSubscriptionMutation();

      if (!subscriptions || subscriptions.length === 0) {
            return (
                  <div className="p-4 text-center">
                        <p className="text-gray-600 text-lg">No active subscriptions</p>
                        <p className="text-gray-500 text-sm mt-2">You can subscribe to premium content from mentor profiles</p>
                  </div>
            );
      }

      const handleCancelSubscription = async (id: string) => {
            try {
                  const res = await cancelSubscription({ id }).unwrap();
                  if (res.success) {
                        window.open(res.data, '_blank');
                  }
            } catch (error: any) {
                  toast.error(error.data.message || 'Failed to cancel subscription');
            }
      };

      return (
            <div className="space-y-6">
                  {subscriptions.map((subscription: any) => (
                        <div key={subscription._id} className="bg-white rounded-lg custom-shadow p-6">
                              <div className="space-y-4">
                                    <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
                                          ${subscription.amount} <span className="text-2xl text-gray-600">/month</span>
                                    </h1>
                                    <p className="text-gray-600 text-lg leading-relaxed">{subscription.title}</p>
                              </div>

                              <ul className="space-y-4 text-gray-700">
                                    <li className="flex items-center space-x-3 text-lg">
                                          <span className="flex-shrink-0 p-1 text-primary bg-primary/10 rounded-full">
                                                <IoIosBook size={24} />
                                          </span>
                                          <span>Unlimited Access to Premium Content</span>
                                    </li>
                                    <li className="flex items-center space-x-3 text-lg">
                                          <span className="flex-shrink-0 p-1 text-primary bg-primary/10 rounded-full">
                                                <IoMdEye size={24} />
                                          </span>
                                          <span>View All Exclusive Materials</span>
                                    </li>
                              </ul>

                              <Button
                                    onClick={() => handleCancelSubscription(subscription._id)}
                                    type="primary"
                                    block
                                    className="h-12 text-lg font-medium bg-orange-500 hover:bg-orange-600 transition-colors duration-200"
                              >
                                    {cancelLoading ? 'Loading...' : 'Cancel Subscription'}
                              </Button>
                        </div>
                  ))}
            </div>
      );
};

export default SubscriptionManage;
