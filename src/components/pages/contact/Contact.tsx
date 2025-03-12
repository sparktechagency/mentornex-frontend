'use client';
import { Input, Button, Form, Typography, Select, Divider } from 'antd';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, LoadingOutlined } from '@ant-design/icons';
import { countries } from '@/const/constant';
import { MdOutlineArrowOutward } from 'react-icons/md';
import { useSendContactMutation } from '@/redux/features/contact/contactApi';
import { toast } from 'react-toastify';

const Contact = () => {
      const [sendContact, { isLoading }] = useSendContactMutation();
      const handleSubmit = async (values: any) => {
            try {
                  const res = await sendContact(values).unwrap();
                  if (res?.success) {
                        toast.success(res?.message);
                  }
            } catch (error: any) {
                  toast.error(error?.data?.message || 'Something went wrong');
            }
      };

      return (
            <div className="min-h-screen flex flex-col items-center justify-center  py-10">
                  <Typography.Title
                        level={1}
                        style={{
                              marginBottom: '40px',
                        }}
                  >
                        Contact Us
                  </Typography.Title>

                  <div className="container mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 ">
                        <div className="w-full lg:w-1/3 bg-primary-100/90 rounded-lg shadow-md p-6">
                              <Typography.Title level={4} className="text-[#333333] mb-4">
                                    Need more help?
                              </Typography.Title>
                              <Divider />

                              <div className="p-4 rounded-xl bg-white flex items-start gap-4 mb-6">
                                    <div className="bg-[#fef3f2] w-12 h-12  flex items-center justify-center rounded-full">
                                          <PhoneOutlined style={{ fontSize: '20px', color: '#FF6F3C' }} />
                                    </div>
                                    <div>
                                          <Typography.Text strong className="text-[#333333]">
                                                Phone
                                          </Typography.Text>
                                          <div className="text-[#555555] text-sm">
                                                (907) 555-0101
                                                <br />
                                                (252) 555-0126
                                          </div>
                                    </div>
                              </div>

                              <div className="p-4 rounded-xl bg-white flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 bg-[#fef3f2] flex items-center justify-center rounded-full">
                                          <MailOutlined style={{ fontSize: '20px', color: '#FF6F3C' }} />
                                    </div>
                                    <div>
                                          <Typography.Text strong className="text-[#333333]">
                                                Email Address
                                          </Typography.Text>
                                          <div className="text-[#555555] text-sm">
                                                info@example.com
                                                <br />
                                                info@example.com
                                          </div>
                                    </div>
                              </div>
                              <div className="p-4 rounded-xl bg-white flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 bg-[#fef3f2] flex items-center justify-center rounded-full">
                                          <EnvironmentOutlined style={{ fontSize: '20px', color: '#FF6F3C' }} />
                                    </div>
                                    <div>
                                          <Typography.Text strong className="text-[#333333]">
                                                Location
                                          </Typography.Text>
                                          <div className="text-[#555555] text-sm">
                                                Royal Ln. Mesa, New
                                                <br />
                                                Jersey 45463
                                          </div>
                                    </div>
                              </div>
                        </div>

                        <div className="w-full lg:w-2/3 bg-primary-100/90 rounded-lg shadow-md p-6">
                              <Typography.Title level={4} className="text-[#333333] mb-4">
                                    Get in touch with us.
                              </Typography.Title>
                              <Divider />

                              <Form onFinish={handleSubmit} requiredMark={false} layout="vertical">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                          <Form.Item
                                                label="Name"
                                                name="name"
                                                rules={[{ required: true, message: 'Please enter your name!' }]}
                                          >
                                                <Input placeholder="Enter Your Name..." />
                                          </Form.Item>

                                          <Form.Item
                                                label="Email"
                                                name="email"
                                                rules={[{ required: true, message: 'Please enter your email!' }]}
                                          >
                                                <Input placeholder="Enter Your Email..." />
                                          </Form.Item>

                                          <Form.Item
                                                label="Phone"
                                                name="phone"
                                                rules={[{ required: true, message: 'Please enter your phone number!' }]}
                                          >
                                                <Input placeholder="Enter Your Number..." />
                                          </Form.Item>

                                          <Form.Item
                                                label="Country"
                                                name="country"
                                                rules={[{ required: true, message: 'Please select your country!' }]}
                                          >
                                                <Select placeholder="Select Country">
                                                      {countries.map((country) => (
                                                            <Select.Option key={country.value} value={country.value}>
                                                                  {country.label}
                                                            </Select.Option>
                                                      ))}
                                                </Select>
                                          </Form.Item>
                                    </div>

                                    <Form.Item
                                          label="Message"
                                          name="message"
                                          rules={[{ required: true, message: 'Please enter your message!' }]}
                                    >
                                          <Input.TextArea placeholder="Enter Your Message..." rows={4} />
                                    </Form.Item>

                                    <Form.Item>
                                          <Button
                                                iconPosition="end"
                                                icon={<MdOutlineArrowOutward />}
                                                style={{ width: '100%' }}
                                                type="primary"
                                                size="large"
                                                htmlType="submit"
                                          >
                                                {isLoading ? <LoadingOutlined /> : 'Send Message'}
                                          </Button>
                                    </Form.Item>
                              </Form>
                        </div>
                  </div>
            </div>
      );
};

export default Contact;
