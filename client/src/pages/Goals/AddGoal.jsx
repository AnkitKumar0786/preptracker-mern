import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import goalServices from '../../services/goalServices';

const AddGoal = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [goalForm, setGoalForm] = useState({
        title: "",
        target: "",
        currentProgress: "" 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGoalForm({
            ...goalForm,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start loading
        setError(''); 

        try {
            const payload = {
                ...goalForm,
                currentProgress: goalForm.currentProgress === "" ? 0 : Number(goalForm.currentProgress),
                target: Number(goalForm.target) // getting these as number
            };

            await goalServices.CreateGoal(payload);
            navigate('/goals');
        } catch (err) {
            console.error("error in adding goal", err);
            setError(err.message || "Failed to create goal. Please try again.");
        } finally {
            setIsLoading(false); 
        }
    };

  return (
    <div className="max-w-2xl mx-auto mt-8 space-y-6 pb-8">
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/goals')} className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
          <span className="text-gray-600 font-bold">←</span>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add New Goal</h1>
          <p className="text-sm text-gray-500 mt-1">Set a new target to crush.</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        
        {/* Error  */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
             {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Goal Title *</label>
            <input 
              type="text" 
              name='title'
              value={goalForm.title}
              required
              onChange={handleChange}
              placeholder="e.g. Reach 1700 Codeforces Rating"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#067338]/20 focus:border-[#067338] outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Target Value *</label>
              <input 
                type="number" 
                name='target'
                value={goalForm.target}
                required
                onChange={handleChange}
                placeholder="e.g. 1700"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#067338]/20 focus:border-[#067338] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Current Value </label>
              <input 
                type="number" 
                name='currentProgress'
                value={goalForm.currentProgress}
                onChange={handleChange}
                placeholder="e.g. 1450"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#067338]/20 focus:border-[#067338] outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-gray-100 flex justify-end gap-4">
            <button 
                onClick={() => navigate('/goals')} 
                type="button" 
                className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button 
                type="submit" 
                disabled={isLoading}
                className="px-8 py-2.5 text-sm font-bold text-white bg-[#067338] hover:bg-green-700 rounded-xl shadow-sm transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Creating...' : 'Create Goal'}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default AddGoal;