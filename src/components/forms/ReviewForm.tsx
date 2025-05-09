import { useAddReviewMutation } from '@/redux/features/mentor/mentorApi';
import { Button, Form, Input, Rate } from 'antd';
import { toast } from 'react-toastify';

const ReviewForm = ({ session, setIsModalOpen }: { session: any; setIsModalOpen: any }) => {
      const [addReview, { isLoading }] = useAddReviewMutation();
      const [form] = Form.useForm();

      const handleSubmit = async (values: any) => {
            try {
                  const formateData = {
                        rate: Number(values.rating),
                        review: values.review,
                        goalAchieved: Number(values.goalAchievementPercentage),
                  };
                  const res = await addReview({
                        mentorId: session?.mentor_id?._id,
                        data: formateData,
                  }).unwrap();
                  if (res.data) {
                        form.resetFields();
                        toast.success(res.message || 'Review added successfully');
                        setIsModalOpen(false);
                  }
            } catch (error: any) {
                  toast.error(error.data.message || 'Failed to add review');
                  setIsModalOpen(false);
            }
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
                        label="Goal Achievement Percentage (0-100%)"
                        name="goalAchievementPercentage"
                        rules={[{ required: true, message: 'Please provide a goal achievement percentage!' }]}
                  >
                        <Input type="number" min={0} max={100} />
                  </Form.Item>

                  <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={isLoading}>
                              Submit Review
                        </Button>
                  </Form.Item>
            </Form>
      );
};

export default ReviewForm;
