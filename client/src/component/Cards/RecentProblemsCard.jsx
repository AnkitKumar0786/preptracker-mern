import React, { useEffect, useState } from 'react';
import problemService from '../../services/problemServices';
import {useNavigate} from 'react-router-dom'

const RecentProblemsCard = () => {
  const Navigate = useNavigate();

  const [problems, setProblems] = useState([]);
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true);

  // function for styles
  const getDifficultyStyle = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Medium':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Hard':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  // function for finding the relative time 
  const getRelativeTime = (dateString) => {
    if (!dateString) return "Unknown date";

    const solvedDate = new Date(dateString);
    const now = new Date();
    const diffInMs = now - solvedDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "1 day ago";
    return `${diffInDays} days ago`;
  };


  useEffect(()=>{
      const RecentProblems = async () => {
      try{
        const response = await problemService.getAllProblem();
        const probArr = response.problems || [];

        if (probArr.length > 0) {
          const formattedData = probArr     // sort by descending (newest first showup)
                                .sort((a, b) => new Date(b.solvedDate) - new Date(a.solvedDate)) 
                                .slice(0,5)
                                .map((p)=>({
                                  id:p._id,
                                  title: p.title,
                                  difficulty: p.difficulty,
                                  time: getRelativeTime(p.solvedDate),
                                  platform: p.platform
                                }));
          setProblems(formattedData);
        }
      }catch(err){
        setError(err.message || "error in fetching recent problems")
      }finally{
        setIsLoading(false);
      }

    }
    RecentProblems();
  },[])

  
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">

      {/* Header */}
      <div className="mb-4 flex justify-between items-end">
        <div>
          <h2 className="text-lg font-bold text-gray-800 tracking-tight">Recent Problems</h2>
          <p className="text-sm text-gray-500 mt-1">Your latest conquests</p>
        </div>

        {/* Link to the Problems page */}
        <button className="text-sm font-semibold text-[#067338] hover:text-green-800 transition-colors"
        onClick={()=>Navigate('/problems')}>
          View All
        </button>
      </div>

      {/* The Scrollable List */}
      <div className="flex-1 flex flex-col justify-center relative ">
        
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">Loading problems...</div>
        ) : error ? (
           <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
             <span className="text-red-500 font-bold mb-1"> Error</span>
             <span className="text-sm text-gray-500">{error}</span>
           </div>
        ) : problems.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">No problems solved yet!</div>
        ) : (
          <div className="flex-1 overflow-y-auto pr-2 space-y-2">
            {problems.map((problem) => (
              <div
                key={problem.id}
                className="group flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-gray-100 hover:bg-gray-50 hover:shadow-sm transition-all cursor-pointer"
              >
                
                {/* Left side: Avatar & Title */}
                <div className="flex items-center gap-4 overflow-hidden">
                  <div className="w-10 h-10 rounded-full bg-green-50 text-[#067338] flex items-center justify-center font-bold text-sm shrink-0">
                    {/* Grabs the first letter of the problem title! */}
                    {problem.title.charAt(0)}
                  </div>
                  
                  <div className="truncate">
                    <h4 className="text-sm font-bold text-gray-800 truncate group-hover:text-[#067338] transition-colors">
                       {problem.title}
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5 font-medium">
                      Solved {problem.time} on {problem.platform}
                    </p>
                  </div>
                </div>

                {/* Right side: Difficulty Badge */}
                <div className="shrink-0 ml-4">
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-md border ${getDifficultyStyle(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default RecentProblemsCard;