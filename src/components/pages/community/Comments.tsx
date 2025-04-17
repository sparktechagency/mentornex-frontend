'use client';
import React from 'react';
import { Avatar, Button, Form, Input, Collapse } from 'antd';
import { getImageUrl } from '@/utils/getImageUrl';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { useAddReplayToReplayMutation } from '@/redux/features/community/communityApi';

const Comment: React.FC<{ comment: any; level?: number }> = ({ comment, level = 0 }) => {
      const router = useRouter();
      const { user } = useAppSelector((state) => state.auth);
      const [showReplyInput, setShowReplyInput] = React.useState(false);
      const [addReplayToReplay, { isLoading }] = useAddReplayToReplayMutation();

      const handleReplyPost = async (values: any) => {
            if (!user) {
                  toast.error('Please login to reply');
                  router.push('/signin');
            }
            try {
                  const res = await addReplayToReplay({ id: comment._id, data: { comment: values.comment } }).unwrap();
                  if (res.success) {
                        toast.success(res.message);
                        setShowReplyInput(false);
                  }
            } catch (error: any) {
                  toast.error(error?.data?.message || 'Failed to reply');
            }
      };

      console.log(level, 'comment');
      return (
            <div className={`relative flex flex-col gap-4 ${level > 0 ? 'ml-12' : ''}`}>
                  {/* Vertical line for nested replies */}

                  <div className="flex items-start gap-4 relative z-10">
                        <Avatar src={getImageUrl(comment.repliedBy?.image)} size="large" />
                        <div className="flex-1">
                              <div className="bg-gray-50 rounded-lg p-3">
                                    <div className="font-semibold">{comment.repliedBy?.name}</div>
                                    <p className="text-gray-600">{comment.comment}</p>
                              </div>
                              <div className="flex gap-4 mt-2 text-sm text-gray-500">
                                    <span>{moment(comment.createdAt).fromNow()}</span>
                                    <button className="hover:text-primary" onClick={() => setShowReplyInput(!showReplyInput)}>
                                          Reply
                                    </button>
                              </div>
                              {showReplyInput && (
                                    <Form onFinish={handleReplyPost}>
                                          <Form.Item name="comment" rules={[{ required: true, message: 'Please enter a reply' }]}>
                                                <Input.TextArea
                                                      placeholder="Write a reply..."
                                                      rows={4}
                                                      style={{ resize: 'none', marginTop: '10px' }}
                                                />
                                          </Form.Item>
                                          <Form.Item>
                                                <Button type="primary" size="small" htmlType="submit">
                                                      {isLoading ? 'Loading...' : 'Reply'}
                                                </Button>
                                          </Form.Item>
                                    </Form>
                              )}
                        </div>
                  </div>
                  {comment.repliesOfReply && comment.repliesOfReply.length > 0 && (
                        <Collapse ghost style={{ marginTop: 8 }}>
                              <Collapse.Panel header={`View Replies (${comment.repliesOfReply.length})`} key="replies">
                                    {comment.repliesOfReply.map((reply: any, index: number) => (
                                          <Comment key={index} comment={reply} level={level + 1} />
                                    ))}
                              </Collapse.Panel>
                        </Collapse>
                  )}
            </div>
      );
};

export default Comment;
