import React, { useState } from 'react';
import GoalProgressBar from './GoalProgressBar';
import goalServices from '../../services/goalServices';
import { useNavigate } from 'react-router-dom';

const GoalCard = ({ goal }) => {
  const navigate = useNavigate();

  const [deleteGoal, setDeleteGoal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false)

  const handleDelete = async () => {
    try{
      await goalServices.deleteGoal(goal._id);
      setDeleteGoal(false);
      setIsDeleted(true);
    }catch(err){
      console.error("error occured")
    }
  }

  const handleEdit = ()=>{
    navigate('/edit-goal',{state:{goal}});
  }

  if(isDeleted === true){
    return null;
  }


  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col relative">

        {/*Title */}
        <div className="flex items-start gap-3 mb-2">
          <span className="text-2xl drop-shadow-sm">🎯</span>
          <h3 className="font-bold text-gray-800 text-lg leading-tight">
            {goal.title}
          </h3>
        </div>

        {/* Progress Component */}
        <div className="flex-1 mb-6">
          <GoalProgressBar goal={goal} />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-4 border-t border-gray-50">
          <button className="text-xs font-bold text-[#067338] hover:bg-green-50 px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-green-100"
          onClick={handleEdit}>
            Edit
          </button>
          <button onClick={()=>setDeleteGoal(true)} className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-red-100">
            Delete
          </button>
        </div>
      </div>

      {deleteGoal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden p-6 text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Delete Goal?</h3>
            <p className="text-sm text-gray-500 mb-6">This cannot be undone.</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setDeleteGoal(false)} className="px-5 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl">Cancel</button>
              <button onClick={handleDelete} className="px-5 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-sm">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GoalCard;