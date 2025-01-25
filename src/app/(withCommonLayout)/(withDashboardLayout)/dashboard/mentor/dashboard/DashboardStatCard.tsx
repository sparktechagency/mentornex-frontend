import React from 'react';

const data = [
      {
            title: 'Active Mentee',
            value: '09',

            bgColor: 'bg-[#E4F6FE]',
            textColor: 'text-green-500',
      },
      {
            title: 'Total Session',
            value: '35',

            bgColor: 'bg-[#FADEF27D]',
            textColor: 'text-green-500',
      },
      {
            title: 'Total Earning',
            value: '$1500',

            bgColor: 'bg-[#E8FAE99E]',
            textColor: 'text-green-500',
      },
];

const DashboardCards = () => {
      return (
            <div className="flex space-x-4">
                  {data.map((item, index) => (
                        <div key={index} className={`w-full flex flex-col justify-center items-start h-32  p-4 rounded-lg ${item.bgColor}`}>
                              <h3 className="font-medium text-title">{item.title}</h3>
                              <h1 className="text-2xl font-bold text-gray-800 mt-2">{item.value}</h1>
                        </div>
                  ))}
            </div>
      );
};

export default DashboardCards;
