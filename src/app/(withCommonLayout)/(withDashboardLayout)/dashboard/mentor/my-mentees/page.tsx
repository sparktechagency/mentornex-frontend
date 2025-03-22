'use client';
// import { Select } from 'antd';
import MyMenteeTable from './MyMenteeTable';
// import { LuListFilter } from 'react-icons/lu';

const MyMentees = () => {
      return (
            <div>
                  {/* <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">My Active Mentees</h2>
                        <Select suffixIcon={<LuListFilter size={20} />} placeholder="Filter" className="w-[140px]" size="middle">
                              <Select.Option value="all">All</Select.Option>
                              <Select.Option value="completed">Completed</Select.Option>
                              <Select.Option value="pending">Pending</Select.Option>
                              <Select.Option value="cancelled">Cancelled</Select.Option>
                        </Select>
                  </div> */}
                  <MyMenteeTable />
            </div>
      );
};

export default MyMentees;
