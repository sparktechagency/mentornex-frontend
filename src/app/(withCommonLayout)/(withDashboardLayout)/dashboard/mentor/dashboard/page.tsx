import DashboardCards from './DashboardStatCard';
import EarningChart from './EarningChart';
import SessionChart from './SessionChart';

const MentorDashboard = () => {
      return (
            <div>
                  <DashboardCards />
                  <SessionChart />
                  <EarningChart />
            </div>
      );
};

export default MentorDashboard;
