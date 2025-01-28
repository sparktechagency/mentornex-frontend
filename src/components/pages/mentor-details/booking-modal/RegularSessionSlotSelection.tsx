import { useState } from 'react';

const RegularSessionSlotSelection = () => {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const [selectedDay, setSelectedDay] = useState(days[0]);
      return (
            <div>
                  <div className="flex justify-between items-center my-6">
                        {/* Title */}
                        <h3 className="text-lg font-semibold">Available Day</h3>
                  </div>
                  <div className="md:flex grid grid-cols-3 gap-2 md:space-x-1">
                        {days.map((day, index) => (
                              <div
                                    key={index}
                                    className={`p-2 cursor-pointer w-full rounded-lg text-center ${
                                          day === selectedDay ? 'bg-[#FFF1EC]' : 'bg-gray-100'
                                    }`}
                                    onClick={() => setSelectedDay(day)}
                              >
                                    <p className="text-sm text-subtitle font-medium">{day}</p>
                              </div>
                        ))}
                  </div>
            </div>
      );
};

export default RegularSessionSlotSelection;
