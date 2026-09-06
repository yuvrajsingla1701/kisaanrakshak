import React from 'react';

export const Badge = ({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  className = ''
}) => {
  const variantMap = {
    healthy: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    critical: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    neutral: 'bg-gray-100 text-gray-700 border-gray-200',
    agri: 'bg-agri-100 text-agri-900 border-agri-200'
  };

  const dotColors = {
    healthy: 'bg-emerald-500',
    warning: 'bg-amber-500',
    critical: 'bg-red-500',
    info: 'bg-blue-500',
    neutral: 'bg-gray-400',
    agri: 'bg-agri-600'
  };

  const sizeMap = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-medium',
    lg: 'text-sm px-3 py-1.5 font-semibold'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${variantMap[variant] || variantMap.neutral} ${sizeMap[size]} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant] || 'bg-gray-400'}`}></span>}
      {children}
    </span>
  );
};
