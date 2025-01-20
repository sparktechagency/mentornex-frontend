'use client';
import React, { useState } from 'react';
import { Button, Checkbox, Collapse, InputNumber, Slider, Space } from 'antd';
import { languages } from '@/const/constant';
import Sider from 'antd/es/layout/Sider';

const MentorFilter = ({ collapsed }: { collapsed: boolean }) => {
      const [min, setMin] = useState(0);
      const [max, setMax] = useState(1000);

      const handleSliderChange = (value: number[]) => {
            setMin(value[0]);
            setMax(value[1]);
      };

      const handleMinChange = (value: number | null) => {
            setMin(value || 0);
      };

      const handleMaxChange = (value: number | null) => {
            setMax(value || 1000);
      };
      return (
            <Sider
                  style={{ borderRadius: 10, backgroundColor: 'transparent' }}
                  width={300}
                  theme="light"
                  trigger={null}
                  collapsible
                  collapsed={collapsed}
            >
                  <div className="bg-white rounded-lg  mb-6 h">
                        <Collapse
                              expandIconPosition="end"
                              style={{
                                    backgroundColor: 'transparent',
                                    padding: 0,
                                    border: 'none',
                              }}
                              defaultActiveKey={['1']}
                        >
                              <Collapse.Panel
                                    style={{ border: 'none', padding: 0 }}
                                    header={<h1 className=" font-semibold uppercase">Tools</h1>}
                                    key="1"
                              >
                                    <div className="h-[300px] overflow-y-scroll custom-scrollbar">
                                          <Checkbox.Group className="flex flex-col gap-3">
                                                <Checkbox value="ai">Artificial Intelligence</Checkbox>
                                                <Checkbox value="blockchain">Blockchain</Checkbox>
                                                <Checkbox value="design">Design</Checkbox>
                                                <Checkbox value="coding">Coding</Checkbox>
                                                <Checkbox value="cloud">Cloud</Checkbox>
                                                <Checkbox value="cybersecurity">Cybersecurity</Checkbox>
                                                <Checkbox value="data_analytics">Data Analytics</Checkbox>
                                                <Checkbox value="database_administration">Database Administration</Checkbox>
                                                <Checkbox value="digital_marketing">Digital Marketing</Checkbox>
                                                <Checkbox value="devops">DevOps</Checkbox>
                                                <Checkbox value="full_stack_development">Full Stack Development</Checkbox>
                                                <Checkbox value="machine_learning">Machine Learning</Checkbox>
                                                <Checkbox value="networking">Networking</Checkbox>
                                                <Checkbox value="software_engineering">Software Engineering</Checkbox>
                                                <Checkbox value="ux_ui">UX/UI</Checkbox>
                                          </Checkbox.Group>
                                    </div>
                              </Collapse.Panel>
                        </Collapse>
                  </div>
                  <div className="bg-white rounded-lg  mb-6 h">
                        <Collapse expandIconPosition="end" defaultActiveKey={['1']} style={{ border: 'none', padding: 0 }}>
                              <Collapse.Panel
                                    style={{ border: 'none', padding: 0 }}
                                    header={<h1 className="font-semibold uppercase">PRICE</h1>}
                                    key="1"
                              >
                                    <Space direction="horizontal" style={{ width: '100%', justifyContent: 'space-between' }}>
                                          <InputNumber
                                                value={min}
                                                onChange={handleMinChange}
                                                style={{ width: '100%' }}
                                                placeholder="Min"
                                                min={0}
                                                max={max}
                                          />
                                          <InputNumber
                                                value={max}
                                                onChange={handleMaxChange}
                                                style={{ width: '100%' }}
                                                placeholder="Max"
                                                min={min}
                                                max={1000}
                                          />
                                    </Space>
                                    <Slider range value={[min, max]} onChange={handleSliderChange} min={0} max={1000} className="mt-4" />
                              </Collapse.Panel>
                        </Collapse>
                  </div>

                  <div className="bg-white rounded-lg mb-6">
                        <Collapse expandIconPosition="end" defaultActiveKey={['1']} style={{ border: 'none', padding: 0 }}>
                              <Collapse.Panel
                                    style={{ border: 'none', padding: 0 }}
                                    header={<h1 className="font-semibold uppercase">AVAILABILITY</h1>}
                                    key="1"
                              >
                                    <Checkbox.Group className="flex flex-col gap-2">
                                          <Checkbox value="daily">Daily</Checkbox>
                                          <Checkbox value="weekdays">Weekdays Only</Checkbox>
                                          <Checkbox value="weekends">Weekends Only</Checkbox>
                                    </Checkbox.Group>
                              </Collapse.Panel>
                        </Collapse>
                  </div>

                  <div className="bg-white rounded-lg mb-6">
                        <Collapse expandIconPosition="end" defaultActiveKey={['1']} style={{ border: 'none', padding: 0 }}>
                              <Collapse.Panel
                                    style={{ border: 'none', padding: 0 }}
                                    header={<h1 className="font-semibold uppercase">FOCUS AREA</h1>}
                                    key="1"
                              >
                                    <Checkbox.Group className="flex flex-col gap-2">
                                          <Checkbox value="interviews">Interviews</Checkbox>
                                          <Checkbox value="careerGrowth">Career Growth</Checkbox>
                                          <Checkbox value="goalSetting">Goal Setting</Checkbox>
                                          <Checkbox value="networking">Networking</Checkbox>
                                    </Checkbox.Group>
                              </Collapse.Panel>
                        </Collapse>
                  </div>

                  <div className="bg-white rounded-lg mb-6">
                        <Collapse expandIconPosition="end" defaultActiveKey={['1']} style={{ border: 'none', padding: 0 }}>
                              <Collapse.Panel
                                    style={{ border: 'none', padding: 0 }}
                                    header={<h1 className="font-semibold uppercase">LANGUAGE</h1>}
                                    key="1"
                              >
                                    <Checkbox.Group className="flex flex-col gap-2 custom-scrollbar ">
                                          {languages.map((language) => (
                                                <Checkbox key={language.value} value={language.value}>
                                                      {language.label}
                                                </Checkbox>
                                          ))}
                                    </Checkbox.Group>
                              </Collapse.Panel>
                        </Collapse>
                  </div>
                  <Button className="w-full mt-6" type="default">
                        Reset Filter
                  </Button>
            </Sider>
      );
};

export default MentorFilter;
