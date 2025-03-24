import Modal from '@/components/ui/Modal';
import { Button, Pagination, Select } from 'antd';
import { useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import TaskCard from '@/components/ui/TaskCard';
import AddNoteForm from './form/AddNoteForm';
import { useGetNotesQuery } from '@/redux/features/note/noteApi';
import { useGetMyMenteesQuery } from '@/redux/features/mentee/menteeApi';
import formattedSelectOptions from '@/utils/formattedSelectOptions';

const NoteTable = () => {
      const [menteeId, setMenteeId] = useState('');
      const [page, setPage] = useState(1);
      const { data: menteesData } = useGetMyMenteesQuery([]);
      const menteeOptions = formattedSelectOptions(menteesData?.data || []);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const { data: noteData } = useGetNotesQuery([
            {
                  name: 'menteeId',
                  value: menteeId,
            },
            {
                  name: 'page',
                  value: page,
            },
            {
                  name: 'limit',
                  value: 9,
            },
      ]);

      return (
            <>
                  <div className="flex justify-between mb-3">
                        <div className="">
                              <Select
                                    onChange={(value) => setMenteeId(value)}
                                    // showSearch
                                    placeholder="Select a mentee"
                                    style={{ width: '200px' }}
                                    options={menteeOptions}
                              />
                        </div>
                        <div>
                              <Button onClick={() => setIsModalOpen(true)} icon={<BsPlus color="white" />} type="primary">
                                    Add Note
                              </Button>
                        </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 my-4">
                        {noteData?.data?.map((note: any, index: number) => (
                              <TaskCard note={note} key={index} />
                        ))}
                  </div>

                  <div className="flex-center">
                        <Pagination
                              current={page}
                              total={noteData?.meta?.total}
                              pageSize={noteData?.meta?.limit}
                              onChange={(page: number) => setPage(page)}
                        />
                  </div>
                  <Modal title="Add Note" visible={isModalOpen} onCancel={() => setIsModalOpen(false)} width={600}>
                        <AddNoteForm setIsModalOpen={setIsModalOpen} />
                  </Modal>
            </>
      );
};

export default NoteTable;
