'use client';

import React from 'react';

const LoadingOverlay = () => {
  return (
    <div className="relative">
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg flex items-center gap-3">
          <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-700 dark:text-gray-200">Carregando...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
