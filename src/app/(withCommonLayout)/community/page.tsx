'use client';
import React, { useState } from 'react';
import { Button, Select } from 'antd';
import PostCard from '@/components/pages/community/PostCard';
import { useGetAllPostsQuery } from '@/redux/features/community/communityApi';
import Modal from '@/components/ui/Modal';
import Post from '@/components/pages/community/Post';

const CommunityPage = () => {
      const { data: postData } = useGetAllPostsQuery([]);
      const [openModel, setOpenModel] = useState(false);
      // console.log('postData', postData);
      return (
            <div className="container px-4 py-4">
                  <div className="max-w-6xl mx-auto">
                        <div className="flex justify-end mb-4">
                              <Button onClick={() => setOpenModel(true)} type="primary">
                                    Create Post
                              </Button>
                        </div>
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

                  <Modal width={800} title="Create Post" visible={openModel} onCancel={() => setOpenModel(false)}>
                        <Post setOpenModel={setOpenModel} />
                  </Modal>
            </div>
      );
};

export default CommunityPage;
