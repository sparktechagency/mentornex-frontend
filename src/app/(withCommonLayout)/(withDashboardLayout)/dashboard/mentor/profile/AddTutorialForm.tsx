import { useCreateContentMutation, useUpdateContentMutation } from '@/redux/features/content/contentApi';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const AddTutorialForm = ({ form, editData, setOpen }: { form: any; editData: any; setOpen: (open: boolean) => void }) => {
      const [createContent, { isLoading: createLoading }] = useCreateContentMutation();
      const [updateContent, { isLoading: updateLoading }] = useUpdateContentMutation();

      useEffect(() => {
            if (editData) {
                  form.setFieldsValue({
                        title: editData.title,
                        url: editData.url,
                  });
            }
      }, [editData, form]);
      const handleSubmit = async (values: any) => {
            values.type = 'tutorial';
            if (editData) {
                  const res = await updateContent({ id: editData._id, data: values }).unwrap();
                  if (res?.success) {
                        toast.success(res?.message);
                        setOpen(false);
                  }
            } else {
                  const res = await createContent(values).unwrap();
                  if (res?.success) {
                        toast.success(res?.message);
                        setOpen(false);
                  }
            }
      };
      return (
            <div>
                  <Form form={form} onFinish={handleSubmit} layout="vertical">
                        <Form.Item rules={[{ required: true, message: 'Please enter document title' }]} name="title" label="Document Title">
                              <Input placeholder="Enter document title" />
                        </Form.Item>
                        <Form.Item
                              name="url"
                              rules={[{ required: true, message: 'Please enter document url', type: 'url' }]}
                              label="Document URL"
                        >
                              <Input placeholder="Enter document url" />
                        </Form.Item>
                        <Form.Item>
                              <Button htmlType="submit" type="primary" style={{ marginTop: '20px' }}>
                                    {createLoading || updateLoading ? <LoadingOutlined /> : 'Submit'}
                              </Button>
                        </Form.Item>
                  </Form>
            </div>
      );
};

export default AddTutorialForm;
