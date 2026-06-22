import React, { useEffect, useState } from 'react';
import goalServices from '../../services/goalServices';
import { useNavigate } from 'react-router-dom';

const GoalCard = () => {
  const Navigate = useNavigate();

  const [goalCard, setGoalCard] = useState([]);
  const [error, setError] = useState('');
  const [isloading, setIsloading] = useState(true)

  // icons for the goals
  const designPalette = [
    { icon: '🎯', color: 'bg-[#067338]', textColor: 'text-[#067338]' }, // Green
    { icon: '🧠', color: 'bg-blue-500', textColor: 'text-blue-600' },   // Blue
    { icon: '🔥', color: 'bg-orange-500', textColor: 'text-orange-600' }, // Orange
    { icon: '⭐', color: 'bg-purple-500', textColor: 'text-purple-600' }, // Purple
  ];


  useEffect(() => {
    const getData = async () => {
      try {
        const data = await goalServices.getAllGoals();

        const goalsArr = data.goal || [];

        if (goalsArr.length > 0) {
          const formattedGoals = goalsArr.map((g, index) => {
            const design = designPalette[index % designPalette.length];

            return {
              id: g._id,
              title: g.title,
              current: parseInt(g.currentProgress, 10) || 0,
              target: parseInt(g.target, 10) || 1,
              icon: design.icon,
              color: design.color,
              textColor: design.textColor
            };
          });

          setGoalCard(formattedGoals);
        } else {
          setGoalCard([]);
        }
      } catch (err) {
        setError(err.message || "Failed to load current goals");
      } finally {
        setIsloading(false);
      }
    }
    
    getData();
  }, [])


  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">

      {/* Header */}
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-lg font-bold text-gray-800 tracking-tight">Current Goals</h2>
          <p className="text-sm text-gray-500 mt-1">Your active targets</p>
        </div>

  
        <button className="text-sm font-semibold text-[#067338] hover:text-green-800 transition-colors"
        onClick={()=>Navigate('/goals')}>
          View All
        </button>
      </div>

      {/* Goals List */}
      <div className="flex-1 flex flex-col justify-center relative">

        {/* loading and error */}
        {isloading ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">Loading goals...</div>
        ) : error ? (
           <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
             <span className="text-red-500 font-bold mb-1">Error</span>
             <span className="text-sm text-gray-500">{error}</span>
           </div>
        ) : goalCard.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">No active goals yet!</div>
        ) : (
          <div className="space-y-6">
            {goalCard.map((goal) => {
              
              // Calculate the percentage safely
              const rawPercentage = (goal.current / goal.target) * 100;
              const percentage = Math.min(Math.max(Math.round(rawPercentage), 0), 100);

              return (
                <div key={goal.id} className="w-full group">
                  
                  {/* Title & Stats Row */}
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                      <span className="text-base">{goal.icon}</span>
                      <span>{goal.title}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-gray-500 font-medium">
                        {goal.current} <span className="text-gray-400 font-normal">/ {goal.target}</span>
                      </span>
                      <span className={`${goal.textColor} font-bold w-10 text-right`}>
                        {percentage}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar Track */}
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    {/* Progress Bar Fill */}
                    <div
                      className={`${goal.color} h-full rounded-full transition-all duration-1000 ease-out relative`}
                      style={{ width: `${percentage}%` }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 rounded-t-full"></div>
                    </div>
                  </div>
                  
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default GoalCard;