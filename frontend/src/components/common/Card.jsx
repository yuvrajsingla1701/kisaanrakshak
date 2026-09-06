import React from 'react';

export const Card = ({
  children,
  className = '',
  hoverEffect = false,
  padding = 'p-5 sm:p-6',
  ...props
}) => {
  return (
    <div
      className={`bg-white border border-gray-200/80 rounded-xl shadow-xs transition-shadow duration-150 ${
        hoverEffect ? 'hover:shadow-md hover:border-gray-300' : ''
      } ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ title, subtitle, action, className = '' }) => {
  return (
    <div className={`flex items-start justify-between gap-4 mb-4 ${className}`}>
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-snug">{title}</h3>
        {subtitle && <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};
