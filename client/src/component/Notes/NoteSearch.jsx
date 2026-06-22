import React from 'react';

const NoteSearch = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <span className="text-gray-400">🔍</span>
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search Notes..."
        className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#067338]/20 focus:border-[#067338] transition-all shadow-sm"
      />
    </div>
  );
};

export default NoteSearch;