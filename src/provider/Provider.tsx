'use client';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import NextTopLoader from 'nextjs-toploader';
import React, { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/redux/store';

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
                                          fontSize: 14,
                                    },
                                    Input: {
                                          controlHeight: 42,
                                          fontSize: 16,
                                          paddingInline: 24,
                                          inputFontSize: 14,
                                    },
                                    InputNumber: {
                                          controlHeight: 42,
                                    },

                                    Form: {
                                          marginLG: 10,
                                          labelColor: '#636363',
                                          labelFontSize: 16,
                                          labelRequiredMarkColor: '#FF6F3C',
                                    },
                                    DatePicker: {
                                          controlHeight: 42,
                                    },
                                    Table: {
                                          headerBg: '#FFEEE8',
                                    },
                                    Rate: {
                                          starColor: '#FF6F3C',
                                          starSize: 40,
                                    },
                              },
                        }}
                  >
                        <ReduxProvider store={store}>
                              <AntdRegistry>
                                    <NextTopLoader color="#FF6F3C" />
                                    <ToastContainer />

                                    {children}
                              </AntdRegistry>
                        </ReduxProvider>
                  </ConfigProvider>
            </div>
      );
};

export default Provider;
