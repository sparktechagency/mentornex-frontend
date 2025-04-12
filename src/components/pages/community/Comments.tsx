'use client';
import React from 'react';
import { Avatar, Button, Input } from 'antd';
import { TComment } from '@/app/(withCommonLayout)/community/page';

const Comment: React.FC<{ comment: TComment; level?: number }> = ({ comment, level = 0 }) => {
      const [showReplyInput, setShowReplyInput] = React.useState(false);

      return (
            <div className={`flex flex-col gap-4 ${level > 0 ? 'ml-12' : ''}`}>
                  <div className="flex items-start gap-4">
                        <Avatar src={comment.avatar} />
                        <div className="flex-1">
                              <div className="bg-gray-50 rounded-lg p-3">
                                    <div className="font-semibold">{comment.author}</div>
                                    <p className="text-gray-600">{comment.content}</p>
                              </div>
                              <div className="flex gap-4 mt-2 text-sm text-gray-500">
                                    <span>{comment.timestamp}</span>
                                    <button className="hover:text-primary" onClick={() => setShowReplyInput(!showReplyInput)}>
                                          Reply
                                    </button>
                              </div>
                              {showReplyInput && (
                                    <div className="mt-2">
                                          <Input.TextArea
                                                placeholder="Write a reply..."
                                                autoSize={{ minRows: 2, maxRows: 4 }}
                                                className="mb-2"
                                          />
                                          <Button type="primary" size="small">
                                                Post Reply
                                          </Button>
                                    </div>
                              )}
                        </div>
                  </div>
                  {comment.replies?.map((reply) => (
                        <Comment key={reply.id} comment={reply} level={level + 1} />
                  ))}
            </div>
      );
};

export default Comment;
