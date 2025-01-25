'use client';
import React from 'react';
import { Form, Input, Select, Button, AutoComplete } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { countries, languages, timeZones } from '@/const/constant';
import { AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiFillTwitterCircle } from 'react-icons/ai';
import { BiWorld } from 'react-icons/bi';

const { TextArea } = Input;

const MentorProfilePage = () => {
      const [form] = Form.useForm();

      const initialValues = {
            fullName: 'Sazzad Chowdhury',
            email: 'sazzad.uiuxdesign@gmail.com',
            phone: '011123478910',
            about: '',
            expertise: ['Design', 'UI/UX', 'Graphic Design'],
            focusArea: '',
            language: ['English', 'Spanish'],
            country: 'USA',
            timeZone: 'GMT -6',
            facebook: 'facebook.com',
            instagram: 'instagram.com',
            twitter: 'twitter.com',
            linkedIn: 'linkedin.com',
            website: 'www.demo.com',
            experienceFields: [{ jobTitle: 'UI/UX Designer', companyName: 'Spark Tech Agency' }],
            educationFields: [{ degree: 'Bachelor of Science', school: 'University of California, Berkeley', duration: '2012 - 2016' }],
      };

      const handleFinish = (values: any) => {
            console.log('Form Submitted:', values);
      };

      return (
            <div>
                  <h2 className="text-title text-2xl font-semibold mb-4">Edit Profile Information</h2>

                  <Form form={form} layout="vertical" initialValues={initialValues} onFinish={handleFinish}>
                        {/* Personal Information */}
                        <Form.Item label="Full Name" name="fullName" rules={[{ required: true }]}>
                              <Input />
                        </Form.Item>

                        <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
                              <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                                    <Input />
                              </Form.Item>
                              <Form.Item
                                    label="Phone"
                                    name="phone"
                                    rules={[{ required: true, pattern: /^[0-9]+$/, message: 'Invalid phone number' }]}
                              >
                                    <Input />
                              </Form.Item>
                        </div>
                        <Form.Item label="About" name="about">
                              <TextArea rows={3} />
                        </Form.Item>

                        <Form.Item label="Expertise" name="expertise" rules={[{ required: true }]}>
                              <Select
                                    suffixIcon={<p className="text-primary">Max 3*</p>}
                                    mode="tags"
                                    tokenSeparators={[',']}
                                    maxCount={3}
                                    placeholder="Add expertise"
                              />
                        </Form.Item>

                        <Form.Item label="Focus Area" name="focusArea" rules={[{ required: true }]}>
                              <AutoComplete
                                    options={[
                                          { value: 'Web Development' },
                                          { value: 'Mobile App Development' },
                                          { value: 'UI/UX Design' },
                                          { value: 'Data Science' },
                                          { value: 'Artificial Intelligence' },
                                          { value: 'Cyber Security' },
                                          { value: 'Cloud Computing' },
                                    ]}
                              />
                        </Form.Item>

                        <Form.Item label="Language" name="language" rules={[{ required: true }]}>
                              <Select mode="tags" tokenSeparators={[',']} placeholder="Add languages">
                                    {languages.map((language, i) => (
                                          <Select.Option key={i} value={language.value}>
                                                {language.label}
                                          </Select.Option>
                                    ))}
                              </Select>
                        </Form.Item>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Form.Item label="Country" name="country" rules={[{ required: true }]}>
                                    <Select>
                                          {countries.map((country, i) => (
                                                <Select.Option key={i} value={country.value}>
                                                      {country.label}
                                                </Select.Option>
                                          ))}
                                    </Select>
                              </Form.Item>
                              <Form.Item label="Time Zone" name="timeZone" rules={[{ required: true }]}>
                                    <Select>
                                          {timeZones.map((zone, i) => (
                                                <Select.Option key={i} value={zone.value}>
                                                      {zone.label}
                                                </Select.Option>
                                          ))}
                                    </Select>
                              </Form.Item>
                        </div>

                        <div>
                              <h1 className="text-xl text-title my-2 font-bold">Education & Experience</h1>

                              <Form.List name="experienceFields">
                                    {(experienceFields, { add, remove }) => (
                                          <>
                                                {experienceFields.map(({ key, name, ...restField }, index) => (
                                                      <div key={key} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                                            <Form.Item
                                                                  {...restField}
                                                                  label={`Job Title ${index + 1}`}
                                                                  name={[name, 'jobTitle']}
                                                                  rules={[{ required: true, message: 'Please enter a job title' }]}
                                                            >
                                                                  <Input />
                                                            </Form.Item>

                                                            <Form.Item
                                                                  {...restField}
                                                                  label={`Company Name ${index + 1}`}
                                                                  name={[name, 'companyName']}
                                                                  rules={[{ required: true, message: 'Please enter a company name' }]}
                                                            >
                                                                  <Input />
                                                            </Form.Item>

                                                            {experienceFields.length > 1 && (
                                                                  <div className="col-span-2 text-right">
                                                                        <MinusCircleOutlined
                                                                              onClick={() => remove(name)}
                                                                              className="text-red-500 cursor-pointer"
                                                                        />
                                                                  </div>
                                                            )}
                                                      </div>
                                                ))}
                                                <Button
                                                      style={{ width: '100%', margin: '10px 0' }}
                                                      type="dashed"
                                                      className=""
                                                      onClick={() => add()}
                                                      icon={<PlusOutlined />}
                                                >
                                                      Add Another Job & Company
                                                </Button>
                                          </>
                                    )}
                              </Form.List>
                              <Form.List name="educationFields">
                                    {(educationFields, { add, remove }) => (
                                          <>
                                                {educationFields.map(({ key, name, ...restField }, index) => (
                                                      <div key={key} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                                            <Form.Item
                                                                  {...restField}
                                                                  label={` Education ${index + 1}`}
                                                                  name={[name, 'education']}
                                                                  rules={[{ required: true, message: 'Please enter education' }]}
                                                            >
                                                                  <Input />
                                                            </Form.Item>

                                                            <Form.Item
                                                                  {...restField}
                                                                  label={`Institution ${index + 1}`}
                                                                  name={[name, 'institution']}
                                                                  rules={[{ required: true, message: 'Please enter institution' }]}
                                                            >
                                                                  <Input />
                                                            </Form.Item>

                                                            {educationFields.length > 1 && (
                                                                  <div className="col-span-2 text-right">
                                                                        <MinusCircleOutlined
                                                                              onClick={() => remove(name)}
                                                                              className="text-red-500 cursor-pointer"
                                                                        />
                                                                  </div>
                                                            )}
                                                      </div>
                                                ))}

                                                <Button
                                                      type="dashed"
                                                      style={{ width: '100%', margin: '10px 0' }}
                                                      onClick={() => add()}
                                                      icon={<PlusOutlined />}
                                                >
                                                      Add Another Education
                                                </Button>
                                          </>
                                    )}
                              </Form.List>
                        </div>

                        <div>
                              <h1 className="text-xl text-title my-2 font-bold">Social Profiles</h1>
                              <div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                          <Form.Item label="Facebook" name="facebook">
                                                <Input prefix={<AiFillFacebook size={24} className="text-primary" />} />
                                          </Form.Item>
                                          <Form.Item label="Instagram" name="instagram">
                                                <Input prefix={<AiFillInstagram size={24} className="text-primary" />} />
                                          </Form.Item>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                          <Form.Item label="Twitter" name="twitter">
                                                <Input prefix={<AiFillTwitterCircle size={24} className="text-primary" />} />
                                          </Form.Item>
                                          <Form.Item label="LinkedIn" name="linkedIn">
                                                <Input prefix={<AiFillLinkedin size={24} className="text-primary" />} />
                                          </Form.Item>
                                    </div>
                                    <Form.Item label="Website" name="website">
                                          <Input prefix={<BiWorld size={24} className="text-primary" />} />
                                    </Form.Item>
                              </div>
                        </div>

                        <Form.Item>
                              <Button type="primary" htmlType="submit" block>
                                    Update Info
                              </Button>
                        </Form.Item>
                  </Form>
            </div>
      );
};

export default MentorProfilePage;
