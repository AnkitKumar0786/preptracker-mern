import React, { useEffect, useState } from 'react';
import StatsCard from '../../component/Cards/StatsCard';
import { useAuth } from '../../hooks/useAuth'
import TopicChart from '../../component/Charts/TopicChart';
import MonthlyChart from '../../component/Charts/MonthlyChart';
import GoalCard from '../../component/Cards/GoalCard';
import RecentProblemsCard from '../../component/Cards/RecentProblemsCard';
import analyticServices from '../../services/analyticServices'

const Dashboard = () => {
  const { user } = useAuth();
  const [error, setError] = useState('')

  const [stats, setStats] = useState(
    {
      total: 0,
      easy: 0,
      medium: 0,
      hard: 0
    }
  )

  useEffect(() => {
    const getStats = async () => {
      try {
        const data = await analyticServices.dashboard();
        setStats(
          {
            total: data.totalsolved,
            easy: data.easy,
            medium: data.medium,
            hard: data.hard
          })
      } catch (err) {
        setError(err.message || "failed to fetch stats");
      }
    }

    getStats();
  }, [])


  return ( // this space-y-6 will add a gap of 24px between every child of this div
    <div className="space-y-6">  

      {/* Welcome Header */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome Back, {user?.username || 'User'} 👋
        </h1>
        <p className="text-gray-500 mt-2">
          Keep pushing! You're doing great.
        </p>
      </div>

      {/* Stats Cards Grid */}
      {/* grid-cols-1 on mobile, grid-cols-2 on tablets, grid-cols-4 on desktops */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatsCard title="Total Solved" value={stats.total} type="total" />
        <StatsCard title="Easy" value={stats.easy} type="easy" />
        <StatsCard title="Medium" value={stats.medium} type="medium" />
        <StatsCard title="Hard" value={stats.hard} type="hard" />
      </div>

      {/* Charts Area  */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <TopicChart />
        <MonthlyChart />

      </div>

      {/* Goals and Recent Problems */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <GoalCard />
        <RecentProblemsCard />

      </div>

    </div>
  );
};

export default Dashboard;