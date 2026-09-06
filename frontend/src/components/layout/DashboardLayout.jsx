import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNav } from './MobileNav';
import { useLanguage } from '../../context/LanguageContext';

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return t.nav.dashboard;
      case '/detect':
        return t.detect.pageTitle;
      case '/history':
        return t.history.title;
      case '/alerts':
        return t.alerts.title;
      case '/recommendations':
        return t.recommendations.title;
      case '/profile':
        return t.profile.title;
      default:
        return t.brandName;
    }
  };

  return (
    <div className="flex h-screen bg-[#FBFBFA] overflow-hidden">
      {/* Desktop Sidebar (Permanent) */}
      <div className="hidden lg:flex lg:shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Drawer Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#153a1f] shadow-xl z-50">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} pageTitle={getPageTitle()} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20 lg:pb-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <MobileNav />
      </div>
    </div>
  );
};
