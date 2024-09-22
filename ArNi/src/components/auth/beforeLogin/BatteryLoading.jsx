// src/components/auth/beforeLogin/BatteryLoading.js

import React from 'react';

function BatteryLoading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col items-center">
        {/* Battery Background */}
        <div className="w-28 h-16 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-xl border border-gray-300 shadow-lg shadow-blue-500/50">
          <div className="absolute top-0 right-1 w-5 h-3 bg-gray-200 rounded-md border border-gray-400"></div>
        </div>
        {/* Battery Level */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-12 bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 rounded-lg border border-gray-400 animate-pulse"></div>
        </div>
        {/* Battery Animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-12 bg-gradient-to-r from-yellow-400 via-red-500 to-red-600 rounded-lg border border-gray-400 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-yellow-300 to-red-400 animate-slide-bar"></div>
          </div>
        </div>
        {/* Loading Text */}
        <p className="mt-4 text-xl font-semibold text-gray-800">Loading...</p>
      </div>
    </div>
  );
}

export default BatteryLoading;
