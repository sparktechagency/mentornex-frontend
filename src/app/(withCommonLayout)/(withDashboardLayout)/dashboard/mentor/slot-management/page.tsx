'use client';

import { XCircleIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Checkbox, Button, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import { useAddSlotMutation, useGetSlotsQuery } from '@/redux/features/slot-management/slotManagementApi';
import { toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/redux/hooks';

// Define types for our data structure
type TimeSlot = {
      time: string;
      status?: boolean;
};

type DaySlot = {
      id: string;
      day: string;
      isAvailable: boolean;
      times: TimeSlot[];
};

const Page = () => {
      const { user } = useAppSelector((state) => state.auth);
      const [createSlot, { isLoading }] = useAddSlotMutation();
      const { data: slotsData, isLoading: isLoadingSlots } = useGetSlotsQuery(user?.id, { skip: !user });

      // Default initial data structure
      const initialSlots: DaySlot[] = [
            { id: '1', day: 'Saturday', isAvailable: false, times: [] },
            { id: '2', day: 'Sunday', isAvailable: false, times: [] },
            { id: '3', day: 'Monday', isAvailable: false, times: [] },
            { id: '4', day: 'Tuesday', isAvailable: false, times: [] },
            { id: '5', day: 'Wednesday', isAvailable: false, times: [] },
            { id: '6', day: 'Thursday', isAvailable: false, times: [] },
            { id: '7', day: 'Friday', isAvailable: false, times: [] },
      ];

      const [slots, setSlots] = useState<DaySlot[]>(initialSlots);

      // Update slots when data is fetched
      useEffect(() => {
            if (slotsData) {
                  const apiSchedule = slotsData?.schedule;

                  // Map API data to our slot structure
                  const updatedSlots = initialSlots.map((slot) => {
                        // Find the matching day in API data
                        const apiDay = apiSchedule?.find((day: any) => day.day.toLowerCase() === slot.day.toLowerCase());

                        if (apiDay) {
                              return {
                                    ...slot,
                                    isAvailable: apiDay.times.length > 0,
                                    times: apiDay.times,
                              };
                        }
                        return slot;
                  });

                  setSlots(updatedSlots);
            }
      }, [slotsData]);

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
                                      times: [...slot.times, { time: '--:-- am', status: false }],
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
                                      // If unchecking, keep the times but if checking and no times, add a default time
                                      times: checked && slot.times.length === 0 ? [{ time: '--:-- am', status: false }] : slot.times,
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
                                      times: slot.times.map((timeSlot, idx) =>
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
                                      times: slot.times.filter((_, idx) => idx !== slotIndex),
                                }
                              : slot
                  )
            );
      };

      // Handler for saving all changes
      const handleSave = async () => {
            try {
                  // Prepare the data to send to the backend
                  const slotsToSave = {
                        timeZone: 'Asia/Dhaka',
                        schedule: slots.map((slot) => ({
                              day: slot.day.toLowerCase(), // Convert day to lowercase
                              times: slot.isAvailable
                                    ? slot.times.map((timeSlot) => ({
                                            time: timeSlot.time,
                                            status: timeSlot.status || false,
                                      }))
                                    : [],
                        })),
                  };

                  // Call the API to add the slots
                  const res = await createSlot(slotsToSave).unwrap();
                  if (res) {
                        toast.success(res.message || 'Slots created successfully');
                  }
            } catch (error: any) {
                  toast.error(error.data?.message || 'Something went wrong');
            }
      };

      return (
            <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-6">Manage Your Available Slots</h2>
                  <p className="mb-3">Add your available days and times so mentees can book sessions based on your schedule.</p>
                  {isLoadingSlots ? (
                        <div className="flex justify-center py-6">
                              <LoadingOutlined style={{ fontSize: 24 }} />
                        </div>
                  ) : (
                        <div className="space-y-4">
                              {slots.map((daySlot) => (
                                    <div key={daySlot.id} className="rounded-lg p-2 flex items-center gap-5 bg-white shadow-sm">
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
                                                      {daySlot.times.map((timeSlot, idx) => (
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
                  )}
                  <div className="mt-6 flex justify-end gap-4">
                        <Button className="px-4 py-2 border rounded-md hover:bg-gray-50">Cancel</Button>
                        <Button type="primary" onClick={handleSave} disabled={isLoading || isLoadingSlots}>
                              {isLoading ? <LoadingOutlined /> : 'Save'}
                        </Button>
                  </div>
            </div>
      );
};

export default Page;
