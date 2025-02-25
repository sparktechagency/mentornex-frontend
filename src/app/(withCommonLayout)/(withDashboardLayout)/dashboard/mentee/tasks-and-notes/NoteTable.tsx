import { Select } from 'antd';

import TaskCard from '@/components/ui/TaskCard';

const NoteTable = () => {
      return (
            <>
                  <div className="flex justify-between mb-3">
                        <div className="">
                              <Select
                                    showSearch
                                    placeholder="Select a mentee"
                                    style={{ width: '200px' }}
                                    options={[
                                          { value: 'lucy', label: 'Lucy' },
                                          { value: 'Yiminghe1', label: 'Yiminghe1' },
                                          { value: 'Yiminghe2', label: 'Yiminghe2' },
                                          { value: 'Yiminghe3', label: 'Yiminghe3' },
                                          { value: 'Yiminghe4', label: 'Yiminghe4' },
                                          { value: 'Yiminghe5', label: 'Yiminghe5' },
                                    ]}
                              />
                        </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 my-4">
                        {Array.from({ length: 6 }).map((_, index) => (
                              <TaskCard key={index} />
                        ))}
                  </div>
            </>
      );
};

export default NoteTable;
