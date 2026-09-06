import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Globe, ArrowRight, User } from 'lucide-react';
import { Button } from '../common/Button';
import { useLanguage } from '../../context/LanguageContext';

export const LandingHeader = () => {
  const { lang, setLanguage, t, availableLanguages } = useLanguage();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-agri-800 text-agri-100 flex items-center justify-center font-bold shadow-xs">
            <ShieldCheck className="w-6 h-6 text-agri-300 group-hover:scale-105 transition-transform" />
          </div>
          <div>
            <span className="font-extrabold text-lg text-agri-950 tracking-tight block leading-tight">
              {t.brandName}
            </span>
            <span className="text-[10px] font-semibold text-agri-700 tracking-wide uppercase block">
              SIH2026 • SIH26131
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-gray-600">
          <a href="#how-it-works" className="hover:text-agri-800 transition-colors">How It Works</a>
          <a href="#features" className="hover:text-agri-800 transition-colors">Features</a>
          <a href="#why-it-matters" className="hover:text-agri-800 transition-colors">Why It Matters</a>
          <a href="#process" className="hover:text-agri-800 transition-colors">Workflow</a>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Vernacular Language Switcher */}
          <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 p-0.5 text-xs font-medium">
            {availableLanguages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`px-2 py-1 rounded-md transition-all ${
                  lang === l.code
                    ? 'bg-white text-agri-900 font-bold shadow-2xs'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {l.native}
              </button>
            ))}
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate('/login')}
            className="hidden sm:inline-flex"
          >
            {t.nav.login}
          </Button>

          <Button
            size="sm"
            onClick={() => navigate('/detect')}
            className="bg-agri-800 hover:bg-agri-900 shadow-xs"
          >
            {t.landing.checkCropBtn}
          </Button>
        </div>
      </div>
    </header>
  );
};
