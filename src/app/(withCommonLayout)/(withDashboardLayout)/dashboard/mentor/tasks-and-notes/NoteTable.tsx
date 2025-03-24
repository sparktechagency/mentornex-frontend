import Modal from '@/components/ui/Modal';
import { Button, Select } from 'antd';
import { useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import TaskCard from '@/components/ui/TaskCard';
import AddNoteForm from './form/AddNoteForm';
import { useGetNotesQuery } from '@/redux/features/note/noteApi';

const NoteTable = () => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const { data: notes } = useGetNotesQuery([]);
      console.log(notes);

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
                        <div>
                              <Button onClick={() => setIsModalOpen(true)} icon={<BsPlus color="white" />} type="primary">
                                    Add Note
                              </Button>
                        </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 my-4">
                        {Array.from({ length: 6 }).map((_, index) => (
                              <TaskCard key={index} />
                        ))}
                  </div>
                  <Modal title="Add Note" visible={isModalOpen} onCancel={() => setIsModalOpen(false)} width={600}>
                        <AddNoteForm setIsModalOpen={setIsModalOpen} />
                  </Modal>
            </>
      );
};

export default NoteTable;
