'use client';
import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, theme, Button, ConfigProvider } from 'antd';
import ProfileSidebar from '@/components/pages/dashboard/SidebarProfile';

const { Header, Content, Sider } = Layout;

const ProfileLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      const {
            token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
      const [collapsed, setCollapsed] = useState(false);

      return (
            <div>
                  <div className="bg-primary-100 h-[250px]"></div>
                  <Layout className="container my-20">
                        <ConfigProvider
                              theme={{
                                    components: {
                                          Menu: {
                                                itemSelectedBg: '#FF6F3C',
                                                itemSelectedColor: '#FFFFFF',
                                          },
                                    },
                              }}
                        >
                              <Sider
                                    width={282}
                                    theme="light"
                                    breakpoint="lg"
                                    collapsedWidth="0"
                                    // collapsible
                                    className="-mt-52 rounded-lg drop-shadow"
                                    collapsed={collapsed}
                                    onCollapse={(isCollapsed) => setCollapsed(isCollapsed)}
                              >
                                    <ProfileSidebar />
                              </Sider>
                        </ConfigProvider>
                        <Layout>
                              <Header
                                    style={{
                                          padding: '0 16px',
                                          background: colorBgContainer,
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'space-between',
                                    }}
                              >
                                    <Button
                                          type="text"
                                          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                          onClick={() => setCollapsed(!collapsed)}
                                          style={{ fontSize: '16px', width: '48px', height: '48px' }}
                                    />
                              </Header>
                              <Content style={{ margin: '24px 16px 0' }}>
                                    <div
                                          style={{
                                                padding: 24,
                                                minHeight: 360,
                                                background: colorBgContainer,
                                                borderRadius: borderRadiusLG,
                                          }}
                                    >
                                          {children}
                                    </div>
                              </Content>
                        </Layout>
                  </Layout>
            </div>
      );
};

export default ProfileLayout;
