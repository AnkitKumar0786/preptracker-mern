import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import analyticService from '../../services/analyticServices';

const MonthlyChart = () => {
  const [MonthlyData, setMonthlyData] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMonthlyData = async () => {
      try {
        const Mdata = await analyticService.monthly();
        const MonthArr = Mdata.stats;

        if (MonthArr && Array.isArray(MonthArr)) {
          const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

          const formatedData = MonthArr.map(item => ({
            month: monthNames[item.month - 1] || item.month.toString(),
            count: item.count
          }));
          
          setMonthlyData(formatedData); 
        } else {
          setError("Failed to fetch monthly stats");
        }
      } catch(err) { 
        setError(err.message || "Failed to load monthly data");
      } finally {
        setIsLoading(false); 
      }
    }

    getMonthlyData();
  }, []);


  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full min-h-87.5">

      {/* Chart Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 tracking-tight">Monthly Progress</h2>
        <p className="text-sm text-gray-500 mt-1">Data of last 6 months</p>
      </div>

      {/* Recharts Container */}
      <div className="flex-1 w-full relative mt-2" style={{ minHeight: '250px' }}>
        
        {/* Error and Loading Appearance */}
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">Loading chart...</div>
        ) : error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-red-500 font-bold mb-1">⚠️ Error</span>
            <span className="text-sm text-gray-500">{error}</span>
          </div>
        ) : MonthlyData.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">No data available yet!</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MonthlyData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 600 }}
                dy={10}
              />
              
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  fontWeight: 'bold',
                  color: '#374151'
                }}
              />
              
              <Line
                type="monotone"
                dataKey="count"
                stroke="#067338"
                strokeWidth={3}
                dot={{ r: 4, fill: '#ffffff', strokeWidth: 2, stroke: '#067338' }}
                activeDot={{ r: 6, fill: '#067338', stroke: '#fff', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
};

export default MonthlyChart;