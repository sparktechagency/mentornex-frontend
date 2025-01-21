'use client';

import { useState } from 'react';
import { Select, Input, Button, DatePicker } from 'antd';
import dayjs from 'dayjs';

const { TextArea } = Input;
const timeSlots = [
      { time: '10:00 AM', available: true },
      { time: '12:00 PM', available: true },
      { time: '02:00 PM', available: false }, // Reserved slot
      { time: '04:00 PM', available: true },
      { time: '06:00 PM', available: true },
      { time: '08:00 PM', available: true },
];
const BookingForm = () => {
      // State for selected date
      const [selectedDate, setSelectedDate] = useState(dayjs());
      const [selectedTimeSlot, setSelectedTimeSlot] = useState<{ time: string; available: boolean }>();
      const [selectedTopic, setSelectedTopic] = useState('Career Guidance Session');

      // Dynamic date calculation
      const generateDates = (baseDate: dayjs.Dayjs) => {
            return [0, 1, 2].map((offset) => dayjs(baseDate).add(offset, 'day'));
      };
      const [visibleDates, setVisibleDates] = useState(generateDates(selectedDate));

      // Handle calendar change
      const handleDateChange = (date: dayjs.Dayjs) => {
            setSelectedDate(date);
            setVisibleDates(generateDates(date));
      };

      return (
            <div className="space-y-8">
                  {/* Available Session */}
                  <div>
                        <div className="flex justify-between items-center my-6">
                              {/* Title */}
                              <h3 className="text-lg font-semibold">Available Session</h3>

                              {/* Date Picker */}
                              <DatePicker
                                    onChange={(date) => handleDateChange(date)}
                                    defaultValue={dayjs()}
                                    format="DD MMM YYYY"
                                    className="rounded-md border border-gray-300 px-3 py-1"
                                    popupClassName="custom-calendar-popup"
                              />
                        </div>
                        <div className="flex space-x-4">
                              {visibleDates.map((date, index) => (
                                    <div
                                          key={index}
                                          className={`p-2 w-full rounded-lg text-center ${
                                                dayjs(date).isSame(selectedDate, 'day') ? 'bg-[#FFF1EC]' : 'bg-gray-100'
                                          }`}
                                          onClick={() => setSelectedDate(date)}
                                    >
                                          <p className="text-sm text-subtitle font-medium">{date.format('ddd')}</p>
                                          <p className="text-xl text-primary font-semibold">{date.format('DD MMM')}</p>
                                          <p className="text-sm text-gray-400">6 Slots Remaining</p>
                                    </div>
                              ))}
                        </div>
                  </div>

                  {/* Time Slot */}
                  <div>
                        <h3 className="text-lg font-semibold">Time Slot</h3>
                        <div className="grid grid-cols-3 gap-2 mt-4">
                              {timeSlots.map((slot, index) => (
                                    <div
                                          onClick={() => {
                                                setSelectedTimeSlot(slot);
                                          }}
                                          key={index}
                                          className={`p-2 border border-transparent text-center rounded-lg cursor-pointer 
                                            ${slot.available ? 'bg-gray-100' : 'bg-[#F52135] text-white'} 
                                            ${selectedTimeSlot?.time === slot.time && slot.available ? 'border border-orange-500' : ''}`}
                                    >
                                          <p className={`text-sm font-medium `}>{slot.time}</p>
                                          <p className={`text-xs `}>{slot.available ? 'Available' : 'Reserved'}</p>
                                    </div>
                              ))}
                        </div>
                  </div>

                  {/* Select Topic */}
                  <div>
                        <h3 className="text-lg mb-2 font-semibold">Select Topic</h3>
                        <Select defaultValue={selectedTopic} onChange={(value) => setSelectedTopic(value)} className="w-full mt-2">
                              <Select.Option value="Career Guidance Session">Career Guidance Session - $99</Select.Option>
                              <Select.Option value="Career Strategy">Career Strategy - $149</Select.Option>
                              <Select.Option value="Introductory Call">Introductory Call - Free</Select.Option>
                        </Select>
                  </div>

                  {/* Additional Question */}
                  <div>
                        <h3 className="text-lg mb-4 font-semibold">
                              What final result do you want to obtain from this session? <span className="text-red-500">*</span>
                        </h3>
                        <TextArea placeholder="Your answer" maxLength={100} rows={3} className="mt-2" />
                        <p className="text-sm text-gray-400 text-right">*Max 100 Characters</p>
                  </div>

                  {/* Book Button */}
                  <Button type="primary" block className="bg-orange-500 hover:bg-orange-600">
                        Book Session
                  </Button>
            </div>
      );
};

export default BookingForm;
