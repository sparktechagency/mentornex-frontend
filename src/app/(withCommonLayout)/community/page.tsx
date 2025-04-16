'use client';
import React from 'react';
import { Card, Select } from 'antd';
import PostCard from '@/components/pages/community/PostCard';
import Post from '@/components/pages/community/Post';
import { useGetAllPostsQuery } from '@/redux/features/community/communityApi';

const CommunityPage = () => {
      const { data: postData } = useGetAllPostsQuery([]);
      // console.log('postData', postData);
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
                        {postData?.data?.map((post: any) => (
                              <PostCard key={post.id} post={post} />
                        ))}
                  </div>
            </div>
      );
};

export default CommunityPage;
