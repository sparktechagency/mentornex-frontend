'use client';
import React from 'react';
import { Avatar, Card, Form, Input, Tooltip } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { TPost, useAddReplayToPostMutation, useVotePostMutation } from '@/redux/features/community/communityApi';
import { getImageUrl } from '@/utils/getImageUrl';
import moment from 'moment';
import { toast } from 'react-toastify';
import Comment from './Comments';

const PostCard: React.FC<{ post: TPost }> = ({ post }) => {
      const [votePost] = useVotePostMutation();
      const [showComments, setShowComments] = React.useState(false);
      const [addReplayToPost, { isLoading }] = useAddReplayToPostMutation();
      const [form] = Form.useForm();

      const handleVotePost = async (type: 'up' | 'down') => {
            try {
                  const res = await votePost({ id: post._id, data: { voteType: type === 'up' ? 'upVote' : 'downVote' } }).unwrap();
                  if (res.success) {
                        toast.success(res.message);
                  }
            } catch (error: any) {
                  toast.error(error?.data?.message || 'Failed to vote');
            }
      };

      const handleNewComment = async (values: any) => {
            try {
                  const res = await addReplayToPost({ id: post._id, data: { comment: values.comment } }).unwrap();
                  if (res.success) {
                        toast.success(res.message);
                        form.resetFields();
                  }
            } catch (error: any) {
                  toast.error(error?.data?.message || 'Failed to add comment');
            }
      };

      return (
            <Card className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                        <Avatar src={getImageUrl(post?.postedBy?.image)} size="large" />
                        <div>
                              <div className="font-semibold">{post.postedBy?.name}</div>
                              <div className="text-sm text-gray-500">{moment(post.createdAt).fromNow()}</div>
                        </div>
                  </div>
                  <div className="space-y-2 mb-4">
                        <h2 className="text-lg font-semibold">{post.title}</h2>
                        <p className="text-gray-700 mb-4">{post.description}</p>
                  </div>
                  <div className="flex gap-6 text-gray-500 border-t border-b py-2">
                        <div className="flex items-center gap-2">
                              <Tooltip title="Upvote">
                                    <button
                                          onClick={() => handleVotePost('up')}
                                          className="flex items-center text-green-500 hover:text-green-500"
                                    >
                                          <ArrowUpOutlined />
                                    </button>
                              </Tooltip>
                              <span className="mx-2">{post.upVotes}</span>
                              <Tooltip title="Downvote">
                                    <button
                                          onClick={() => handleVotePost('down')}
                                          className="flex items-center text-red-500 hover:text-red-500"
                                    >
                                          <ArrowDownOutlined />
                                    </button>
                              </Tooltip>
                              <span className="mx-2">{post.downVotes}</span>
                        </div>
                        <Tooltip title="Comment">
                              <button className="flex items-center gap-2 hover:text-primary" onClick={() => setShowComments(!showComments)}>
                                    {post?.replies?.length} <CommentOutlined />
                              </button>
                        </Tooltip>
                  </div>
                  {showComments && (
                        <div className="mt-4 space-y-4">
                              {post?.replies?.map((comment: any) => (
                                    <Comment key={comment._id} comment={comment} level={0} />
                              ))}

                              <Form form={form} onFinish={handleNewComment} layout="vertical">
                                    <Form.Item
                                          name="comment"
                                          label="Your Comment"
                                          rules={[{ required: true, message: 'Please type a comment' }]}
                                    >
                                          <Input placeholder="Add a comment" />
                                    </Form.Item>
                                    <Form.Item>
                                          <button type="submit" className="bg-primary-500 text-white px-4 py-1 rounded">
                                                {isLoading ? 'Adding...' : 'Add Comment'}
                                          </button>
                                    </Form.Item>
                              </Form>
                        </div>
                  )}
            </Card>
      );
};

export default PostCard;
