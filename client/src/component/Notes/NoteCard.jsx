import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteServices from '../../services/noteServices';

const NoteCard = ({ note }) => {
  const navigate = useNavigate();
  const [deleteNote, setDeleteNote] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async () => {
    try {
      await noteServices.deleteNote(note._id); 
      setDeleteNote(false);
      setIsDeleted(true); // Hide visually
    } catch (error) {
      alert("Failed to delete note.");
    }
  };

  if (isDeleted) return null;  // so that the screen refreshes and u don't see the deleted note

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col h-48 relative">
        
        {/* Title */}
        <h3 className="font-bold text-gray-800 text-lg truncate mb-2">
          {note.title || "Untitled Note"}
        </h3>
        <hr className="border-gray-100 mb-3" />

        {/* Content  */}
        <p className="text-sm text-gray-500 line-clamp-3 flex-1 whitespace-pre-wrap">
          {note.content || "No content..."}
        </p>

        {/* Date & Actions */}
        <div className="mt-4 flex justify-between items-center pt-3 border-t border-gray-50">
          <span className="text-xs font-semibold text-gray-400">
            Updated: {new Date(note.updatedAt || Date.now()).toLocaleDateString()}
          </span>
          <div className="flex gap-2">
            <button 
              onClick={() => navigate(`/edit-note/${note._id || note.id}`, { state: { note } })}
              className="text-xs font-bold text-[#067338] hover:bg-green-50 px-2.5 py-1.5 rounded-lg transition-colors"
            >
              View / Edit
            </button>
            <button 
              onClick={() => setDeleteNote(true)}
              className="text-xs font-bold text-red-500 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Delete  */}
      {deleteNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden p-6 text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Delete Note?</h3>
            <p className="text-sm text-gray-500 mb-6">This cannot be undone.</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setDeleteNote(false)} className="px-5 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl">Cancel</button>
              <button onClick={handleDelete} className="px-5 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-sm">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteCard;