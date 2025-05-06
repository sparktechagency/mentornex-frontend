import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { convertTo12HourFormat } from '@/utils/getConvertedTime';
import { Carousel } from 'antd';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useRef } from 'react';
import { addSelectedTime } from '@/redux/features/booking/bookingSlice';

const TimeSelection = () => {
      const dispatch = useAppDispatch();
      const { selectedTimeSlot, selectedTime } = useAppSelector((state) => state.booking);
      const carouselRef = useRef<any>();

      const next = () => carouselRef.current?.next();
      const previous = () => carouselRef.current?.prev();

      console.log({ selectedTimeSlot, selectedTime });
      return (
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
                                          onClick={() => dispatch(addSelectedTime(slot))}
                                          className={` ${
                                                slot.time === selectedTime.time ? 'bg-[#fff2ea]' : 'bg-white'
                                          } p-2 text-center rounded-lg cursor-pointer border`}
                                    >
                                          <p className="text-sm font-medium">{convertTo12HourFormat(slot.time)}</p>
                                          <p className={`text-sm ${slot.isAvailable ? 'text-green-500' : 'text-red-500'}`}>
                                                {slot?.isAvailable ? 'Available' : 'Reserved'}
                                          </p>
                                    </div>
                              </div>
                        ))}
                  </Carousel>
            </div>
      );
};

export default TimeSelection;
