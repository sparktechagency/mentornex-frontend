'use client';

import { List, Button } from 'antd';
import { IoNotificationsOutline } from 'react-icons/io5';

const notifications = [
      {
            id: 1,
            title: 'New Mentor Match!',
            description: "We've found a mentor who matches your profile and learning goals.",
            actionText: 'Check them out now',
            isUnread: true,
      },
      {
            id: 2,
            title: 'Session Reminder!',
            description: 'Your session with Mark Taylor is scheduled for tomorrow at 3:00 PM. Don’t miss it!',
            isUnread: true,
      },
      {
            id: 3,
            title: 'Subscription Renewed',
            description: 'Your monthly subscription has been successfully renewed. Keep learning with uninterrupted access.',
            isUnread: false,
      },
      {
            id: 4,
            title: 'Milestone Achieved',
            description: 'You’ve completed 5 sessions! Keep learning and growing with our expert mentors.',
            isUnread: false,
      },
];

const NotificationDropdown = () => {
      return (
            <div className="bg-white rounded-lg shadow-lg max-w-md  mx-auto p-6">
                  {/* Notification List */}
                  <List
                        itemLayout="horizontal"
                        dataSource={notifications}
                        renderItem={(item) => (
                              <List.Item className="border-b last:border-b-0 pb-4">
                                    <List.Item.Meta
                                          avatar={<IoNotificationsOutline size={24} color={item.isUnread ? '#FF6F3C' : '#384853'} />}
                                          title={
                                                <span>
                                                      {item.title}{' '}
                                                      {item.actionText && (
                                                            <a href="#" className="text-orange-500 font-medium">
                                                                  {item.actionText}
                                                            </a>
                                                      )}
                                                </span>
                                          }
                                          description={<p className="text-gray-600">{item.description}</p>}
                                    />
                              </List.Item>
                        )}
                  />

                  <div className="flex justify-between mt-4">
                        <Button
                              style={{
                                    color: '#FF6F3C',
                              }}
                              type="link"
                        >
                              View all notifications
                        </Button>
                        <Button
                              style={{
                                    color: '#384853',
                              }}
                              type="link"
                        >
                              Mark all as read
                        </Button>
                  </div>
            </div>
      );
};

export default NotificationDropdown;
