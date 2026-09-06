import React, { useState } from 'react';
import { User, Phone, MapPin, Sprout, Globe, Check, Save } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const ProfilePage = () => {
  const { farmer, updateProfile } = useAuth();
  const { lang, setLanguage, t, availableLanguages } = useLanguage();

  const [formData, setFormData] = useState({ ...farmer });
  const [showSavedNotification, setShowSavedNotification] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLanguageChange = (code) => {
    setLanguage(code);
    handleChange('preferredLanguage', code);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setShowSavedNotification(true);
    setTimeout(() => setShowSavedNotification(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-200/80 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            {t.profile.title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {t.profile.subtitle}
          </p>
        </div>

        {showSavedNotification && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>{t.profile.savedSuccess}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Personal Contact Details */}
        <Card className="border-gray-200/90 shadow-2xs">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
            <User className="w-4 h-4 text-agri-700" />
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              {t.profile.personalSection}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Farmer Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 focus:ring-1 focus:ring-agri-600 focus:border-agri-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                type="text"
                value={formData.mobile}
                onChange={(e) => handleChange('mobile', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 focus:ring-1 focus:ring-agri-600 focus:border-agri-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Village / Taluka
              </label>
              <input
                type="text"
                value={formData.village}
                onChange={(e) => handleChange('village', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 focus:ring-1 focus:ring-agri-600 focus:border-agri-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                District & State
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => handleChange('district', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 focus:ring-1 focus:ring-agri-600 focus:border-agri-600"
                  placeholder="District"
                  required
                />
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 focus:ring-1 focus:ring-agri-600 focus:border-agri-600"
                  placeholder="State"
                  required
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Section 2: Farm & Plot Information */}
        <Card className="border-gray-200/90 shadow-2xs">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
            <Sprout className="w-4 h-4 text-agri-700" />
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              {t.profile.farmSection}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Primary Crop(s)
              </label>
              <input
                type="text"
                value={formData.primaryCrop}
                onChange={(e) => handleChange('primaryCrop', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 focus:ring-1 focus:ring-agri-600 focus:border-agri-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Landholding Area
              </label>
              <input
                type="text"
                value={formData.farmSize}
                onChange={(e) => handleChange('farmSize', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 focus:ring-1 focus:ring-agri-600 focus:border-agri-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Active Season
              </label>
              <input
                type="text"
                value={formData.season}
                onChange={(e) => handleChange('season', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 focus:ring-1 focus:ring-agri-600 focus:border-agri-600"
              />
            </div>
          </div>
        </Card>

        {/* Section 3: Language Preference */}
        <Card className="border-gray-200/90 shadow-2xs">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
            <Globe className="w-4 h-4 text-agri-700" />
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              {t.profile.prefSection}
            </h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Preferred Platform Language (Vernacular Dialect)
            </label>
            <div className="grid grid-cols-3 gap-3">
              {availableLanguages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => handleLanguageChange(l.code)}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    lang === l.code
                      ? 'border-agri-700 bg-agri-50 text-agri-950 font-bold ring-1 ring-agri-600'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-sm font-semibold">{l.native}</span>
                  <span className="text-[11px] text-gray-500 font-normal">({l.label})</span>
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            size="md"
            icon={Save}
            className="bg-agri-800 hover:bg-agri-900 text-white font-semibold px-6 shadow-sm"
          >
            {t.profile.saveBtn}
          </Button>
        </div>
      </form>
    </div>
  );
};
