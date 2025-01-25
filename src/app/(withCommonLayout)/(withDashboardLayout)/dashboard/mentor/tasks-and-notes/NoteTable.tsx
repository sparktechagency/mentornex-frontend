import Modal from '@/components/ui/Modal';
import { Button, Select } from 'antd';
import { useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import AddTaskForm from './form/AddTaskForm';

const NoteTable = () => {
      const [isModalOpen, setIsModalOpen] = useState(false);

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
                              <Button onClick={() => setIsModalOpen(true)} icon={<BsPlus color="white" size={20} />} type="primary">
                                    Add Task
                              </Button>
                        </div>
                  </div>

                  <Modal title="Add Task" visible={isModalOpen} onCancel={() => setIsModalOpen(false)} width={600}>
                        <AddTaskForm />
                  </Modal>
            </>
      );
};

export default NoteTable;
