import React from 'react';
import { ScanLine, ShieldCheck, AlertCircle, AlertOctagon } from 'lucide-react';
import { Card } from '../common/Card';
import { useLanguage } from '../../context/LanguageContext';

export const StatsCards = ({ stats }) => {
  const { t } = useLanguage();

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'ScanLine':
        return ScanLine;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'AlertCircle':
        return AlertCircle;
      case 'AlertOctagon':
        return AlertOctagon;
      default:
        return ScanLine;
    }
  };

  const getTranslatedTitle = (id, fallback) => {
    switch (id) {
      case 'scanned':
        return t.dashboard.cropsScanned;
      case 'healthy':
        return t.dashboard.healthy;
      case 'attention':
        return t.dashboard.needsAttention;
      case 'critical':
        return t.dashboard.critical;
      default:
        return fallback;
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((item) => {
        const Icon = getIcon(item.icon);
        return (
          <Card key={item.id} padding="p-4 sm:p-5" hoverEffect={true} className="border-gray-200/90">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                {getTranslatedTitle(item.id, item.title)}
              </span>
              <div className={`p-2 rounded-lg ${item.badgeColor}`}>
                <Icon className="w-4 h-4 shrink-0" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                {item.value}
              </span>
              <span className="text-[11px] font-medium text-gray-500 hidden sm:inline">
                {item.change}
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
