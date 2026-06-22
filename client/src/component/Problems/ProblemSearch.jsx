import React from 'react';


const ProblemSearch = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative w-full md:max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-400 text-lg">🔍</span>
      </div>
      <input
        type="text"
        value={searchTerm} 
        onChange={(e) => onSearchChange(e.target.value)} //Update parent state on typing
        placeholder="Search by title, topic, or platform..."
        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#067338]/20 focus:border-[#067338] transition-all shadow-sm"
      />
    </div>
  );
};

export default ProblemSearch;