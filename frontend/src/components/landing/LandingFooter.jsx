import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const LandingFooter = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-8 text-xs text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-10 border-b border-gray-100">
          {/* Brand Col */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-agri-800 text-white flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5 text-agri-300" />
              </div>
              <span className="font-extrabold text-base text-gray-900">{t.brandName}</span>
            </div>
            <p className="text-gray-500 max-w-sm text-xs leading-relaxed">
              {t.tagline}. Designed to give Indian farmers rapid clarity on crop health, severity assessment, and bio-safe IPM advisories.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-agri-50 border border-agri-200 text-agri-800 text-[11px] font-semibold">
              <Award className="w-3.5 h-3.5 text-agri-700" />
              <span>Smart India Hackathon 2026 — Problem SIH26131</span>
            </div>
          </div>

          {/* Quick Links 1 */}
          <div>
            <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] mb-3">Platform</h4>
            <ul className="space-y-2">
              <li><Link to="/detect" className="hover:text-agri-800 transition-colors">Crop Detection</Link></li>
              <li><Link to="/dashboard" className="hover:text-agri-800 transition-colors">Farmer Dashboard</Link></li>
              <li><Link to="/alerts" className="hover:text-agri-800 transition-colors">Regional Alerts</Link></li>
              <li><Link to="/recommendations" className="hover:text-agri-800 transition-colors">IPM Guidelines</Link></li>
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div>
            <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] mb-3">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#how-it-works" className="hover:text-agri-800 transition-colors">How It Works</a></li>
              <li><a href="#why-it-matters" className="hover:text-agri-800 transition-colors">Why Early Detection</a></li>
              <li><a href="#features" className="hover:text-agri-800 transition-colors">Key Features</a></li>
              <li><Link to="/profile" className="hover:text-agri-800 transition-colors">Farmer Settings</Link></li>
            </ul>
          </div>

          {/* Legal / Project */}
          <div>
            <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] mb-3">Hackathon Info</h4>
            <ul className="space-y-2">
              <li className="text-gray-500">SIH26131 Theme</li>
              <li className="text-gray-500">Agriculture & Food Tech</li>
              <li className="text-gray-500">Prototype Phase</li>
              <li className="text-gray-500">Contact: sih2026@kisanrakshak.in</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-400">
          <p>© 2026 KisanRakshak Project. Built for Smart India Hackathon 2026.</p>
          <p className="text-gray-500">Prototype Demonstration Frontend • Clean Agricultural SaaS Architecture</p>
        </div>
      </div>
    </footer>
  );
};
