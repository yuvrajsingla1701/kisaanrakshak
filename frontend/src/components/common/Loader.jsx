import React from 'react';
import { Sprout } from 'lucide-react';

export const Loader = ({ message = 'Loading...', size = 'md', className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-3 border-agri-100 border-t-agri-600 animate-spin"></div>
        <Sprout className="w-5 h-5 text-agri-700 absolute animate-pulse" />
      </div>
      {message && <p className="mt-3 text-sm font-medium text-gray-600">{message}</p>}
    </div>
  );
};
