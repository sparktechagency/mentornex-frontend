'use client';

import { Select } from 'antd';
import { LuListFilter } from 'react-icons/lu';

import CustomTab from '@/components/ui/CustomTab';
import UpComingSessionTable from './UpComingSessionTable';
import SessionHistoryTable from './SessionHistoryTable';

const { Option } = Select;

const MySessionTab = () => {
      const handleFilterChange = (value: string) => {
            console.log('Selected filter:', value);
      };

      return (
            <div className="">
                  <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-semibold">My Sessions</h1>
                        <Select
                              onChange={handleFilterChange}
                              suffixIcon={<LuListFilter size={20} />}
                              placeholder="Filter"
                              className="w-[140px]"
                              size="middle"
                        >
                              <Option value="all">All</Option>
                              <Option value="completed">Completed</Option>
                              <Option value="pending">Pending</Option>
                              <Option value="cancelled">Cancelled</Option>
                        </Select>
                  </div>
                  <CustomTab
                        tabs={[
                              { key: '1', label: 'Upcoming Sessions', content: <UpComingSessionTable /> },
                              { key: '2', label: 'Session History', content: <SessionHistoryTable /> },
                        ]}
                  />
            </div>
      );
};

export default MySessionTab;
