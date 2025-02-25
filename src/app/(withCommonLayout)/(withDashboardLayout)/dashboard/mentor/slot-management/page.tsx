'use client';

import { XCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { Checkbox, Button, Select } from 'antd';
import { Option } from 'antd/es/mentions';

// Define types for our data structure
type TimeSlot = {
      time: string;
      isBooked?: boolean;
};

type DaySlot = {
      id: string;
      day: string;
      isAvailable: boolean;
      timeSlots: TimeSlot[];
};

const Page = () => {
      // Initial data structure
      const [slots, setSlots] = useState<DaySlot[]>([
            {
                  id: '1',
                  day: 'Saturday',
                  isAvailable: true,
                  timeSlots: [{ time: '09:00 am' }],
            },
            {
                  id: '2',
                  day: 'Sunday',
                  isAvailable: true,
                  timeSlots: [{ time: '09:00 am' }, { time: '11:00 am' }],
            },
            {
                  id: '3',
                  day: 'Monday',
                  isAvailable: false,
                  timeSlots: [],
            },
            {
                  id: '4',
                  day: 'Tuesday',
                  isAvailable: false,
                  timeSlots: [],
            },
            {
                  id: '5',
                  day: 'Wednesday',
                  isAvailable: true,
                  timeSlots: [{ time: '09:00 am' }, { time: '11:00 am' }, { time: '01:00 pm' }, { time: '06:00 am' }],
            },
            {
                  id: '6',
                  day: 'Thursday',
                  isAvailable: false,
                  timeSlots: [],
            },
            {
                  id: '7',
                  day: 'Friday',
                  isAvailable: false,
                  timeSlots: [],
            },
      ]);

      const timeOptions = [
            '--:-- am', // Default/placeholder option
            '06:00 am',
            '07:00 am',
            '08:00 am',
            '09:00 am',
            '10:00 am',
            '11:00 am',
            '12:00 pm',
            '01:00 pm',
            '02:00 pm',
            '03:00 pm',
            '04:00 pm',
            '05:00 pm',
            '06:00 pm',
            '07:00 pm',
            '08:00 pm',
            '09:00 pm',
            '10:00 pm',
      ];

      // Handler for adding a new time slot
      const addSlot = (dayId: string) => {
            setSlots((prev) =>
                  prev.map((slot) =>
                        slot.id === dayId
                              ? {
                                      ...slot,
                                      timeSlots: [...slot.timeSlots, { time: '--:-- am' }],
                                }
                              : slot
                  )
            );
      };

      // Handler for updating day availability
      const handleDayAvailability = (dayId: string, checked: boolean) => {
            setSlots((prev) =>
                  prev.map((slot) =>
                        slot.id === dayId
                              ? {
                                      ...slot,
                                      isAvailable: checked,
                                }
                              : slot
                  )
            );
      };

      // Handler for updating time slot
      const handleTimeChange = (dayId: string, slotIndex: number, newTime: string) => {
            setSlots((prev) =>
                  prev.map((slot) =>
                        slot.id === dayId
                              ? {
                                      ...slot,
                                      timeSlots: slot.timeSlots.map((timeSlot, idx) =>
                                            idx === slotIndex ? { ...timeSlot, time: newTime } : timeSlot
                                      ),
                                }
                              : slot
                  )
            );
      };

      // Handler for removing time slot
      const removeTimeSlot = (dayId: string, slotIndex: number) => {
            setSlots((prev) =>
                  prev.map((slot) =>
                        slot.id === dayId
                              ? {
                                      ...slot,
                                      timeSlots: slot.timeSlots.filter((_, idx) => idx !== slotIndex),
                                }
                              : slot
                  )
            );
      };

      // Handler for saving all changes
      const handleSave = async () => {
            try {
                  // Example API call structure
                  // await updateMentorSlots(slots);
                  console.log('Slots to be saved:', slots);
            } catch (error) {
                  console.error('Error saving slots:', error);
            }
      };

      return (
            <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-6">Manage Your Available Slots</h2>
                  <p className="mb-3">Add your available days and times so mentees can book sessions based on your schedule.</p>
                  <div className="space-y-4">
                        {slots.map((daySlot) => (
                              <div key={daySlot.id} className=" rounded-lg p-2 flex items-center gap-5 bg-white shadow-sm">
                                    <div className="flex items-center gap-2">
                                          <Checkbox
                                                checked={daySlot.isAvailable}
                                                onChange={(e) => handleDayAvailability(daySlot.id, e.target.checked)}
                                                className="w-4 h-4 rounded border-gray-300"
                                          />
                                          <label className="font-medium">{daySlot.day}</label>
                                    </div>
                                    {daySlot.isAvailable && (
                                          <div className="flex flex-wrap gap-3">
                                                {daySlot.timeSlots.map((timeSlot, idx) => (
                                                      <div key={idx} className="flex items-center gap-2">
                                                            <Select
                                                                  style={{ height: '30px' }}
                                                                  value={timeSlot.time}
                                                                  onChange={(value) => handleTimeChange(daySlot.id, idx, value)}
                                                                  size="middle"
                                                            >
                                                                  {timeOptions.map((option) => (
                                                                        <Option key={option} value={option}>
                                                                              {option}
                                                                        </Option>
                                                                  ))}
                                                            </Select>
                                                            <Button
                                                                  style={{ height: '30px' }}
                                                                  size="middle"
                                                                  type="link"
                                                                  onClick={() => removeTimeSlot(daySlot.id, idx)}
                                                                  icon={<XCircleIcon className="w-5 h-5" />}
                                                                  className="text-red-500 hover:text-red-700"
                                                            />
                                                      </div>
                                                ))}
                                                <Button
                                                      style={{ height: '30px' }}
                                                      size="middle"
                                                      onClick={() => addSlot(daySlot.id)}
                                                      className="border-2 border-dashed border-gray-300 rounded-md px-3 py-1 text-gray-600 hover:border-gray-400 hover:text-gray-700"
                                                >
                                                      + Add Time
                                                </Button>
                                          </div>
                                    )}
                              </div>
                        ))}
                  </div>
                  <div className="mt-6 flex justify-end gap-4">
                        <Button className="px-4 py-2 border rounded-md hover:bg-gray-50">Cancel</Button>
                        <Button
                              type="primary"
                              onClick={handleSave}
                              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                              Save
                        </Button>
                  </div>
            </div>
      );
};

export default Page;
