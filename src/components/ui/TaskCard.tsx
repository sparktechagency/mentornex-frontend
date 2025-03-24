import React from 'react';
import { CiCalendar } from 'react-icons/ci';

const TaskCard = ({ note }: { note: any }) => {
      return (
            <div className="bg-white drop-shadow-xl  rounded-lg space-y-4 p-4 w-full">
                  <h3 className="text-xl font-bold text-subtitle">{note.title}</h3>

                  <p className="text-sm tmt-2">{note.description}</p>

                  <div className="flex justify-between items-center mt-4 text-subtitle">
                        <div className="flex items-center space-x-1">
                              <CiCalendar size={20} />
                              <span>
                                    {new Date(note.createdAt).toLocaleString('default', {
                                          year: 'numeric',
                                          month: '2-digit',
                                          day: '2-digit',
                                    })}
                              </span>
                        </div>

                        <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1">
                                    {/* <CiChat1 size={20} /> */}
                                    {/* <span>2</span> */}
                              </div>

                              <div className="flex items-center space-x-1">
                                    {/* <TfiClip size={20} /> */}
                                    {/* <span>4</span> */}
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default TaskCard;
