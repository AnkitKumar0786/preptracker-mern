import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import analyticService from '../../services/analyticServices';


const Navbar = () => {

  const Navigate = useNavigate();
  
  const { user, logout } = useAuth();

  const [isDrop, setIsDrop] = useState(false) 
  const [error, setError] = useState('')      
  const [totalsol, setTotalsol] = useState(0);  
  
  useEffect(() => {
    const getSolved = async () => {
      try {
        
        const data = await analyticService.dashboard();
        setTotalsol(data.totalsolved);
        
      } catch (er) {
        setError(er.message || "failed to get solved question");
      }
    }
    getSolved();    
  }, [])

  const LogOut = async () => {
    try {
      await logout();
      Navigate('/login')
    } catch (err) {
      setError(err.message || "failed to logout");
    }
  }


  return (
    <nav className="bg-white shadow-sm px-6 py-3 flex justify-between items-center border-b border-gray-200 sticky top-0 z-40">

      {/* Logo &  Name */}
      <div className="flex items-center gap-3">
        <img
          src={assets.logo}
          alt="PrepTracker Logo"
          className="h-13 w-13 rounded-full object-cover ring-2 ring-[#067338] ring-offset-2"
        />
        <h1 className="text-xl font-bold text-gray-800 tracking-tight">
          PrepTracker
        </h1>
      </div>

      {/* Stats & User Menu */}
      <div className="flex items-center gap-4 sm:gap-6">

        {/* Stats Badge */}
        <div className="hidden sm:flex items-center gap-2 bg-linear-to-r from-[#067338] to-green-500 px-4 py-1.5 rounded-full shadow-sm">
          <span className="text-xl">🎯</span>
          <span className="text-sm font-bold text-white">
            {totalsol} solved
          </span>
        </div>

        {/* User Dropdown Container */}
        <div className="relative">

          {/* The Toggle Button */}
          <button className="flex items-center gap-2 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors focus:outline-none"
            onClick={() => setIsDrop(!isDrop)}>
            <span className="text-sm font-medium text-gray-700">
              {user?.username || "User"}
            </span>

            <svg
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isDrop ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu Structure */}

          {isDrop && (<div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">

            <Link
              to="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-700 transition-colors"
            >
              Profile
            </Link>

            {/* Divider line */}
            <div className="h-px bg-gray-100 my-1"></div>

            {/* ADD LOGOUT LOGIC HERE LATER */}
            <button className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              onClick={LogOut}>
              Logout
            </button>

          </div>)}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;