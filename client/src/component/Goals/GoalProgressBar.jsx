import React from 'react';

const GoalProgressBar = ({goal}) => {

  const rawPercentage = (goal.currentProgress/goal.target)*100;
  const percentage = Math.min(rawPercentage, 100).toFixed(1);

  return (
    <div className="w-full mt-4">
      <div className="flex justify-between text-sm font-bold mb-2">
        <span className="text-gray-700">{goal.currentProgress} / {goal.target}</span>
        <span className="text-[#067338]">{percentage}%</span>
      </div>
      
      {/* The Bar Background */}
      <div className="w-full bg-gray-100 rounded-full h-2.5 shadow-inner overflow-hidden">
        <div 
          className="bg-[#067338] h-2.5 rounded-full transition-all duration-500" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default GoalProgressBar;