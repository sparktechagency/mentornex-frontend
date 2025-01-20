import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import NextTopLoader from 'nextjs-toploader';
import React, { ReactNode } from 'react';

const Provider = ({ children }: { children: ReactNode }) => {
      return (
            <div>
                  <ConfigProvider
                        theme={{
                              token: {
                                    colorPrimary: '#FF6F3C',
                                    fontFamily: 'Poppins, sans-serif',
                                    fontSize: 16,
                              },
                              components: {
                                    Button: {
                                          controlHeight: 48,

                                          fontSize: 16,
                                          paddingInline: 24,
                                    },
                                    Typography: {
                                          colorText: '#333333',
                                    },
                                    Select: {
                                          controlHeight: 42,
                                    },
                                    Input: {
                                          controlHeight: 42,
                                          fontSize: 16,
                                          paddingInline: 24,
                                    },
                                    InputNumber: {
                                          controlHeight: 42,
                                    },
                                    Form: {
                                          marginLG: 10,
                                          labelColor: '#636363',
                                          labelFontSize: 18,
                                    },
                              },
                        }}
                  >
                        <AntdRegistry>
                              <NextTopLoader color="#FF6F3C" />
                              {children}
                        </AntdRegistry>
                  </ConfigProvider>
            </div>
      );
};

export default Provider;
