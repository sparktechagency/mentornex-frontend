'use client';
import React from 'react';
import { Collapse } from 'antd';
import { TFaq, useGetFaqsQuery } from '@/redux/features/faq/faqApi';

const { Panel } = Collapse;

const FAQSection = () => {
      const { data: faqsData } = useGetFaqsQuery([
            {
                  name: 'searchTerm',
                  value: '',
            },
      ]);
      const [activeKey, setActiveKey] = React.useState<string>();

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
            <div className="faq-section max-w-4xl mx-auto p-6 my-20">
                  <h2 className="text-2xl md:text-4xl font-bold text-[#05264E] text-center mb-4">Frequently Asked Questions</h2>
                  <p className="text-center text-gray-600 mb-8">
                        Get answers to your questions and learn how MentorNex can help you achieve your goals.
                  </p>

                  <Collapse
                        onChange={(key) => setActiveKey(key[0])}
                        accordion
                        expandIconPosition="end"
                        bordered={false}
                        activeKey={activeKey}
                  >
                        {faqsData?.faqs?.map((faq: TFaq, index: string) => (
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
      );
};

export default FAQSection;
