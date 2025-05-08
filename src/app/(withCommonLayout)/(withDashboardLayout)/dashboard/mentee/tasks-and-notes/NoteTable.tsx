import { Select } from 'antd';

import TaskCard from '@/components/ui/TaskCard';
import { useGetNotesQuery } from '@/redux/features/note/noteApi';
import { useGetMyMentorsQuery } from '@/redux/features/mentor/mentorApi';
import formattedSelectOptions from '@/utils/formattedSelectOptions';
import { useState } from 'react';

const NoteTable = () => {
      const [mentorId, setMentorId] = useState<string | null>(null);
      const { data: notes } = useGetNotesQuery([{ name: 'mentorId', value: mentorId }]);
      const { data: mentors } = useGetMyMentorsQuery([]);
      const mentorOptions = formattedSelectOptions(mentors?.data || []);
      return (
            <>
                  <div className="flex justify-between mb-3">
                        <div className="">
                              <Select
                                    onChange={(value) => setMentorId(value)}
                                    showSearch
                                    placeholder="Select a mentee"
                                    style={{ width: '200px' }}
                                    options={mentorOptions}
                              />
                        </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 my-4">
                        {notes?.map((note: { title: string; description: string; createdAt: string }, index: number) => (
                              <TaskCard
                                    note={{ title: note.title, description: note.description, createdAt: note.createdAt }}
                                    key={index}
                              />
                        ))}
                  </div>
            </>
      );
};

export default NoteTable;
