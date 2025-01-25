'use client';
import { useState } from 'react';
import TaskTable from './TaskTable';
import NoteTable from './NoteTable';

const TaskAndNoteTab = () => {
      const [activeTab, setActiveTab] = useState('task');

      const handleTabChange = (key: string) => {
            setActiveTab(key);
      };

      return (
            <div className="">
                  <h1 className="text-2xl font-bold mb-2">Tasks & Notes</h1>
                  <div className="flex border-b border-gray-200 w-fit">
                        <button
                              className={`py-2 px-4 border-b-4 transition-all ${
                                    activeTab === 'task' ? ' border-b-4 border-primary text-primary' : 'text-title'
                              }`}
                              onClick={() => handleTabChange('task')}
                        >
                              Task
                        </button>
                        <button
                              className={`py-2 px-4 border-b-4 transition-all ${
                                    activeTab === 'note'
                                          ? 'border-b-4 border-primary text-primary'
                                          : 'text-primary border-transparent hover:border-primary hover:bg-gray-50'
                              }`}
                              onClick={() => handleTabChange('note')}
                        >
                              Note
                        </button>
                  </div>

                  {/* Tab Content */}
                  <div className="p-4">
                        {activeTab === 'task' && (
                              <div className="text-gray-700">
                                    <TaskTable />
                              </div>
                        )}
                        {activeTab === 'note' && (
                              <div className="text-gray-700">
                                    <NoteTable />
                              </div>
                        )}
                  </div>
            </div>
      );
};

export default TaskAndNoteTab;
