import JoditEditor from 'jodit-react';
import Image from 'next/image';
import React from 'react';
import BannerImage from '@/assets/images/post-banner.png';
import { Button, Form, Input } from 'antd';

const Post = () => {
      const [form] = Form.useForm();
      const config = {
            readonly: false,
            toolbarAdaptive: false,
            toolbarSticky: false,
            buttons: ['bold', 'italic', 'link', 'ol', 'ul', 'hr', 'quote', 'paragraph', 'classSpan', 'code', 'source', 'fontsize'],
            showCharsCounter: false,
            showWordsCounter: false,
            showXPathInStatusbar: false,
            toolbarButtonSize: 'small',
            theme: 'default',
      };

      const handleSubmit = (values: any) => {
            console.log('Form values:', values);
      };

      return (
            <div>
                  <div className="my-2">
                        <Image
                              unoptimized
                              className="object-cover w-full"
                              src={BannerImage}
                              quality={100}
                              width={1000}
                              height={1000}
                              alt="Avatar"
                        />
                  </div>

                  <Form form={form} layout="vertical" onFinish={handleSubmit}>
                        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter a title' }]}>
                              <Input placeholder="Enter title" />
                        </Form.Item>

                        <Form.Item name="content" label="Content" rules={[{ required: true, message: 'Please enter content' }]}>
                              <JoditEditor
                                    config={{
                                          ...config,
                                          toolbarButtonSize: 'small' as 'small' | 'tiny' | 'xsmall' | 'middle' | 'large',
                                    }}
                                    onChange={(newContent) => form.setFieldValue('content', newContent)}
                              />
                        </Form.Item>

                        <Form.Item>
                              <div className="flex justify-end">
                                    <Button type="primary" htmlType="submit">
                                          Create a post
                                    </Button>
                              </div>
                        </Form.Item>
                  </Form>
            </div>
      );
};

export default Post;
