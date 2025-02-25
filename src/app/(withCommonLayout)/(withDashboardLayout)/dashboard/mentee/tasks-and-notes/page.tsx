'use client';
import CustomTab from '@/components/ui/CustomTab';
import TaskTable from './TaskTable';
import NoteTable from './NoteTable';

const TaskAndNotePage = () => {
      return (
            <div>
                  <h1 className="text-2xl font-bold mb-2">Tasks & Notes</h1>
                  <CustomTab
                        tabs={[
                              { key: 'task', label: 'Task', content: <TaskTable /> },
                              { key: 'note', label: 'Note', content: <NoteTable /> },
                        ]}
                        defaultActiveKey="task"
                  />
            </div>
      );
};

export default TaskAndNotePage;
