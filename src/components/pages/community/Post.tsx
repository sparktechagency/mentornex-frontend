import React from 'react';
import { Button, Form, Input } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { IoImage } from 'react-icons/io5';
import { useCreatePostMutation } from '@/redux/features/community/communityApi';
import { toast } from 'react-toastify';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';

const Post = ({ setOpenModel }: { setOpenModel: (open: boolean) => void }) => {
      const [form] = Form.useForm();
      const router = useRouter();
      const { user } = useAppSelector((state) => state.auth);
      const [createPost, { isLoading }] = useCreatePostMutation();

      const handleSubmit = async (values: any) => {
            if (!user) {
                  toast.error('Please login first');
                  return router.push('/signin');
            }
            const formData = new FormData();

            if (values.image) {
                  formData.append('image', values.image.fileList[0].originFileObj);
            }

            // remove image from values object because it is not needed in the backend
            delete values.image;
            formData.append('data', JSON.stringify(values));

            try {
                  const res = await createPost(formData).unwrap();
                  if (res.data) {
                        form.resetFields();
                        setOpenModel(false);
                        toast.success(res.message);
                  }
            } catch (error: any) {
                  toast.error(error.data.message);
                  setOpenModel(false);
            }
      };

      return (
            <div>
                  <Form form={form} layout="vertical" onFinish={handleSubmit}>
                        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter a title' }]}>
                              <Input placeholder="Enter title" />
                        </Form.Item>

                        <Form.Item
                              name="description"
                              label="Description"
                              rules={[{ required: true, message: 'Please enter a description' }]}
                        >
                              <Input.TextArea placeholder="Enter description" />
                        </Form.Item>

                        <Form.Item name="image" label="Image">
                              <Dragger accept="image/*">
                                    <div className="flex-center">
                                          <IoImage className="text-3xl" />
                                    </div>
                                    <p className="ant-upload-text">Upload</p>
                                    <p className="ant-upload-hint">Upload an image for your post</p>
                              </Dragger>
                        </Form.Item>

                        <Form.Item>
                              <div className="flex justify-end">
                                    <Button type="primary" htmlType="submit">
                                          {isLoading ? 'Loading...' : 'Create Post'}
                                    </Button>
                              </div>
                        </Form.Item>
                  </Form>
            </div>
      );
};

export default Post;
