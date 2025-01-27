'use client';
import React from 'react';
import { Collapse } from 'antd';
import NeedHelpSection from './NeedHelpSection';

const { Panel } = Collapse;

const FAQPage = () => {
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

      const faqs = [
            {
                  question: 'How are mentors matched to mentees?',
                  answer: 'Mentors are recommended based on your interests, skills, and learning goals. You can also filter mentors by category and expertise.',
            },
            {
                  question: 'How do I book a session with a mentor?',
                  answer: 'You can book a session through the platform by browsing available mentors and selecting a time slot that fits your schedule.',
            },
            {
                  question: 'Is there a cost for mentorship?',
                  answer: "Mentorship may involve costs depending on the mentor's rate. Some mentors may offer free consultations or sessions.",
            },
            {
                  question: 'Can I become a mentor?',
                  answer: "Yes, you can apply to become a mentor by completing the mentor application form and meeting the platform's criteria.",
            },
            {
                  question: 'What happens if I miss a scheduled session?',
                  answer: "If you miss a session, you can reschedule based on the mentor's availability. Review our cancellation and rescheduling policies.",
            },
            {
                  question: 'Can I cancel or reschedule a session?',
                  answer: 'Yes, you can cancel or reschedule a session within the platform. Be sure to notify the mentor in advance.',
            },
            {
                  question: 'Can I change my mentor if I’m not satisfied?',
                  answer: 'Yes, you can change your mentor by browsing and selecting another available mentor from the platform.',
            },
      ];

      return (
            <div>
                  <div className="faq-section  max-w-4xl mx-auto p-6 my-20">
                        <h2 className="text-4xl lg:text-[150px] font-bold text-[#05264E] text-start mb-4">FAQs</h2>
                        <p className="text-start text-gray-600 mb-8 mt-20">
                              Get answers to your questions and learn how MentorNex can help you achieve your goals.
                        </p>

                        <Collapse
                              onChange={(key) => setActiveKey(key[0])}
                              accordion
                              expandIconPosition="end"
                              bordered={false}
                              activeKey={activeKey}
                        >
                              {faqs.map((faq, index) => (
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
