import React from 'react';
import { dashboardOverview } from '../data/dashboardData';
import { StatsCards } from '../components/dashboard/StatsCards';
import { QuickDetection } from '../components/dashboard/QuickDetection';
import { RegionalAlerts } from '../components/dashboard/RegionalAlerts';
import { FarmConditions } from '../components/dashboard/FarmConditions';
import { RecentScans } from '../components/dashboard/RecentScans';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const DashboardPage = () => {
  const { t } = useLanguage();
  const { farmer } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/80 pb-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            {t.dashboard.welcome}, {farmer.name.split(' ')[0]}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            {t.dashboard.plotSubtitle} • <span className="font-semibold text-agri-800">{farmer.village}</span>
          </p>
        </div>
      </div>

      {/* Top 4 Crop Health Overview Stat Cards */}
      <section aria-label="Crop Health Overview">
        <StatsCards stats={dashboardOverview.stats} />
      </section>

      {/* Quick Action: Check Your Crop */}
      <section aria-label="Quick Crop Health Check">
        <QuickDetection />
      </section>

      {/* Regional Early Warning Outbreak Banner */}
      <section aria-label="Regional Crop Warning">
        <RegionalAlerts bannerAlert={dashboardOverview.regionalBannerAlert} />
      </section>

      {/* Farm Conditions Weather Section */}
      <section aria-label="Farm and Weather Conditions">
        <FarmConditions conditions={dashboardOverview.farmConditions} />
      </section>

      {/* Recent Scans Table */}
      <section aria-label="Recent Crop Scans">
        <RecentScans scans={dashboardOverview.recentScans} />
      </section>
    </div>
  );
};
