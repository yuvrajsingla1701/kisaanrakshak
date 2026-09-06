import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ScanLine,
  History,
  BellRing,
  BookOpen,
  User,
  LifeBuoy,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = ({ onClose }) => {
  const { t } = useLanguage();
  const { logout, farmer } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    if (onClose) onClose();
  };

  const navItems = [
    { to: '/dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    { to: '/detect', label: t.nav.detect, icon: ScanLine, highlight: true },
    { to: '/history', label: t.nav.history, icon: History },
    { to: '/alerts', label: t.nav.alerts, icon: BellRing },
    { to: '/recommendations', label: t.nav.recommendations, icon: BookOpen },
    { to: '/profile', label: t.nav.profile, icon: User }
  ];

  return (
    <aside className="w-64 h-full bg-[#153a1f] text-white flex flex-col justify-between select-none shadow-md">
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-agri-600/60 border border-agri-400/30 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-agri-200" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-tight text-white flex items-center gap-1.5">
              {t.brandName}
            </h1>
            <span className="text-[10px] text-agri-300/90 font-medium tracking-wide block uppercase">
              SIH26131 Crop Care
            </span>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="p-3 space-y-1 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-agri-600 text-white font-semibold shadow-xs'
                      : 'text-agri-100/85 hover:bg-white/10 hover:text-white'
                  } ${item.highlight && !isActive ? 'ring-1 ring-agri-400/40 bg-agri-800/30' : ''}`
                }
              >
                <Icon className="w-4 h-4 shrink-0 text-agri-200" />
                <span>{item.label}</span>
                {item.highlight && (
                  <span className="ml-auto text-[10px] bg-agri-500 text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                    AI
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom section: Help & User logout */}
      <div className="p-3 border-t border-white/10 space-y-1">
        <button
          onClick={() => {
            navigate('/recommendations');
            if (onClose) onClose();
          }}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs text-agri-200 hover:bg-white/10 transition-colors"
        >
          <LifeBuoy className="w-4 h-4 text-agri-300" />
          <span>{t.nav.help}</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs text-red-200 hover:bg-red-500/20 hover:text-red-100 transition-colors text-left"
        >
          <LogOut className="w-4 h-4 text-red-300" />
          <span>{t.nav.logout}</span>
        </button>

        {/* Mini user capsule */}
        <div className="pt-2 px-2 flex items-center gap-2.5 text-xs text-agri-200/80">
          <div className="w-7 h-7 rounded-full bg-agri-800 border border-agri-400/40 flex items-center justify-center font-bold text-white text-[11px]">
            {farmer.name.charAt(0)}
          </div>
          <div className="truncate">
            <p className="text-white font-medium truncate text-xs">{farmer.name}</p>
            <p className="text-[10px] text-agri-300 truncate">{farmer.village}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
