'use client';

import { Button, Carousel } from 'antd';
import DateSelection from './DateSelection';
import React, { useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useGetAvailableSlotsQuery } from '@/redux/features/slot-management/slotManagementApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addSelectedTimeSlot, addSelectedTime } from '@/redux/features/booking/bookingSlice';
import { Calendar1, ChevronLeft, ChevronRight } from 'lucide-react';
import moment from 'moment';
import { useUpdateSessionMutation } from '@/redux/features/booking/bookingApi';
import { toast } from 'react-toastify';

const RescheduleForm = ({ selectedSession, setOpenModal }: any) => {
      const dispatch = useAppDispatch();
      const { selectedTimeSlot, selectedTime } = useAppSelector((state) => state.booking);
      const carouselRef = useRef<any>();

      const next = () => carouselRef.current?.next();
      const previous = () => carouselRef.current?.prev();

      const [selectedDate, setSelectedDate] = useState(dayjs());

      const { data: slotsData, isFetching } = useGetAvailableSlotsQuery({
            mentorId: selectedSession.mentor_id?._id,
            date: dayjs(selectedDate).format('DD-MM-YYYY'),
      });
      const [updateSession, { isLoading }] = useUpdateSessionMutation();

      const handleFinish = async () => {
            console.log(selectedTimeSlot, selectedTime);
            const data = {
                  status: 'rescheduled',
                  date: moment(selectedTimeSlot.date).format('YYYY-MM-DD'),
                  slot: selectedTime.time,
            };
            try {
                  const res = await updateSession({ id: selectedSession._id, data }).unwrap();
                  if (res.success) {
                        toast.success(res.message);
                        setOpenModal(false);
                  }
            } catch (error: any) {
                  toast.error(error?.data?.message || error?.error);
                  setOpenModal(false);
            }
      };

      return (
            <div className="space-y-8">
                  <DateSelection selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                  <div className="flex space-x-4">
                        {isFetching
                              ? Array.from({ length: 3 }).map((_, idx) => (
                                      <div key={idx} className="p-2 w-full rounded-lg text-center bg-gray-100 animate-pulse">
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
                                                  dispatch(addSelectedTime({}));
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

                  <div className="flex justify-end">
                        <Button
                              loading={isLoading}
                              disabled={!selectedTimeSlot?.slots?.length || !selectedTime?.time}
                              icon={<Calendar1 />}
                              type="primary"
                              onClick={handleFinish}
                        >
                              Reschedule
                        </Button>
                  </div>
            </div>
      );
};

export default RescheduleForm;
