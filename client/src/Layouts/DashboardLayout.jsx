import React from 'react'
import Navbar from '../component/Navbar/Navbar'
import Sidebar from '../component/Sidebar/Sidebar'

const DashboardLayout = ({ children }) => {
  return (
    <div className='h-screen flex flex-col bg-[#edf2f0] overflow-hidden'>

      <Navbar />

      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />

        <main className='flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8'>
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>

    </div>
  )
}

export default DashboardLayout
