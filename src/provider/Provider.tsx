import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import React, { ReactNode } from 'react';

const Provider = ({ children }: { children: ReactNode }) => {
      return (
            <div>
                  <ConfigProvider
                        theme={{
                              token: {
                                    colorPrimary: '#FF6F3C',
                              },
                              components: {
                                    Button: {
                                          controlHeight: 48,

                                          fontSize: 16,
                                          paddingInline: 24,
                                    },
                                    Input: {
                                          controlHeight: 42,

                                          fontSize: 16,
                                          paddingInline: 24,
                                    },
                              },
                        }}
                  >
                        <AntdRegistry>{children}</AntdRegistry>
                  </ConfigProvider>
            </div>
      );
};

export default Provider;
