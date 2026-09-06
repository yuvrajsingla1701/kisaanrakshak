import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Bell,
  Search,
  Globe,
  Check,
  ChevronDown
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export const Header = ({ onMenuClick, pageTitle }) => {
  const { lang, setLanguage, t, availableLanguages } = useLanguage();
  const { farmer } = useAuth();
  const navigate = useNavigate();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/history?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between gap-3">
        {/* Left: Mobile hamburger & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base sm:text-xl font-bold text-gray-900 tracking-tight">
              {pageTitle}
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-500 hidden sm:block">
              {farmer.village} • {farmer.primaryCrop}
            </p>
          </div>
        </div>

        {/* Center: Search input */}
        <div className="hidden md:flex flex-1 max-w-xs lg:max-w-md mx-4">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search diseases, pests, or plot scans..."
              className="w-full bg-gray-50 border border-gray-200 text-xs sm:text-sm rounded-lg pl-9 pr-4 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-agri-600 focus:border-agri-600 transition-all text-gray-800"
            />
          </form>
        </div>

        {/* Right: Language switch, Alert notification, User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors bg-white shadow-2xs"
              aria-label="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-agri-700" />
              <span className="hidden sm:inline">
                {availableLanguages.find(l => l.code === lang)?.native || 'English'}
              </span>
              <span className="sm:hidden uppercase">{lang}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {langDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setLangDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-1.5 w-36 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1 text-xs">
                  {availableLanguages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 hover:bg-agri-50 text-gray-800 transition-colors text-left"
                    >
                      <span className="font-medium">{l.native}</span>
                      {lang === l.code && <Check className="w-3.5 h-3.5 text-agri-700" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Regional alert notification icon */}
          <button
            onClick={() => navigate('/alerts')}
            className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="View early alerts"
          >
            <Bell className="w-4 h-4 text-gray-700" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-600 ring-2 ring-white"></span>
          </button>

          {/* User Profile avatar pill */}
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-left bg-white"
          >
            <div className="w-7 h-7 rounded-full bg-agri-800 text-agri-100 flex items-center justify-center text-xs font-semibold">
              {farmer.name.charAt(0)}
            </div>
            <div className="hidden lg:block text-left pr-1 leading-tight">
              <p className="text-xs font-semibold text-gray-900 leading-none">{farmer.name}</p>
              <p className="text-[10px] text-gray-500 leading-none mt-0.5">{farmer.village.split(',')[0]}</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
