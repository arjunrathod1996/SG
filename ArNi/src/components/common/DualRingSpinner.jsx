import React from 'react';

const DualRingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-16 h-16">
        <div className="absolute w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <div className="absolute inset-0 border-4 border-t-4 border-transparent border-blue-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default DualRingSpinner;
