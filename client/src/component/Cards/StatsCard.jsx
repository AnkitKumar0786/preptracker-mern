import React from 'react';

const StatsCard = ({ title, value, type }) => {

    //using directory for the specific icon , to give specific css
    const cardStyles = {
    total: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-100",
      icon: "🏆"
    },
    easy: {
      bg: "bg-green-50",
      text: "text-green-700",
      border: "border-green-100",
      icon: "🟢"
    },
    medium: {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      border: "border-yellow-100",
      icon: "🟡"
    },
    hard: {
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-100",
      icon: "🔴"
    }
  };

  // Default set to total
  const style = cardStyles[type] || cardStyles.total;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow duration-200">
      
      {/* title and value */}
      <div>
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
          {title}
        </p>
        <h3 className="text-3xl font-bold text-gray-800">
          {value}
        </h3>
      </div>

      {/* Icon */}
      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl border ${style.bg} ${style.text} ${style.border}`}>
        {style.icon}
      </div>

    </div>
  );
};

export default StatsCard;