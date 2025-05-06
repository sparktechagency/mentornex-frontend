import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const DateSelection = ({ setSelectedDate }: any) => {
      const handleDateChange = (date: dayjs.Dayjs) => {
            setSelectedDate(date);
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
                              disabledDate={(current) => {
                                    // Disable dates before today
                                    return current && current < dayjs().startOf('day');
                              }}
                        />
                  </div>
            </div>
      );
};

export default DateSelection;
