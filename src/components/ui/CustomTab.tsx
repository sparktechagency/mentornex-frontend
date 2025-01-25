'use client';
import React, { useState } from 'react';

interface Tab {
      key: string;
      label: string;
      content: React.ReactNode;
}

interface ReusableTabProps {
      tabs: Tab[];
      defaultActiveKey?: string;
}

const CustomTab: React.FC<ReusableTabProps> = ({ tabs, defaultActiveKey }) => {
      const [activeTab, setActiveTab] = useState(defaultActiveKey || tabs[0]?.key);

      const handleTabChange = (key: string) => {
            setActiveTab(key);
      };

      return (
            <div className="">
                  {/* Tab Buttons */}
                  <div className="flex border-b border-gray-200 w-fit">
                        {tabs.map((tab) => (
                              <button
                                    key={tab.key}
                                    className={`py-2 px-4 border-b-4 transition-all ${
                                          activeTab === tab.key
                                                ? 'border-primary text-primary'
                                                : 'text-title border-transparent hover:border-primary hover:bg-gray-50'
                                    }`}
                                    onClick={() => handleTabChange(tab.key)}
                              >
                                    {tab.label}
                              </button>
                        ))}
                  </div>

                  {/* Tab Content */}
                  <div className="p-4">
                        {tabs.map((tab) =>
                              activeTab === tab.key ? (
                                    <div key={tab.key} className="text-gray-700">
                                          {tab.content}
                                    </div>
                              ) : null
                        )}
                  </div>
            </div>
      );
};

export default CustomTab;
