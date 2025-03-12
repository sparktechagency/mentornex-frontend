'use client';
import React from 'react';
import { Collapse, Input } from 'antd';
import NeedHelpSection from './NeedHelpSection';
import { SearchIcon } from 'lucide-react';
import { TFaq, useGetFaqsQuery } from '@/redux/features/faq/faqApi';

const { Panel } = Collapse;

const FAQPage = () => {
      const [search, setSearch] = React.useState('');

      const { data: faqsData } = useGetFaqsQuery([
            {
                  name: 'searchTerm',
                  value: search,
            },
      ]);
      const [activeKey, setActiveKey] = React.useState<string>('0');

      const customPanelStyle = (key: string) => {
            return {
                  background: activeKey === key ? '#FFF1EC' : '#fff',

                  color: activeKey === key ? 'white' : 'black',
                  border: '1px solid #e8e8e8',
                  borderRadius: '8px',
                  marginBottom: '16px',
            };
      };

      return (
            <div>
                  <div className="faq-section  max-w-4xl mx-auto p-6 my-20">
                        <h2 className="text-4xl lg:text-[150px] font-bold text-[#05264E] text-start mb-4">FAQs</h2>
                        <p className="text-start text-gray-600 mb-8 mt-20">
                              Get answers to your questions and learn how MentorNex can help you achieve your goals.
                        </p>

                        <div className="mb-4">
                              <Input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    style={{
                                          width: '100%',
                                          height: '45px',
                                    }}
                                    placeholder="Search FAQs"
                                    suffix={<SearchIcon className="text-[#8b8b8b]" />}
                              />
                        </div>

                        <Collapse
                              onChange={(key) => setActiveKey(key[0])}
                              accordion
                              expandIconPosition="end"
                              defaultActiveKey={['0']}
                              bordered={false}
                              activeKey={activeKey}
                        >
                              {faqsData?.faqs?.map((faq: TFaq, index: number) => (
                                    <Panel
                                          header={<h2 className="text-title font-medium text-lg">{faq.question}</h2>}
                                          key={index.toString()}
                                          style={customPanelStyle(index.toString())}
                                    >
                                          <p>{faq.answer}</p>
                                    </Panel>
                              ))}
                        </Collapse>
                  </div>
                  <NeedHelpSection />
            </div>
      );
};

export default FAQPage;
