'use client';
import React, { useState } from 'react';

import { Layout, theme, ConfigProvider } from 'antd';
import ProfileSidebar from '@/components/pages/dashboard/SidebarProfile';
import { AiOutlineLeftSquare, AiOutlineRightSquare } from 'react-icons/ai';
import ProfileBanner from '@/components/shared/ProfileBanner';

const { Header, Content, Sider } = Layout;

const ProfileLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <ProfileBanner needUpload />
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
            // breakpoint="lg"
            collapsedWidth="0"
            // collapsible
            className="-mt-52  rounded-lg drop-shadow"
            collapsed={collapsed}
            onCollapse={(isCollapsed) => setCollapsed(isCollapsed)}
          >
            <ProfileSidebar />
          </Sider>
        </ConfigProvider>
        <Layout className="-mt-20 ">
          <Header
            style={{
              background: colorBgContainer,
              padding: 20,
            }}
          >
            <button onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <AiOutlineRightSquare size={30} /> : <AiOutlineLeftSquare size={30} />}
            </button>
          </Header>
          <Content>
            <div className="w-full p-6 overflow-x-scroll custom-scrollbar hide-scrollbar">
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default ProfileLayout;
