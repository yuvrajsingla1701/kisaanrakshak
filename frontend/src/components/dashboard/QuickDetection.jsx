import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, Camera, ArrowRight, Sparkles } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { useLanguage } from '../../context/LanguageContext';
import { detectionPresets } from '../../data/detectionData';

export const QuickDetection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        sessionStorage.setItem('kisan_uploaded_image', event.target.result);
        navigate('/detect?mode=analyze');
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePresetSelect = (presetId) => {
    navigate(`/detect?preset=${presetId}`);
  };

  return (
    <Card className="bg-linear-to-br from-agri-900 via-agri-800 to-[#102c17] text-white border-none shadow-md overflow-hidden relative">
      {/* Decorative leaf contour */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Callout */}
        <div className="lg:col-span-7 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-agri-500/30 border border-agri-400/30 text-agri-200 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-agri-300" />
            <span>AI Powered Rapid Diagnosis</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
            {t.dashboard.quickActionTitle}
          </h3>

          <p className="text-agri-100/90 text-xs sm:text-sm max-w-xl leading-relaxed">
            {t.dashboard.quickActionDesc}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-white text-agri-900 hover:bg-agri-50 font-semibold shadow-sm"
              icon={UploadCloud}
            >
              {t.dashboard.uploadBtn}
            </Button>

            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              icon={Camera}
            >
              {t.dashboard.cameraBtn}
            </Button>

            <button
              onClick={() => navigate('/detect')}
              className="text-xs sm:text-sm text-agri-200 hover:text-white font-medium inline-flex items-center gap-1 ml-1 transition-colors"
            >
              <span>{t.landing.exploreBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Quick Sample Presets for Testing */}
        <div className="lg:col-span-5 bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/15">
          <p className="text-xs font-semibold text-agri-200 mb-2.5 uppercase tracking-wider">
            {t.dashboard.samplePresetsTitle}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {detectionPresets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handlePresetSelect(preset.id)}
                className="flex items-center gap-2 p-2 rounded-lg bg-black/20 hover:bg-black/40 border border-white/10 text-left transition-all group"
              >
                <img
                  src={preset.thumbnail}
                  alt={preset.title}
                  className="w-9 h-9 rounded object-cover border border-white/20 bg-white/10 shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-white truncate group-hover:text-agri-200">
                    {preset.crop}
                  </p>
                  <p className="text-[10px] text-agri-300 truncate">
                    {preset.title.split('—')[1] || preset.category}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
