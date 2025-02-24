import { TargetIcon } from 'lucide-react';
import { HiBookmark } from 'react-icons/hi';
import { HiUserGroup } from 'react-icons/hi2';

const MentorStats = () => {
      const mentorsStats = [
            {
                  name: 'Total Mentees Helped',
                  value: 150,
                  icon: <HiUserGroup color="#066CCB" size={40} />,
                  bgColor: '#F3F9FF',
            },
            {
                  name: 'Repeat Bookings',
                  value: 44,
                  icon: <HiBookmark color="#FF6F3C" size={40} />,
                  bgColor: '#FEF7F3',
            },
            {
                  name: 'Goal Achievement Rate',
                  value: 70,
                  icon: <TargetIcon color="#066CCB" size={40} />,
                  bgColor: '#F3F9FF',
            },
      ];
      return (
            <div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                        {mentorsStats.map((stat, index) => (
                              <div
                                    style={{
                                          backgroundColor: stat.bgColor,
                                    }}
                                    key={index}
                                    className=" space-y-4 h-[220px] rounded-lg p-1 flex flex-col items-center justify-center"
                              >
                                    <div className="p-3 bg-white rounded-full">{stat.icon}</div>
                                    <p className="text-3xl font-bold text-title">{stat.value}</p>
                                    <h1 className="text-title">{stat.name}</h1>
                              </div>
                        ))}
                  </div>
            </div>
      );
};

export default MentorStats;
