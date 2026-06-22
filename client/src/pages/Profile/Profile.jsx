import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import profileServices from '../../services/profileServices';

const Profile = () => {
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const response = await profileServices.getProfile();
        setUserData(response.user); 
      } catch (err) {
        setError("Failed to load profile data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyProfile();
  }, []); 

  if (isLoading) {
    return <div className="text-center mt-20 text-gray-500 font-bold">Loading Profile...</div>;
  }

  if (error || !userData) {
    return (
      <div className="text-center mt-20 text-red-500 font-bold">
        {error || "Could not find profile."}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-8 mt-5">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your personal information.</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Avatar Area */}
        <div className="h-24 bg-[#067338]/10 w-full border-b border-gray-100 flex items-end px-8 pb-4">
          <div className="w-16 h-16 bg-[#067338] text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-md translate-y-8 border-4 border-white uppercase">
            {userData.username ? userData.username.charAt(0) : "?"}
          </div>
        </div>

        <div className="p-6 sm:p-8 pt-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
            
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Name</p>
              <p className="text-lg font-medium text-gray-800">{userData.username}</p>
            </div>

            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email</p>
              <p className="text-lg font-medium text-gray-800">{userData.email}</p>
            </div>

            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">College</p>
              <p className="text-lg font-medium text-gray-800">{userData.college || "Not set"}</p>
            </div>

            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Branch</p>
              <p className="text-lg font-medium text-gray-800">{userData.branch || "Not set"}</p>
            </div>

            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Graduation Year</p>
              <p className="text-lg font-medium text-gray-800">{userData.graduationYear || "Not set"}</p>
            </div>
            
          </div>

          {/* Action Area */}
          <div className="pt-6 border-t border-gray-50">
            <button 
              onClick={() => navigate(`/edit-profile/${userData._id}`, { state: { user: userData } })}
              className="px-6 py-2.5 text-sm font-bold text-white bg-[#067338] hover:bg-green-700 rounded-xl shadow-sm transition-colors"
            >
              Edit Profile
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Profile;