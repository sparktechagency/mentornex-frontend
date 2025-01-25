import { Form, Input, Button } from 'antd';

const ChangePassword = () => {
      const [form] = Form.useForm();

      const onFinish = (values: any) => {
            console.log('Received values of form: ', values);
      };

      return (
            <Form
                  className="w-full max-w-lg"
                  requiredMark={false}
                  layout="vertical"
                  form={form}
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
            >
                  <Form.Item
                        label="Old Password"
                        name="oldpassword"
                        rules={[{ required: true, message: 'Please input your old password!' }]}
                  >
                        <Input.Password />
                  </Form.Item>

                  <Form.Item
                        label="New Password"
                        name="newpassword"
                        rules={[{ required: true, message: 'Please input your new password!' }]}
                  >
                        <Input.Password />
                  </Form.Item>

                  <Form.Item
                        label="Confirm Password"
                        name="confirmpassword"
                        rules={[
                              { required: true, message: 'Please confirm your password!' },
                              ({ getFieldValue }) => ({
                                    validator(_, value) {
                                          if (!value || getFieldValue('newpassword') === value) {
                                                return Promise.resolve();
                                          }
                                          return Promise.reject(new Error('Passwords do not match!'));
                                    },
                              }),
                        ]}
                  >
                        <Input.Password />
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                              Submit
                        </Button>
                  </Form.Item>
            </Form>
      );
};

export default ChangePassword;
