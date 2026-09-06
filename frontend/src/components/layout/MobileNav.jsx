import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ScanLine, BellRing, History, User } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const MobileNav = () => {
  const { t } = useLanguage();

  const items = [
    { to: '/dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    { to: '/alerts', label: t.nav.alerts, icon: BellRing },
    { to: '/detect', label: t.nav.detect, icon: ScanLine, center: true },
    { to: '/history', label: t.nav.history, icon: History },
    { to: '/profile', label: t.nav.profile, icon: User }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-3 py-1.5 flex items-center justify-around shadow-lg">
      {items.map((item) => {
        const Icon = item.icon;
        if (item.center) {
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center -mt-5 transition-transform active:scale-95 ${
                  isActive ? 'scale-105' : ''
                }`
              }
            >
              <div className="w-12 h-12 rounded-full bg-agri-700 text-white flex items-center justify-center shadow-md ring-4 ring-white">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-[10px] font-bold text-agri-800 mt-1">{item.label}</span>
            </NavLink>
          );
        }

        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-2 rounded-lg text-center transition-colors ${
                isActive ? 'text-agri-700 font-semibold' : 'text-gray-500 hover:text-gray-800'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};
