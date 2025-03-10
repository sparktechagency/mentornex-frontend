'use client';
import React, { useEffect } from 'react';
import { Form, Input, Select, Button, AutoComplete } from 'antd';

import { countries, languages, timeZones } from '@/const/constant';
import { AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiFillTwitterCircle } from 'react-icons/ai';
import { BiWorld } from 'react-icons/bi';
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from '@/redux/features/user/userApi';
import { LoadingOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

const { TextArea } = Input;

const ProfileInformation = () => {
      const { data: profile } = useGetUserProfileQuery(undefined);
      const [updateProfile, { isLoading }] = useUpdateUserProfileMutation();
      const [form] = Form.useForm();

      useEffect(() => {
            if (profile) {
                  form.setFieldsValue({
                        name: profile.name,
                        email: profile.email,
                        phone: profile.phone,
                        bio: profile.bio,
                        about: profile.about,
                        expertise: profile.expertise,
                        focus_area: profile.focus_area,
                        language: profile.language,
                        country: profile.country,
                        timeZone: profile.timeZone,
                        job_title: profile.job_title,
                        company_name: profile.company_name,
                        instagram_url: profile.instagram_url,
                        facebook_url: profile.facebook_url,
                        linkedin_url: profile.linkedin_url,
                        twitter_url: profile.twitter_url,
                        website_url: profile.website_url,
                        education: profile.education,
                        institution_name: profile.institution_name,
                  });
            }
      }, [profile, form]);

      const handleFinish = async (values: any) => {
            try {
                  const res = await updateProfile(values).unwrap();
                  if (res?.success) {
                        toast.success(res?.message);
                  }
            } catch (error: any) {
                  toast.error(error?.data?.message || 'Something went wrong');
            }
      };

      return (
            <div>
                  <h2 className="text-title text-2xl font-semibold mb-4">Edit Profile Information</h2>

                  <Form form={form} layout="vertical" onFinish={handleFinish}>
                        {/* Personal Information */}
                        <Form.Item label="Full Name" name="name" rules={[{ required: true }]}>
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
                        <Form.Item label="Bio (Max 100 words)" name="bio" rules={[{ max: 100, message: 'Bio must be at most 100 words' }]}>
                              <TextArea maxLength={100} rows={3} />
                        </Form.Item>
                        <Form.Item label="About" name="about">
                              <TextArea rows={3} />
                        </Form.Item>

                        <Form.Item label="Expertise" name="expertise">
                              <Select
                                    suffixIcon={<p className="text-primary">Max 3*</p>}
                                    mode="tags"
                                    tokenSeparators={[',']}
                                    maxCount={3}
                                    placeholder="Add expertise"
                              />
                        </Form.Item>

                        <Form.Item label="Focus Area" name="focus_area">
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

                        <Form.Item label="Language" name="language">
                              <Select mode="tags" tokenSeparators={[',']} placeholder="Add languages">
                                    {languages.map((language, i) => (
                                          <Select.Option key={i} value={language.value}>
                                                {language.label}
                                          </Select.Option>
                                    ))}
                              </Select>
                        </Form.Item>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Form.Item label="Country" name="country">
                                    <Select>
                                          {countries.map((country, i) => (
                                                <Select.Option key={i} value={country.value}>
                                                      {country.label}
                                                </Select.Option>
                                          ))}
                                    </Select>
                              </Form.Item>
                              <Form.Item label="Time Zone" name="timeZone">
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

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Form.Item label="Job Title" name="job_title">
                                          <Input placeholder="Job Title" />
                                    </Form.Item>
                                    <Form.Item label="Company Name" name="company_name">
                                          <Input placeholder="Company Name" />
                                    </Form.Item>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Form.Item label="Education" name="education">
                                          <Input placeholder="Education" />
                                    </Form.Item>
                                    <Form.Item label="Institution Name" name="institution_name">
                                          <Input placeholder="Institution Name" />
                                    </Form.Item>
                              </div>
                              {/* <Form.List name="educationFields">
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
                              </Form.List> */}
                        </div>

                        <div>
                              <h1 className="text-xl text-title my-2 font-bold">Social Profiles</h1>
                              <div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                          <Form.Item label="Facebook" name="facebook_url">
                                                <Input prefix={<AiFillFacebook size={24} className="text-primary" />} />
                                          </Form.Item>
                                          <Form.Item label="Instagram" name="instagram_url">
                                                <Input prefix={<AiFillInstagram size={24} className="text-primary" />} />
                                          </Form.Item>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                          <Form.Item label="Twitter" name="twitter_url">
                                                <Input prefix={<AiFillTwitterCircle size={24} className="text-primary" />} />
                                          </Form.Item>
                                          <Form.Item label="LinkedIn" name="linkedin_url">
                                                <Input prefix={<AiFillLinkedin size={24} className="text-primary" />} />
                                          </Form.Item>
                                    </div>
                                    <Form.Item label="Website" name="website_url">
                                          <Input prefix={<BiWorld size={24} className="text-primary" />} />
                                    </Form.Item>
                              </div>
                        </div>

                        <Form.Item>
                              <Button type="primary" htmlType="submit" block>
                                    {isLoading ? <LoadingOutlined /> : 'Update Info'}
                              </Button>
                        </Form.Item>
                  </Form>
            </div>
      );
};

export default ProfileInformation;
