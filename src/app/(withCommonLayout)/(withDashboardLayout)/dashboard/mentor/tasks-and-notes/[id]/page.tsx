'use client';

import { Collapse, Button, Form, Input } from 'antd';
import { CalendarOutlined, FileTextOutlined } from '@ant-design/icons';
import { BsDownload, BsTrash } from 'react-icons/bs';
const { Panel } = Collapse;

const TaskDetailsPage = () => {
      // Mock file data
      const files = [
            {
                  name: 'Project_Requirements.pdf',
                  size: '2.5 MB',
                  type: 'PDF',
                  uploadedAt: '2024-02-25',
            },
      ];

      const getFileIcon = () => {
            return <FileTextOutlined className="text-2xl text-[#FF6F3C]" />;
      };

      return (
            <div className="p-6 max-w-[1200px] mx-auto">
                  <Collapse expandIconPosition="end" bordered={false} defaultActiveKey={['1']}>
                        <Panel
                              style={{
                                    border: 'none',
                              }}
                              className="custom-shadow rounded-lg "
                              header={<h2 className="font-semibold">Submitted Task Details</h2>}
                              key="1"
                        >
                              <div className="space-y-6">
                                    {/* Task Meta Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
                                          <div className="flex items-center gap-2">
                                                <CalendarOutlined className="text-gray-500" />
                                                <span className="text-gray-600">Submitted Date:</span>
                                                <span className="font-medium">2024-03-01</span>
                                          </div>
                                    </div>

                                    {/* Task Description */}
                                    <div>
                                          <h4 className="text-lg font-semibold mb-2">Description</h4>
                                          <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    </div>

                                    {/* Files Section */}
                                    <div className="files max-w-md">
                                          <div className="space-y-3">
                                                {files.map((file, index) => (
                                                      <div
                                                            key={index}
                                                            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#FF6F3C] transition-all duration-300"
                                                      >
                                                            <div className="flex items-center gap-3">
                                                                  {getFileIcon()}
                                                                  <div>
                                                                        <h5 className="font-medium">{file.name}</h5>
                                                                        <p className="text-sm text-gray-500">
                                                                              {file.size} • Uploaded on {file.uploadedAt}
                                                                        </p>
                                                                  </div>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                  <Button type="text" icon={<BsDownload />} />
                                                                  <Button danger type="text" icon={<BsTrash />} />
                                                            </div>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>
                              </div>
                              <div className="text-center my-5">Task Not Submitted Yet</div>
                        </Panel>
                        <br />
                        <Panel
                              style={{
                                    border: 'none',
                              }}
                              className="custom-shadow rounded-lg "
                              header={<h2 className="font-semibold">Give Feedback</h2>}
                              key="3"
                        >
                              <Form layout="vertical">
                                    <Form.Item name="description" label="Description">
                                          <Input.TextArea placeholder="Enter your description" />
                                    </Form.Item>

                                    <Form.Item>
                                          <Button type="primary" htmlType="submit">
                                                Submit
                                          </Button>
                                    </Form.Item>
                              </Form>
                        </Panel>
                  </Collapse>
            </div>
      );
};

export default TaskDetailsPage;
