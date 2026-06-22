import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import problemService from '../../services/problemServices';

const EditProblem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // Grab the problem data we passed from the ProblemCard
  const existingProblem = location.state?.problem;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Pre-fill the form with the existing data
  const [formData, setFormData] = useState({
    title: existingProblem?.title || '',
    questionUrl: existingProblem?.questionUrl || '',
    platform: existingProblem?.platform || 'Leetcode',
    difficulty: existingProblem?.difficulty || 'Easy',
    //topics with seprated by ,
    topics: existingProblem?.topics ? existingProblem.topics.join(', ') : '',
    // Format the date 
    solvedDate: existingProblem?.solvedDate ? new Date(existingProblem.solvedDate).toISOString().split('T')[0] : '',
    revision: existingProblem?.revision || false,
    note: existingProblem?.note || '' 
  });

  // If someone manually types the URL and bypasses the card, handle it 
  if (!existingProblem) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl font-bold text-gray-800">Problem not found!</h2>
        <button onClick={() => navigate('/problems')} className="mt-4 text-[#067338] underline">Go back</button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const topicsArray = formData.topics
        .split(',')
        .map(t => t.trim())
        .filter(t => t !== '');

      const payload = {
        ...formData,
        topics: topicsArray
      };

      await problemService.updateProblem(id, payload);
      
      navigate('/problems');
    } catch (err) {
      setError(err.message || "Failed to update problem. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-8 mt-5">
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/problems')}
          className="p-2 px-4  bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
        >
          <span className="text-gray-600 text-2xl font-bold">←</span>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Edit Problem</h1>
          <p className="text-sm text-gray-500 mt-1">Updating "{formData.title}"</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Problem Title *</label>
              <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#067338]/20 focus:border-[#067338] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Question URL *</label>
              <input type="url" name="questionUrl" required value={formData.questionUrl} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#067338]/20 focus:border-[#067338] outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Platform *</label>
              <select name="platform" value={formData.platform} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#067338]/20 focus:border-[#067338] outline-none">
                <option value="Leetcode">Leetcode</option>
                <option value="Codeforces">Codeforces</option>
                <option value="CodeChef">CodeChef</option>
                <option value="GFG">GFG</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Difficulty *</label>
              <select name="difficulty" value={formData.difficulty} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#067338]/20 focus:border-[#067338] outline-none">
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Topics (Comma separated)</label>
              <input type="text" name="topics" value={formData.topics} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#067338]/20 focus:border-[#067338] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Date Solved *</label>
              <input type="date" name="solvedDate" required value={formData.solvedDate} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#067338]/20 focus:border-[#067338] outline-none" />
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <input type="checkbox" name="revision" id="revision" checked={formData.revision} onChange={handleChange} className="w-5 h-5 accent-yellow-500 rounded cursor-pointer" />
            <label htmlFor="revision" className="text-sm font-bold text-yellow-800 cursor-pointer select-none">
              ⭐ Mark for Revision
            </label>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-4">
            <button type="button" onClick={() => navigate('/problems')} className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={isLoading} className="px-8 py-2.5 text-sm font-bold text-white bg-[#067338] hover:bg-green-700 rounded-xl shadow-sm transition-colors disabled:opacity-50">
              {isLoading ? 'Updating...' : 'Update Problem'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProblem;