import { ChartBarIcon } from '@heroicons/react/24/solid'; // Make sure to install Heroicons
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#1E293B] shadow-md h-20 flex items-center rounded-b-lg border-gray-500">
      <div className="max-w-7xl mx-auto w-full flex items-start">
        <div className="flex items-start space-x-3">
          {/* <ChartBarIcon className="h-8 w-8 text-purple-400" /> */}
          <div className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent text-3xl font-bold">Dashboard</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
