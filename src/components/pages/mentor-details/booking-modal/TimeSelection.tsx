import { Carousel } from 'antd';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const TimeSelection = () => {
      const carouselRef = React.useRef<any>();
      const next = () => carouselRef.current?.next();
      const previous = () => carouselRef.current?.prev();
      const [selectedTimeSlot, setSelectedTimeSlot] = useState<{ time: string; available: boolean }>();
      const timeSlots = [
            { time: '10:00 AM', available: true },
            { time: '12:00 PM', available: true },
            { time: '02:00 PM', available: false },
            { time: '04:00 PM', available: true },
            { time: '06:00 PM', available: false },
            { time: '08:00 PM', available: true },
            { time: '10:00 PM', available: true },
            { time: '12:00 AM', available: true },
      ];

      const handleSlotClick = (slot: { time: string; available: boolean }) => {
            if (!slot.available) {
                  toast.error('This slot is already reserved!');
                  return;
            }
            setSelectedTimeSlot(slot);
      };

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

                  <Carousel ref={carouselRef} dots={false} slidesToShow={4} slidesToScroll={1} className="mt-4">
                        {timeSlots.map((slot, index) => (
                              <div key={index} className="px-2">
                                    <div
                                          onClick={() => handleSlotClick(slot)}
                                          className={`p-2  text-center rounded-lg cursor-pointer border  
                         ${slot.available ? '' : 'bg-[#F52135] text-white'} 
                         ${selectedTimeSlot?.time === slot.time && slot.available ? 'bg-[#FFF1EC] ' : ''}`}
                                    >
                                          <p className="text-sm font-medium">{slot.time}</p>
                                          <p className="text-xs">{slot.available ? 'Available' : 'Reserved'}</p>
                                    </div>
                              </div>
                        ))}
                  </Carousel>
            </div>
      );
};

export default TimeSelection;
