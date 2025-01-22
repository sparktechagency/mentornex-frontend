import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

const DateSelection = () => {
      const [selectedDate, setSelectedDate] = useState(dayjs());
      const generateDates = (baseDate: dayjs.Dayjs) => {
            return [0, 1, 2].map((offset) => dayjs(baseDate).add(offset, 'day'));
      };
      const [visibleDates, setVisibleDates] = useState(generateDates(selectedDate));

      const handleDateChange = (date: dayjs.Dayjs) => {
            setSelectedDate(date);
            setVisibleDates(generateDates(date));
      };
      return (
            <div>
                  <div className="flex justify-between items-center my-6">
                        {/* Title */}
                        <h3 className="text-lg font-semibold">Available Session</h3>

                        {/* Date Picker */}
                        <DatePicker
                              allowClear={false}
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
                                    className={`p-2 cursor-pointer w-full rounded-lg text-center ${
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
      );
};

export default DateSelection;
