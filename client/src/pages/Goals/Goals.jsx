import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoalCard from '../../component/Goals/GoalCard';
import goalServices from '../../services/goalServices';

const Goals = () => {
  const navigate = useNavigate();

  const [cardData, setcardData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState('');

  useEffect(() => {
    const getGoalData = async () => {
      setIsLoading(true); 
      try {
        const response = await goalServices.getAllGoals();
        setcardData(response.goal || []);
      } catch (err) {
        console.error("Failed to fetch goals.", err);
        setError(err.message || "Something went wrong!");
      } finally {
        setIsLoading(false); 
      }
    }
    getGoalData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-8 mt-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            My Goals
            <span className="text-sm font-medium bg-[#067338] text-white px-2.5 py-0.5 rounded-full shadow-sm">
              {cardData.length}
            </span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">Track your coding milestones and targets.</p>
        </div>
        {/*Add goal button */}
        <button 
          onClick={() => navigate('/add-goal')}
          className="bg-[#067338] hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded-xl shadow-sm transition-colors flex items-center gap-2"
        >
          <span className="text-lg leading-none">+</span> Add Goal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        
        {isLoading && (
          <div className="col-span-full text-center text-gray-500 font-bold py-10">
            Loading your goals...
          </div>
        )}

        {error && (
          <div className="col-span-full text-center text-red-500 font-bold py-10">
             {error}
          </div>
        )}

        {!isLoading && !error && cardData.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-10 border-2 border-dashed border-gray-200 rounded-2xl">
            <p className="mb-2">No goals set yet.</p>
            <p className="text-sm">Click "Add Goal" to create your first milestone!</p>
          </div>
        )}

        {!isLoading && !error && cardData.map((goal) => (
          <GoalCard key={goal._id} goal={goal} />
        ))}

      </div>

    </div>
  );
};

export default Goals;