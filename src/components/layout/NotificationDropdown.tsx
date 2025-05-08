'use client';

import { useGetNotificationQuery } from '@/redux/features/notification/notificationApi';
import { List, Pagination } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { IoNotificationsOutline } from 'react-icons/io5';

interface Notification {
      _id: string;
      type: 'success' | 'error' | 'info' | 'warning';
      message: string;
      description?: string;
      read?: boolean;
      createdAt: string;
}

const NotificationDropdown = () => {
      const [page, setPage] = useState(1);
      const { data: notificationData } = useGetNotificationQuery([
            {
                  name: 'page',
                  value: page,
            },
            {
                  name: 'limit',
                  value: 4,
            },
      ]);

      return (
            <div className="bg-white rounded-lg shadow-lg max-w-md  mx-auto p-6">
                  {/* Notification List */}
                  <List
                        itemLayout="horizontal"
                        dataSource={notificationData?.data}
                        locale={{ emptyText: 'No notifications found' }}
                        renderItem={(item: Notification) => (
                              <List.Item className="border-b last:border-b-0 pb-4">
                                    <List.Item.Meta
                                          avatar={<IoNotificationsOutline size={24} color={item.read ? '#FF6F3C' : '#384853'} />}
                                          title={
                                                <span>
                                                      {item.message}{' '}
                                                      {item.description && (
                                                            <a href="#" className="text-orange-500 font-medium">
                                                                  {item.description}
                                                            </a>
                                                      )}
                                                </span>
                                          }
                                          description={<p className="text-gray-600">{moment(item.createdAt).fromNow()}</p>}
                                    />
                              </List.Item>
                        )}
                  />

                  <Pagination
                        total={notificationData?.meta?.total}
                        pageSize={notificationData?.meta?.limit}
                        showSizeChanger={false}
                        current={page}
                        onChange={setPage}
                        className="mt-4 text-center"
                  />
            </div>
      );
};

export default NotificationDropdown;
