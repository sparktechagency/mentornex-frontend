'use client';
import React from 'react';
import { Card, Select } from 'antd';
import PostCard from '@/components/pages/community/PostCard';
import Post from '@/components/pages/community/Post';

export interface TComment {
      id: string;
      author: string;
      avatar: string;
      content: string;
      timestamp: string;
      replies?: TComment[];
}

interface Post {
      id: string;
      author: string;
      avatar: string;
      content: string;
      timestamp: string;
      likes: number;
      comments: TComment[];
}

const mockPosts: Post[] = [
      {
            id: '1',
            author: 'John Doe',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
            content: 'Just completed my first mentoring session! It was an amazing experience helping someone grow in their career. #mentoring #growth',
            timestamp: '2 hours ago',
            likes: 24,
            comments: [
                  {
                        id: '1-1',
                        author: 'Alice Smith',
                        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
                        content: "That's fantastic! How did it go?",
                        timestamp: '1 hour ago',
                        replies: [
                              {
                                    id: '1-1-1',
                                    author: 'John Doe',
                                    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
                                    content: 'It went really well! We focused on career development strategies.',
                                    timestamp: '45 minutes ago',
                              },
                        ],
                  },
            ],
      },
];

const CommunityPage = () => {
      return (
            <div className="container px-4 py-4">
                  <div className="max-w-6xl mx-auto">
                        <Card className="mb-4">
                              <Post />
                        </Card>
                        <div className="flex justify-between mb-3">
                              <h2 className="text-2xl font-semibold">Community Posts</h2>
                              <Select placeholder="Filter" className="w-[140px]" size="middle">
                                    <Select.Option value="latest">Latest</Select.Option>
                                    <Select.Option value="oldest">Oldest</Select.Option>
                                    <Select.Option value="popular">Popular</Select.Option>
                              </Select>
                        </div>
                        {mockPosts.map((post) => (
                              <PostCard key={post.id} post={post} />
                        ))}
                  </div>
            </div>
      );
};

export default CommunityPage;
