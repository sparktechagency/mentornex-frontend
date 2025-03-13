import { useChangePasswordMutation } from '@/redux/features/auth/authApi';
import { Form, Input, Button } from 'antd';
import { toast } from 'react-toastify';

const ChangePassword = () => {
      const [form] = Form.useForm();
      const [changePassword] = useChangePasswordMutation();

      const onFinish = async (values: any) => {
            try {
                  const res = await changePassword(values).unwrap();
                  if (res.success) {
                        toast.success(res?.message || 'Password changed successfully');
                        form.resetFields();
                  }
            } catch (error: any) {
                  toast.error(error?.data.message || 'Failed to change password');
            }
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
                        name="currentPassword"
                        rules={[{ required: true, message: 'Please input your old password!' }]}
                  >
                        <Input.Password />
                  </Form.Item>

                  <Form.Item
                        label="New Password"
                        name="newPassword"
                        rules={[{ required: true, message: 'Please input your new password!' }]}
                  >
                        <Input.Password />
                  </Form.Item>

                  <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        rules={[
                              { required: true, message: 'Please confirm your password!' },
                              ({ getFieldValue }) => ({
                                    validator(_, value) {
                                          if (!value || getFieldValue('newPassword') === value) {
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
