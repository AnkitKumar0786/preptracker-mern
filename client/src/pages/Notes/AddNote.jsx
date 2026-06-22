import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import noteServices from '../../services/noteServices';

const AddNote = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // collecting data for adding the AI generated notes
  const prefillTitle = location.state?.prefillTitle || "";
  const prefillContent = location.state?.prefillContent || "";

  
  // states for the general notes
  const [title, setTitle] = useState(prefillTitle);
  const [content, setContent] = useState(prefillContent);
  const [isSaving, setIsSaving] = useState(false);


  const handleSave = async () => {
    if (!title.trim() && !content.trim()) return; // Don't save empty notes
    setIsSaving(true);
    try {
      await noteServices.createNote({ title, content });
      navigate('/notes');
    } catch (error) {
      alert("Failed to create note.");
      setIsSaving(false);
    }
  };



  return (
    <div className="max-w-4xl mx-auto mt-5 flex flex-col h-[80vh] space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <button onClick={() => navigate('/notes')} className="px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-50 rounded-lg">← Back</button>
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="px-6 py-2 text-sm font-bold text-white bg-[#067338] hover:bg-green-700 rounded-xl shadow-sm disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Note'}
        </button>
      </div>

      {/* Editor Area */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        <input 
          type="text" 
          placeholder="Note Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-8 py-6 text-2xl font-bold text-gray-800 placeholder-gray-300 border-b border-gray-100 focus:outline-none"
        />
        <textarea 
          placeholder="Start typing your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 w-full p-8 text-gray-700 leading-relaxed resize-none focus:outline-none"
        />
      </div>
    </div>
  );
};

export default AddNote;