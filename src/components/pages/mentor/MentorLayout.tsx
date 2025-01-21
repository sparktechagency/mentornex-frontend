'use client';
import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Input, Layout, Pagination, Select, theme } from 'antd';
import { BsSearch } from 'react-icons/bs';
import MentorFilter from './MentorFilter';
import { mentors } from '@/const/constant';
import MentorCard from '@/components/ui/MentorCard';

const { Header, Content } = Layout;

const MentorLayout: React.FC = () => {
      const [collapsed, setCollapsed] = useState(false);

      const {
            token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

      return (
            <div className="container">
                  <div className="hidden">
                        <Header style={{ padding: 0, background: colorBgContainer }}>
                              <Button
                                    type="text"
                                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                    onClick={() => setCollapsed(!collapsed)}
                                    style={{
                                          fontSize: '16px',
                                          width: 64,
                                          height: 64,
                                    }}
                              />
                        </Header>
                  </div>

                  <div className="flex justify-between items-center my-6">
                        <div className="w-full max-w-[300px]">
                              <Input suffix={<BsSearch className="text-subtitle" size={20} />} placeholder="Search" />
                        </div>
                        <div className=" w-fit  flex items-center gap-3">
                              <h2 className="text-lg font-semibold"> Sort by</h2>
                              <div>
                                    <Select style={{ width: 140 }} defaultValue="default">
                                          <Select.Option value="default">Default</Select.Option>
                                          <Select.Option value="alphabetically">Alphabetically</Select.Option>
                                          <Select.Option value="price">Price</Select.Option>
                                          <Select.Option value="newest">Newest</Select.Option>
                                    </Select>
                              </div>
                        </div>
                  </div>

                  <Layout>
                        <MentorFilter collapsed={collapsed} />

                        <Layout>
                              <Content
                                    style={{
                                          margin: '0px 16px',
                                          padding: 24,
                                          minHeight: 280,
                                          background: 'transparent',
                                          borderRadius: borderRadiusLG,
                                    }}
                              >
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                          {mentors.map((mentor) => (
                                                <MentorCard key={mentor.id} mentor={mentor} />
                                          ))}
                                    </div>
                                    <div className="flex justify-center my-10">
                                          <Pagination defaultCurrent={1} total={50} />
                                    </div>
                              </Content>
                        </Layout>
                  </Layout>
            </div>
      );
};

export default MentorLayout;
