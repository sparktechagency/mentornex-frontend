'use client';

import { Form, Input, Button, Carousel } from 'antd';
import DateSelection from './DateSelection';
import React, { useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useGetAvailableSlotsQuery } from '@/redux/features/slot-management/slotManagementApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addSelectedTimeSlot, addSelectedTime } from '@/redux/features/booking/bookingSlice';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useBookSessionMutation } from '@/redux/features/booking/bookingApi';
import { LoadingOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

const { TextArea } = Input;

const BookingForm = ({ bookingType, profile, sessionId, setShowBookingModal }: any) => {
  console.log(sessionId);

  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { selectedTimeSlot, selectedTime } = useAppSelector((state) => state.booking);
  const [bookSession, { isLoading }] = useBookSessionMutation();
  const carouselRef = useRef<any>();
  const [formError, setFormError] = useState('');

  const next = () => carouselRef.current?.next();
  const previous = () => carouselRef.current?.prev();

  const [selectedDate, setSelectedDate] = useState(dayjs());

  const { data: slotsData, isFetching } = useGetAvailableSlotsQuery({
    mentorId: profile?._id,
    date: dayjs(selectedDate).format('DD-MM-YYYY'),
  });

  // Reset form when date changes
  React.useEffect(() => {
    if (selectedDate) {
      dispatch(addSelectedTime({ time: '', isAvailable: false }));
      setFormError('');
    }
  }, [selectedDate, dispatch]);

  const handleFinish = async (values: any) => {
    const isPackage = bookingType === 'package';

    const formData = isPackage
      ? {
          topic: values.topic,
          expected_outcome: values.expected_outcome,
          date: dayjs(selectedDate).format('YYYY-MM-DD'),
          slot: selectedTime.time,
          isTimeAvailable: selectedTime.isAvailable,
          session_plan_type: 'Package',
          package_id: sessionId,
        }
      : {
          expected_outcome: values.expected_outcome,
          date: dayjs(selectedDate).format('YYYY-MM-DD'),
          slot: selectedTime.time,
          isTimeAvailable: selectedTime.isAvailable,
          session_plan_type: 'PayPerSession',
          pay_per_session_id: sessionId,
        };

    try {
      if (isPackage) {
        const response = await bookSession({
          mentorId: profile?._id,
          data: formData,
        }).unwrap();
        if (response.success) {
          toast.success(response.message || 'Session booked successfully');
          setShowBookingModal(false);
        }
      } else {
        const response = await bookSession({
          mentorId: profile?._id,
          data: formData,
        }).unwrap();
        if (response.success) {
          window.open(response.data.paymentUrl, '_blank');
          setShowBookingModal(false);
        }
      }
    } catch (error: any) {
      toast.error(error.data.message || 'Failed to book session');
    }

    form.resetFields();
  };

  return (
    <div className="space-y-8">
      <DateSelection selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <div className="flex space-x-4">
        {isFetching
          ? Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="p-2 w-full rounded-lg text-center bg-gray-100 animate-pulse"
              >
                <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-2" />
                <div className="h-6 bg-gray-300 rounded w-2/3 mx-auto mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto" />
              </div>
            ))
          : slotsData?.map((slot: any, index: any) => (
              <div
                key={index}
                className={`p-2 border cursor-pointer w-full rounded-lg text-center
                                                      ${
                                                        selectedTimeSlot?.date == slot.date
                                                          ? 'bg-[#FFF1EC] border-orange-300'
                                                          : 'border-gray-200'
                                                      }
                                                  `}
                onClick={() => {
                  dispatch(addSelectedTimeSlot(slot));
                  setFormError('');
                }}
              >
                <p className="text-sm text-subtitle font-medium">{slot?.day}</p>
                <p className="text-xl text-primary font-semibold">{slot?.date}</p>
                <p className="text-sm text-gray-400">Total Slots - {slot?.slotCount}</p>
              </div>
            ))}
      </div>

      <div>
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">Time Slot</h3>
          <div className="flex gap-4">
            <button onClick={previous}>
              <ChevronLeft size={30} />
            </button>
            <button onClick={next}>
              <ChevronRight size={30} />
            </button>
          </div>
        </div>

        <Carousel
          key={selectedTimeSlot?.date}
          infinite={false}
          ref={carouselRef}
          dots={false}
          slidesToShow={4}
          slidesToScroll={1}
          className="mt-4"
        >
          {selectedTimeSlot?.slots?.map((slot: any, index: number) => (
            <div key={index} className="px-2">
              <div
                className={`${
                  slot.time === selectedTime.time
                    ? 'bg-[#fff2ea] border-orange-300'
                    : 'bg-white border-gray-200'
                } p-2 text-center rounded-lg cursor-pointer border`}
                onClick={() => {
                  dispatch(addSelectedTime(slot));
                  setFormError('');
                }}
              >
                <p className="text-sm font-medium">{slot.time}</p>
                <p className={`text-sm ${slot.isAvailable ? 'text-green-500' : 'text-red-500'}`}>
                  {slot?.isAvailable ? 'Available' : 'Reserved'}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        {bookingType === 'package' && (
          <Form.Item
            name="topic"
            label={
              <span>
                Topic <span className="text-red-500">*</span>
              </span>
            }
            rules={[{ required: true, message: 'Please enter the topic' }]}
          >
            <Input
              placeholder="Topic for this session"
              maxLength={100}
              className="mt-2"
              disabled={
                !selectedTime?.time ||
                !selectedTimeSlot?.slots?.some((slot: any) => slot.isAvailable) ||
                !selectedTimeSlot?.date
              }
            />
          </Form.Item>
        )}
        <Form.Item
          name="expected_outcome"
          label={
            <span>
              What final result do you want to obtain from this session?{' '}
              <span className="text-red-500">*</span>
            </span>
          }
          rules={[{ required: true, message: 'Please enter your expected outcome' }]}
        >
          <TextArea
            placeholder="Your expected outcome"
            maxLength={100}
            rows={3}
            className="mt-2"
            disabled={
              !selectedTime?.time ||
              !selectedTimeSlot?.slots?.some((slot: any) => slot.isAvailable) ||
              !selectedTimeSlot?.date
            }
          />
        </Form.Item>

        {formError && <div className="mb-4 text-red-500 text-sm">{formError}</div>}

        <p className="text-sm text-gray-400 text-right">*Max 100 Characters</p>

        <Button
          type="primary"
          htmlType="submit"
          block
          className="bg-orange-500 hover:bg-orange-600"
          disabled={
            !selectedTime?.time || !selectedTimeSlot?.slots?.some((slot: any) => slot.isAvailable)
          }
        >
          {isLoading ? <LoadingOutlined /> : 'Book Session'}
        </Button>
      </Form>
    </div>
  );
};

export default BookingForm;
