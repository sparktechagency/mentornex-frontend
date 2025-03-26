'use client';

import { Collapse, Button, Form, Input, Upload } from 'antd';
import { UserOutlined, CalendarOutlined, FileTextOutlined } from '@ant-design/icons';
import { BsDownload, BsUpload } from 'react-icons/bs';
import { useGetSubmittedTaskQuery, useGetTaskByIdQuery, useSubmitTaskMutation } from '@/redux/features/task/taskApi';
import { getImageUrl } from '@/utils/getImageUrl';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
const { Panel } = Collapse;

const TaskDetailsPage = ({ params }: { params: { id: string } }) => {
      const { data: task } = useGetTaskByIdQuery(params.id, { skip: !params.id });
      const [submitTask, { isLoading }] = useSubmitTaskMutation();
      const { data: submittedTask } = useGetSubmittedTaskQuery(params.id, { skip: !params.id });
      console.log(submittedTask, 'submittedTask');

      const getFileIcon = () => {
            return <FileTextOutlined className="text-2xl text-[#FF6F3C]" />;
      };

      const [form] = Form.useForm();
      const handleSubmit = async (values: any) => {
            const formData = new FormData();
            // console.log(values.file?.fileList[0]?.originFileObj, 'values');
            if (values?.file?.file) {
                  formData.append('file', values.file?.file);
            }
            formData.append('answer', values.description);

            try {
                  const res = await submitTask({ id: params.id, data: formData }).unwrap();
                  if (res.success) {
                        toast.success(res?.message);
                  }
            } catch (error: any) {
                  toast.error(error?.data?.message);
            }
      };

      useEffect(() => {
            if (submittedTask) {
                  form.setFieldsValue({
                        answer: submittedTask?.answer,
                        file: submittedTask?.file,
                  });
            }
      }, [submittedTask, form]);
      return (
            <div className="p-6 max-w-[1200px] mx-auto">
                  <Collapse bordered={false} defaultActiveKey={['1']}>
                        <Panel
                              style={{
                                    border: 'none',
                              }}
                              className="custom-shadow rounded-lg "
                              header={<h2 className="font-semibold">Task Details</h2>}
                              key="1"
                        >
                              <div className="space-y-6">
                                    {/* Task Meta Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
                                          <div className="flex items-center gap-2">
                                                <UserOutlined className="text-gray-500" />
                                                <span className="text-gray-600">Assigned by:</span>
                                                <span className="font-medium">{task?.mentor_id.name}</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                                <CalendarOutlined className="text-gray-500" />
                                                <span className="text-gray-600">Due Date:</span>
                                                <span className="font-medium">{new Date(task?.deadline).toLocaleDateString()}</span>
                                          </div>
                                    </div>

                                    {/* Task Description */}
                                    <div>
                                          <h4 className="text-lg font-semibold mb-2">Description</h4>
                                          <p className="text-gray-600">{task?.description}</p>
                                    </div>

                                    {/* Files Section */}
                                    <div className="files max-w-md">
                                          <div className="space-y-3">
                                                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#FF6F3C] transition-all duration-300">
                                                      <div className="flex items-center gap-3">
                                                            {getFileIcon()}
                                                            <div>
                                                                  <h5 className="font-medium">{task?.title}</h5>
                                                                  <p className="text-sm text-gray-500">
                                                                        • Uploaded on {new Date(task?.createdAt).toLocaleDateString()}
                                                                  </p>
                                                            </div>
                                                      </div>
                                                      {task?.file && (
                                                            <div className="flex gap-2">
                                                                  <Button
                                                                        href={getImageUrl(task?.file)}
                                                                        target="_blank"
                                                                        type="text"
                                                                        icon={<BsDownload />}
                                                                  />
                                                            </div>
                                                      )}
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </Panel>
                        <br />
                        <Panel
                              style={{
                                    border: 'none',
                              }}
                              className="custom-shadow rounded-lg "
                              header={<h2 className="font-semibold">Submit Task</h2>}
                              key="3"
                        >
                              <Form form={form} onFinish={handleSubmit} layout="vertical">
                                    <Form.Item name="answer" label="Answer">
                                          <Input.TextArea placeholder="Enter your answer" />
                                    </Form.Item>
                                    <Form.Item name="file" label="Attachment File">
                                          <Upload maxCount={1} accept=".png,.jpg,.jpeg">
                                                <Button icon={<BsUpload />}>Upload</Button>
                                          </Upload>
                                    </Form.Item>
                                    <Form.Item>
                                          <Button type="primary" htmlType="submit">
                                                {isLoading ? 'Submitting...' : 'Submit'}
                                          </Button>
                                    </Form.Item>
                              </Form>
                        </Panel>
                        <br />
                        <Panel
                              style={{
                                    border: 'none',
                              }}
                              className="custom-shadow rounded-lg "
                              header={<h2 className="font-semibold">Mentors Feedback</h2>}
                              key="2"
                        >
                              <div>
                                    <h2>Not Feedback Yet</h2>
                              </div>
                        </Panel>
                  </Collapse>
            </div>
      );
};

export default TaskDetailsPage;
