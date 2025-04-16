'use client';
import React from 'react';
import { Avatar, Button, Card, Input, Tooltip } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { TPost, useVotePostMutation } from '@/redux/features/community/communityApi';
import { getImageUrl } from '@/utils/getImageUrl';
import moment from 'moment';
import { toast } from 'react-toastify';

const PostCard: React.FC<{ post: TPost }> = ({ post }) => {
      const [votePost] = useVotePostMutation();
      const [showComments, setShowComments] = React.useState(false);

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

      return (
            <Card className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                        <Avatar src={getImageUrl(post?.postedBy?.image)} size="large" />
                        <div>
                              <div className="font-semibold">{post.postedBy?.name}</div>
                              <div className="text-sm text-gray-500">{moment(post.createdAt).fromNow()}</div>
                        </div>
                  </div>
                  <p className="text-gray-700 mb-4">{post.description}</p>
                  <div className="flex gap-6 text-gray-500 border-t border-b py-2">
                        <div className="flex items-center gap-2">
                              <Tooltip title="Upvote">
                                    <button onClick={() => handleVotePost('up')} className="flex items-center hover:text-green-500">
                                          <ArrowUpOutlined />
                                    </button>
                              </Tooltip>
                              <span className="mx-2">{post.upVotes}</span>
                              <Tooltip title="Downvote">
                                    <button onClick={() => handleVotePost('down')} className="flex items-center hover:text-red-500">
                                          <ArrowDownOutlined />
                                    </button>
                              </Tooltip>
                              <span className="mx-2">{post.downVotes}</span>
                        </div>
                        <Tooltip title="Comment">
                              <button className="flex items-center gap-2 hover:text-primary" onClick={() => setShowComments(!showComments)}>
                                    <CommentOutlined />
                              </button>
                        </Tooltip>
                  </div>
                  {showComments && (
                        <div className="mt-4 space-y-4">
                              {/* {post.comments.map((comment: any) => (
                                    <Comment key={comment.id} comment={comment} />
                              ))} */}
                              <div className="flex gap-4 mt-4">
                                    <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" />
                                    <div className="flex-1">
                                          <Input.TextArea
                                                placeholder="Write a comment..."
                                                autoSize={{ minRows: 2, maxRows: 4 }}
                                                className="mb-2"
                                          />
                                          <Button type="primary">Post Comment</Button>
                                    </div>
                              </div>
                        </div>
                  )}
            </Card>
      );
};

export default PostCard;
