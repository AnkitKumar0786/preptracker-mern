import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteServices from '../../services/noteServices';
import NoteSearch from '../../component/Notes/NoteSearch';
import NoteCard from '../../component/Notes/NoteCard';
import aiServices from '../../services/aiServices';

const Notes = () => {
  const navigate = useNavigate();

  // notes state
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await noteServices.getAllNote();

        setNotes(response.notes || response || []);
      } catch (error) {
        console.error("Failed to fetch notes", error);
      } finally {
        setIsLoading(false);
      }
    };
    getNotes();
  }, []);

  // searching handler
  const filteredNotes = notes.filter((n) => {
    if (!searchTerm) return true;
    const lowerSearch = searchTerm.toLowerCase();
    const titleMatch = (n.title || "").toLowerCase().includes(lowerSearch);
    const contentMatch = (n.content || "").toLowerCase().includes(lowerSearch);
    return titleMatch || contentMatch;
  });


  // AI states
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [isAILoading, setIsAILoading] = useState(false);
  const [aiError, setAiError] = useState('');


  const handleAIGenerate = async () => {
    if (!aiTopic.trim()) return;

    setIsAILoading(true);
    setAiError('');

    try {
      const response = await aiServices.generateNotes(aiTopic);
      setIsAIModalOpen(false);
      navigate('/add-note', {
        state: {
          prefillTitle: aiTopic,
          prefillContent: response.notes
        }
      });
    } catch (err) {
      setAiError("Failed to generate notes. Please try again.");
    } finally {
      setIsAILoading(false);
    }
  };



  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">My Notes</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your DSA study materials.</p>
        </div>
        <div className="flex gap-3">
          {/*AI BUTTON */}
          <button
            onClick={() => setIsAIModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2.5 rounded-xl shadow-sm transition-colors flex items-center gap-2"
          >
            <span>✨</span> Generate (AI)
          </button>

          {/* Add Note button */}
          <button
            onClick={() => navigate('/add-note')}
            className="bg-[#067338] hover:bg-green-700 text-white font-medium px-4 py-2.5 rounded-xl shadow-sm transition-colors flex items-center gap-2"
          >
            <span className="text-lg leading-none">+</span> Add Note
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <NoteSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Notes Grid */}
      {isLoading ? (
        <div className="text-center text-gray-400 mt-10">Loading notes...</div>
      ) : filteredNotes.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">No notes found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      )}

      {isAIModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              ✨ AI Notes Generator
            </h3>
            <p className="text-sm text-gray-500 mb-6">Enter a DSA topic (e.g., Merge Sort, Dijkstra's Algorithm) and Gemini will write your notes for you.</p>
            
            {aiError && <p className="text-red-500 text-sm mb-3 font-medium">{aiError}</p>}

            <input 
              type="text"
              autoFocus
              placeholder="Topic name..."
              value={aiTopic}
              onChange={(e) => setAiTopic(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none mb-6"
            />

            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setIsAIModalOpen(false)}
                className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
              >
                Cancel
              </button>
              <button 
                onClick={handleAIGenerate}
                disabled={isAILoading || !aiTopic.trim()}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm disabled:opacity-50 flex items-center gap-2"
              >
                {isAILoading ? 'Thinking...' : 'Generate Notes'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Notes;