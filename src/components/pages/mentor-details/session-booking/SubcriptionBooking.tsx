import { useCancelSubscriptionMutation, usePurchaseSubscriptionMutation } from '@/redux/features/purchase/purchaseApi';
import { Button } from 'antd';
import React from 'react';
import { IoIosBook, IoMdEye } from 'react-icons/io';
import { toast } from 'react-toastify';

const SubscriptionBooking = ({ profile, subscriptions }: { profile: any; subscriptions: any[] }) => {
      const [purchaseSubscription, { isLoading }] = usePurchaseSubscriptionMutation();
      const [cancelSubscription, { isLoading: cancelLoading }] = useCancelSubscriptionMutation();
      if (!subscriptions || subscriptions.length === 0) {
            return (
                  <div className="w-full p-4 text-center">
                        <p className="text-gray-600 text-lg">No subscription plan available</p>
                        <p className="text-gray-500 text-sm mt-2">Please contact the mentor for subscription details</p>
                  </div>
            );
      }

      const firstSubscription = subscriptions[0];

      const handlePurchaseSubscription = async () => {
            try {
                  const res = await purchaseSubscription({ id: firstSubscription._id }).unwrap();
                  if (res.success) {
                        window.open(res.data, '_blank');
                  }
            } catch (error: any) {
                  toast.error(error.data.message || 'Failed to purchase subscription');
            }
      };

      const handleCancelSubscription = async () => {
            try {
                  console.log(firstSubscription._id);
                  const res = await cancelSubscription({ id: firstSubscription._id }).unwrap();
                  if (res.success) {
                        window.open(res.data, '_blank');
                  }
            } catch (error: any) {
                  toast.error(error.data.message || 'Failed to cancel subscription');
            }
      };

      return (
            <div className="w-full">
                  <div className="p-4 space-y-6">
                        <div className="w-full text-2xl font-semibold text-gray-800">Content Viewing Subscription</div>

                        <div className="space-y-4">
                              <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
                                    ${firstSubscription?.amount || 0} <span className="text-2xl text-gray-600">/month</span>
                              </h1>
                              <p className="text-gray-600 text-lg leading-relaxed">
                                    Access premium content, exclusive materials, and personalized learning resources.
                              </p>
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

                        {profile?.isSubscribed ? (
                              <Button
                                    onClick={handleCancelSubscription}
                                    type="primary"
                                    block
                                    className="h-12 text-lg font-medium bg-orange-500 hover:bg-orange-600 transition-colors duration-200"
                              >
                                    {cancelLoading ? 'Loading...' : 'Cancel Subscription'}
                              </Button>
                        ) : (
                              <Button
                                    onClick={handlePurchaseSubscription}
                                    type="primary"
                                    block
                                    className="h-12 text-lg font-medium bg-orange-500 hover:bg-orange-600 transition-colors duration-200"
                              >
                                    {isLoading ? 'Loading...' : 'Subscribe Now'}
                              </Button>
                        )}
                  </div>
            </div>
      );
};

export default SubscriptionBooking;
