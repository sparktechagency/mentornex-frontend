'use client';
import React, { useState } from 'react';
import { Tabs, Select } from 'antd';
import { LuListFilter } from 'react-icons/lu';
import UpComingSessionTable from './UpComingSessionTable';
import SessionRequestTable from './SessionRequestTable';
import SessionHistoryTable from './SessionHistoryTable';

const { Option } = Select;

const MySessionTab = () => {
      const [activeTab, setActiveTab] = useState('1');

      const handleTabChange = (key: string) => {
            setActiveTab(key);
      };

      const handleFilterChange = (value: string) => {
            console.log('Selected filter:', value);
      };

      const items = [
            {
                  key: '1',
                  label: 'Upcoming Sessions',
                  children: <UpComingSessionTable />,
            },
            {
                  key: '2',
                  label: 'Session Request',
                  children: <SessionRequestTable />,
            },
            {
                  key: '3',
                  label: 'Session History',
                  children: <SessionHistoryTable />,
            },
            {
                  key: '4',
                  label: (
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
                  ),
                  children: null,
                  disabled: true,
            },
      ];

      return (
            <div className="">
                  <Tabs activeKey={activeTab} onChange={handleTabChange} items={items} className="overflow-auto" />
            </div>
      );
};

export default MySessionTab;
