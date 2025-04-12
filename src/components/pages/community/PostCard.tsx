'use client';
import React from 'react';
import { Avatar, Button, Card, Input, Tooltip } from 'antd';
import { HeartOutlined, CommentOutlined } from '@ant-design/icons';
import Comment from './Comments';

const PostCard: React.FC<{ post: any }> = ({ post }) => {
      const [showComments, setShowComments] = React.useState(false);

      return (
            <Card className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                        <Avatar src={post.avatar} size="large" />
                        <div>
                              <div className="font-semibold">{post.author}</div>
                              <div className="text-sm text-gray-500">{post.timestamp}</div>
                        </div>
                  </div>
                  <p className="text-gray-700 mb-4">{post.content}</p>
                  <div className="flex gap-6 text-gray-500 border-t border-b py-2">
                        <Tooltip title="Like">
                              <button className="flex items-center gap-2 hover:text-primary">
                                    <HeartOutlined /> {post.likes}
                              </button>
                        </Tooltip>
                        <Tooltip title="Comment">
                              <button className="flex items-center gap-2 hover:text-primary" onClick={() => setShowComments(!showComments)}>
                                    <CommentOutlined /> {post.comments.length}
                              </button>
                        </Tooltip>
                  </div>
                  {showComments && (
                        <div className="mt-4 space-y-4">
                              {post.comments.map((comment: any) => (
                                    <Comment key={comment.id} comment={comment} />
                              ))}
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
