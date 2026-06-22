import React, { startTransition, useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import analyticService from '../../services/analyticServices';

const TopicChart = () => {

  const [topics, setTopics] = useState([]);
  const [error, setError] = useState('');

  // fetching data
  useEffect(() => {
    const fetchTopicData = async () => {
      try {
        const data = await analyticService.topics();

        const statsArr = data.stats;
        if(statsArr && Array.isArray(statsArr)){
          const formatedData = statsArr.map(item =>({
            name: item._id,
            count: item.count
          }))
          .sort((a,b) => b.count - a.count)
          .slice(0,5);
          setTopics(formatedData);
        }else{
          setError("No data found")
        }

      } catch (err) {
        setError(err.message || "failed to fetch topic chart")
      }
    }

    fetchTopicData();
  }, [])



  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full min-h-87.5">

      {/* Chart Header */}
      <div className="mb-6 flex justify-between">
        <h2 className="text-lg font-bold text-gray-800 tracking-tight">Topic Breakdown</h2>
      </div>

      {/* Recharts Container */}
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={topics}
            layout="vertical"
            margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
          >
            <XAxis type="number" hide />

            <YAxis
              dataKey="name" // providing the topic name here.
              type="category"
              axisLine={false}
              tickLine={false}
              width={140}
              tick={{ fill: '#4b5563', fontSize: 12, fontWeight: 500 }}
            />

            <Tooltip
              cursor={{ fill: '#f3f4f6' }}
              contentStyle={{
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />

            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={24}>
              {topics.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#067338" className="hover:opacity-80 transition-opacity" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default TopicChart;