import React, { useState } from 'react';
import problemService from '../../services/problemServices';
import { useNavigate } from 'react-router-dom';


const ProblemCard = ({ problem }) => {
  const navigate = useNavigate();
  // Row Expansion State
  const [isExpanded, setIsExpanded] = useState(false); 

  // state for want to delete
  const [deleteProblem, setDeleteProblem] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false)

  // Note Modal States
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [noteText, setNoteText] = useState(problem.note || '');
  const [isSaving, setIsSaving] = useState(false);

  // Dynamic colors for difficulty
  const getDifficultyStyle = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-50 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Hard': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  // Save Note to Database
  const handleSaveNote = async () => {
    setIsSaving(true);
    try {
      await problemService.updateProblem(problem.id, { note: noteText });
      setIsNoteModalOpen(false);
    } catch (error) {
      console.error("Failed to save note", error);
      alert("Failed to save your note. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };


  const handleDeleteProblem = async () => {
    try{
      await problemService.deleteProblem(problem.id);
      setDeleteProblem(false);
      setIsDeleted(true)
    }catch(error){
      console.error("Failed to delete problem",error);
      alert("Failer to delete your problem. Please try again.")
    }
  }

  if(isDeleted === true){
    return null;
  }

  return (
    <>
      {/* Main raw- */}
      <div className="border-b border-gray-100 last:border-none transition-colors hover:bg-gray-100/30">
        <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">

          {/* 1. Title & Star  */}
          <div className="col-span-12 md:col-span-4 flex items-center gap-3">
            <button className="shrink-0 transition-transform hover:scale-110">
              <span className={`text-lg ${problem.revision ? 'text-yellow-400 drop-shadow-sm' : 'text-gray-200 opacity-40 grayscale'}`}>
                ⭐
              </span>
            </button>
            <a href={problem.questionUrl} target="_blank" rel="noreferrer" className="font-bold text-gray-800 hover:text-[#067338] transition-colors truncate">
              {problem.title}
            </a>
          </div>

          {/* 2. Platform */}
          <div className="col-span-3 md:col-span-2 hidden md:block">
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
              {problem.platform}
            </span>
          </div>

          {/* 3. Difficulty */}
          <div className="col-span-6 md:col-span-2">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${getDifficultyStyle(problem.difficulty)}`}>
              {problem.difficulty}
            </span>
          </div>

          {/* 4. Add Note Sign  */}
          <div className="col-span-2 md:col-span-2 flex items-center gap-2">
            <button
              onClick={() => setIsNoteModalOpen(true)}
              className="text-xs font-semibold text-[#067338] hover:text-green-800 bg-white border border-green-200 px-2.5 py-1.5 rounded-lg shadow-sm transition-colors"
            >
              {noteText ? 'Edit Note' : '+ Add Note'}
            </button>
          </div>

          {/* 5. Actions */}
          <div className="col-span-6 md:col-span-2 flex justify-end gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border ${isExpanded ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
              {isExpanded ? 'Hide' : 'View'}
            </button>
            <button className="px-3 py-1.5 text-xs font-semibold bg-white text-[#067338] border border-gray-200 rounded-lg hover:bg-green-50 transition-colors"
            onClick={()=>navigate(`/edit-problem/${problem.id}`,{state:{problem}})}> 
              Edit
            </button>
            <button className="px-3 py-1.5 text-xs font-semibold bg-white text-red-600 border border-gray-200 rounded-lg hover:bg-red-50 transition-colors"
            onClick={()=>setDeleteProblem(true)}>
              Delete
            </button>
          </div>
        </div>

        {/* EXPANDED DETAILS DRAWER */}
        {isExpanded && (
          <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 shadow-inner flex flex-col md:flex-row gap-6">

            {/* Left Side: Meta Info */}
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Topics</p>
                <div className="flex flex-wrap gap-2">
                  {problem.topics.map((topic, idx) => (
                    <span key={idx} className="bg-white border border-gray-200 text-gray-600 text-xs px-2.5 py-1 rounded-full font-medium shadow-sm">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Solved On</p>
                <p className="text-sm font-medium text-gray-800">
                  {new Date(problem.solvedDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Right Side: Personal Notes */}
            <div className="flex-1 bg-yellow-50/50 border border-yellow-200 rounded-xl p-4 flex flex-col gap-2 relative">


              {/* Notes Header */}
              <p className="text-xs font-bold text-yellow-700 uppercase tracking-wider flex items-center gap-2">
                <span>📝</span> Personal Notes
              </p>

              <div className="flex-1">
                {noteText ? (
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{noteText}</p>
                ) : (
                  <div className="h-full flex items-center justify-center border-2 border-dashed border-yellow-200 rounded-lg bg-yellow-50/50 min-h-15">
                    <p className="text-sm italic text-gray-400">No notes added yet.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}
      </div>

      {isNoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">

            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <span>📝</span> Notes for "{problem.title}"
              </h3>
              <button
                onClick={() => setIsNoteModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold p-1 leading-none"
              >
                &times;
              </button>
            </div>

            <div className="p-6">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Write down the intuition, time complexity, or tricks to solve this..."
                className="w-full h-40 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#067338]/20 focus:border-[#067338] transition-all resize-none shadow-inner"
              ></textarea>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => setIsNoteModalOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                disabled={isSaving}
                className="px-6 py-2 text-sm font-semibold text-white bg-[#067338] hover:bg-green-700 rounded-xl shadow-sm transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isSaving ? 'Saving...' : 'Save Note'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Delete confirmation*/}
      {deleteProblem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">

            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                 Want to Delete "{problem.title}"
              </h3>
              <button
                onClick={() => setDeleteProblem(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold p-1 leading-none"
              >
                &times;
              </button>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-center items-center gap-8">
              <button
                onClick={() => setDeleteProblem(false)}
                className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-300 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProblem}
                className="px-6 py-2 text-sm font-semibold text-white bg-[#df3c3c] hover:bg-red-700 rounded-xl shadow-sm transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      )}

    </>
  );
};

export default ProblemCard;