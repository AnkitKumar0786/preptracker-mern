import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import noteServices from '../../services/noteServices';

const NoteEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const existingNote = location.state?.note;

  const [title, setTitle] = useState(existingNote?.title || '');
  const [content, setContent] = useState(existingNote?.content || '');
  const [syncStatus, setSyncStatus] = useState('Saved'); // 'Saved', 'Saving...', or 'Unsaved changes'

  // Safety fallback if accessed via direct URL
  useEffect(() => {
    if (!existingNote && id) {
      // Fetch note if we don't have it in state
      noteServices.searchNote(id).then(res => {
        const fetchedNote = res.note || res;
        setTitle(fetchedNote.title);
        setContent(fetchedNote.content);
      }).catch(() => navigate('/notes'));
    }
  }, [id, existingNote, navigate]);

  // THE AUTO-SAVE LOGIC
  useEffect(() => {
    // Only trigger if there's actual data to save
    if (!title && !content) return;

    setSyncStatus('Saving...');

    // Set a timer, wait 1000ms after the user stops typing
    const timerId = setTimeout(async () =>{
      try {
        await noteServices.updateNote(id, { title, content });
        setSyncStatus('Saved');
      } catch (error) {
        setSyncStatus('Error saving');
      }
    }, 1000);

    // If the user types again BEFORE 1 second is up, clear the old timer and start over!
    return () => {
      clearTimeout(timerId);
    };
  }, [title, content, id]); 

  return (
    <div className="max-w-4xl mx-auto mt-5 flex flex-col h-[80vh] space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/notes')} className="px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-50 rounded-lg">← Back</button>
          
          {/* Real-time Status Indicator */}
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            syncStatus === 'Saved' ? 'bg-green-50 text-green-600' : 
            syncStatus === 'Saving...' ? 'bg-yellow-50 text-yellow-600' : 'bg-red-50 text-red-600'
          }`}>
            {syncStatus === 'Saved' ? '☁️ Saved to cloud' : `⏳ ${syncStatus}`}
          </span>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        <input 
          type="text" 
          placeholder="Note Title..."
          value={title}
          onChange={(e) => { setTitle(e.target.value); setSyncStatus('Unsaved changes'); }}
          className="w-full px-8 py-6 text-2xl font-bold text-gray-800 placeholder-gray-300 border-b border-gray-100 focus:outline-none"
        />
        <textarea 
          placeholder="Start typing your note here..."
          value={content}
          onChange={(e) => { setContent(e.target.value); setSyncStatus('Unsaved changes'); }}
          className="flex-1 w-full p-8 text-gray-700 leading-relaxed resize-none focus:outline-none"
        />
      </div>
    </div>
  );
};

export default NoteEditor;