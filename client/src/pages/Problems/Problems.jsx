import React, { useEffect, useState } from 'react';
import ProblemSearch from '../../component/Problems/ProblemSearch'
import ProblemCard from '../../component/Problems/ProblemCard';
import problemService from '../../services/problemServices';
import { useNavigate } from 'react-router-dom';

const Problems = () => {
  const navigate = useNavigate();

  // states for fetching problems 
  const [allProblems, setAllProblems] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  //state for search
  const [searchTerm, setSearchTerm] = useState('');

  const [isRevision, setIsRevision] = useState(false);


  useEffect(() => {
    const getAllProblem = async () => {
      try {

        const response = await problemService.getAllProblem();

        const problemArr = response.problems || [];

        if (problemArr.length > 0) {
          const formattedData = problemArr.map((p) => ({
            id: p._id,
            title: p.title,
            platform: p.platform,
            questionUrl: p.questionUrl,
            topics: p.topics,
            difficulty: p.difficulty,
            solvedDate: p.solvedDate,
            revision: p.revision,
            note: p.note
          }))
          setAllProblems(formattedData);
        } else {
          setAllProblems([])
        }

      } catch (err) {
        setError(err.message || "failed to fetch problems");
      } finally {
        setIsLoading(false);
      }
    }

    getAllProblem();
  }, [])

  // filtering the search terms and method to showing them
  const filteredProblems = allProblems.filter((prob)=>{

    if(searchTerm === "") return true;

    const lowerCaseSearch = searchTerm.toLowerCase();

    const matchesTitle = prob.title.toLowerCase().includes(lowerCaseSearch);
    const matchesPlatform = prob.platform.toLowerCase().includes(lowerCaseSearch);
    const matchesTopics = prob.topics.some(topic => topic.toLowerCase().includes(lowerCaseSearch));

    return (matchesTitle || matchesPlatform || matchesTopics);

  });

  

  return (
    <div className="space-y-6 pb-8">

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            Problems
            <span className="text-sm font-medium bg-[#067338] text-white px-2.5 py-0.5 rounded-full shadow-sm">
              {allProblems.length}
            </span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage and review your solved questions.</p>
        </div>

        <button className="bg-[#067338] hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded-xl shadow-sm transition-colors flex items-center gap-2"
        onClick={()=>navigate('/add-problem')}>
          <span className="text-lg leading-none">+</span> Add Problem
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <ProblemSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        
      </div>

      {/* THE NEW LIST */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden  relative">

        {/* TABLE HEADER*/}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">

          <div className="col-span-4 pl-8">Problem Title</div>
          <div className="col-span-2">Platform</div>
          <div className="col-span-2">Difficulty</div>
          <div className="col-span-2">Notes</div>
          <div className="col-span-2 text-right pr-2">Actions</div>
        </div>

        {/* Table Body */}
        <div className="flex flex-col relative">
          {isLoading ? (
            <div className="flex justify-center items-center h-32 text-gray-400">Loading your problems...</div>
          ) : error ? (
            <div className="flex justify-center items-center h-32 text-red-500">{error}</div>
          ): filteredProblems.length === 0 ? (
             <div className="flex justify-center items-center h-32 text-gray-400">
               {searchTerm ? "No problems match your search!" : "No problems found. Start solving!"}
             </div>
          ) : (
            filteredProblems.map((prob) => (
              <ProblemCard key={prob.id} problem={prob} />
            ))
          )}
        </div>

      </div>

    </div>
  );
};

export default Problems;