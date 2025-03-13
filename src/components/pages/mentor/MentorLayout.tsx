'use client';
import React, { useState } from 'react';
import { Button, Input, Layout, Pagination, Select, theme } from 'antd';
import { BsSearch } from 'react-icons/bs';
import MentorFilter from './MentorFilter';
import { AiOutlineLeftSquare, AiOutlineRightSquare } from 'react-icons/ai';
import { TMentor, useGetAllMentorsQuery } from '@/redux/features/mentor/mentorApi';
import MentorCard from '@/components/ui/MentorCard';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setSort } from '@/redux/features/mentor-filter/mentorFilterSlice';
import { setSearchText } from '@/redux/features/mentor-filter/mentorFilterSlice';

const { Header, Content } = Layout;

const MentorLayout: React.FC = () => {
      const dispatch = useAppDispatch();
      const { language, maxPrice, minPrice, searchText, sort, tools } = useAppSelector((state) => state.mentorFilter);
      const [page, setPage] = useState(1);

      const queryParameters = [
            { name: 'page', value: page },
            { name: 'limit', value: 9 },
            { name: 'searchTerm', value: searchText },
            { name: 'sort', value: sort },
            { name: 'minPrice', value: minPrice },
            { name: 'maxPrice', value: maxPrice },
            ...(language.length > 0 ? language.map((lang) => ({ name: 'language', value: lang })) : []),

            ...(tools.length > 0 ? tools.map((tool) => ({ name: 'tools', value: tool })) : []),
      ];
      const { data: mentorData } = useGetAllMentorsQuery(queryParameters);

      const [collapsed, setCollapsed] = useState(false);

      const {
            token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

      const handleSearch = (value: string) => {
            dispatch(setSearchText(value));
      };

      const handleSort = (value: string) => {
            dispatch(setSort(value));
      };

      return (
            <div className="container">
                  <div className="block md:hidden">
                        <Header style={{ padding: 0, background: colorBgContainer }}>
                              <Button
                                    type="text"
                                    icon={collapsed ? <AiOutlineRightSquare size={30} /> : <AiOutlineLeftSquare size={30} />}
                                    onClick={() => setCollapsed(!collapsed)}
                                    style={{
                                          fontSize: '16px',
                                          width: 64,
                                          height: 64,
                                    }}
                              />
                        </Header>
                  </div>

                  <div className="flex flex-wrap gap-4 justify-between items-center my-6">
                        <div className="w-full max-w-[300px]">
                              <Input
                                    allowClear
                                    onChange={(e) => handleSearch(e.target.value)}
                                    suffix={<BsSearch className="text-subtitle" size={20} />}
                                    placeholder="Search"
                              />
                        </div>
                        <div className=" w-fit  flex items-center gap-3">
                              <h2 className="text-lg font-semibold"> Sort by</h2>
                              <div>
                                    <Select onChange={handleSort} style={{ width: 140 }} defaultValue="newest">
                                          <Select.Option value="newest">Newest</Select.Option>
                                          <Select.Option value="alphabetically">Alphabetically</Select.Option>
                                          <Select.Option value="price">Price</Select.Option>
                                    </Select>
                              </div>
                        </div>
                  </div>

                  <Layout>
                        <MentorFilter collapsed={collapsed} setCollapsed={setCollapsed} />

                        <Layout>
                              <Content
                                    className="overflow-x-scroll custom-scrollbar hide-scrollbar"
                                    style={{
                                          margin: '0px 16px',
                                          // padding: 24,
                                          minHeight: 280,
                                          background: 'transparent',
                                          borderRadius: borderRadiusLG,
                                    }}
                              >
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                          {mentorData?.mentors?.map((mentor: TMentor) => (
                                                <MentorCard key={mentor._id} mentor={mentor!} />
                                          ))}
                                    </div>
                                    <div className="flex justify-center my-10">
                                          <Pagination
                                                current={page}
                                                onChange={setPage}
                                                total={mentorData?.pagination?.total}
                                                pageSize={mentorData?.pagination?.limit}
                                          />
                                    </div>
                              </Content>
                        </Layout>
                  </Layout>
            </div>
      );
};

export default MentorLayout;
