import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
    const Navigate = useNavigate();
    const { logout } = useAuth();
    
    const [error, setError] = useState('');
    const [isOpen, setIsOpen] = useState(false); // Mobile sidebar state

    const LogOut = async () => {
        setError('');
        try {
            await logout();
            Navigate('/login');
        } catch (err) {
            setError(err.message || "failed to logout from Sidebar");
        }
    };

    const closeMobileMenu = () => setIsOpen(false);

  return (
    <>

      {/* MOBILE menu BUTTON */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`md:hidden fixed top-3.5 left-0 z-40 p-1.5 bg-white/90 backdrop-blur-sm rounded-md shadow-sm border border-gray-100 text-gray-700 hover:text-[#067338] transition-opacity ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/*  background when open */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-gray-900/40 z-40 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />
      )}

      {/* THE SIDEBAR */}
      {/* md-laptop (md ek size limit , above that size styles changes */}
      <aside className={`
        w-64 bg-white border-r border-gray-200 flex flex-col 
        fixed md:sticky top-0 z-50 md:z-30 h-dvh md:h-full
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        
        {/* Mobile sidebar close Button  */}
        <div className="md:hidden flex justify-end p-3">
          <button 
            onClick={closeMobileMenu}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="py-4 md:py-8 px-4 space-y-2 overflow-y-auto flex-1">
          
          <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
            Menu
          </p>

          {/* Dashboard */}
          <Link 
            to="/dashboard" 
            onClick={closeMobileMenu}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-[#067338] hover:text-white transition-all duration-200 group"
          >
            <span className="text-lg transform group-hover:scale-110 transition-transform">📊</span>
            <span className="font-medium">Dashboard</span>
          </Link>

          {/* Problems */}
          <Link 
            to="/problems" 
            onClick={closeMobileMenu}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-[#067338] hover:text-white transition-all duration-200 group"
          >
            <span className="text-lg transform group-hover:scale-110 transition-transform">💻</span>
            <span className="font-medium">Problems</span>
          </Link>

          {/* Notes */}
          <Link 
            to="/notes" 
            onClick={closeMobileMenu}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-[#067338] hover:text-white transition-all duration-200 group"
          >
            <span className="text-lg transform group-hover:scale-110 transition-transform">📝</span>
            <span className="font-medium">Notes</span>
          </Link>

          {/* Goals */}
          <Link 
            to="/goals" 
            onClick={closeMobileMenu}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-[#067338] hover:text-white transition-all duration-200 group"
          >
            <span className="text-lg transform group-hover:scale-110 transition-transform">🎯</span>
            <span className="font-medium">Goals</span>
          </Link>

          {/* Profile */}
          <Link 
            to="/profile" 
            onClick={closeMobileMenu}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-[#067338] hover:text-white transition-all duration-200 group"
          >
            <span className="text-lg transform group-hover:scale-110 transition-transform">👤</span>
            <span className="font-medium">Profile</span>
          </Link>

        </div>

        {error && (
            <div className="mb-3 mx-4 px-4 py-2 bg-red-50 text-red-500 text-sm rounded-lg text-center border border-red-100">
                {error}
            </div>
        )}

        {/* Logout */}
        <div className="px-4 mt-auto mb-5">
          <button 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 hover:border-red-100 border border-transparent transition-all duration-200 font-medium group"
            onClick={LogOut}
          >
            <span className="text-lg transform group-hover:-translate-x-1 transition-transform">🚪</span>
            <span>Logout</span>
          </button>
        </div>

      </aside>
    </>
  );
};

export default Sidebar;