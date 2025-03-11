import { Button, Form, Input, Rate } from 'antd';

const ReviewForm = () => {
      const [form] = Form.useForm();

      const handleSubmit = (values: any) => {
            console.log(values);
      };
      return (
            <Form
                  layout="vertical"
                  requiredMark={false}
                  form={form}
                  name="reviewForm"
                  onFinish={handleSubmit}
                  initialValues={{ rating: 3 }}
                  //   style={{ padding: '20px' }}
            >
                  <h2 className="text-title text-2xl text-center font-semibold mb-4">Leave a Review</h2>
                  <Form.Item
                        style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                        }}
                        name="rating"
                        rules={[{ required: true, message: 'Please rate the product!' }]}
                  >
                        <Rate />
                  </Form.Item>

                  <Form.Item name="review" rules={[{ required: true, message: 'Please provide a review!' }]}>
                        <Input.TextArea placeholder="Write your review here" rows={4} style={{ resize: 'none' }} />
                  </Form.Item>
                  <Form.Item
                        name="Goal Achievement Percentage (0-100%)"
                        rules={[{ required: true, message: 'Please provide a goal achievement percentage!' }]}
                  >
                        <Input type="number" min={0} max={100} />
                  </Form.Item>

                  <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                              Submit Review
                        </Button>
                  </Form.Item>
            </Form>
      );
};

export default ReviewForm;
