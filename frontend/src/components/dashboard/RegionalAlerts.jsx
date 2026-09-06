import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, MapPin, ArrowRight, ShieldAlert, Radio } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useLanguage } from '../../context/LanguageContext';

export const RegionalAlerts = ({ bannerAlert }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <Card className="border-red-200/80 bg-linear-to-r from-red-50/70 via-white to-amber-50/40 p-5 sm:p-6 relative overflow-hidden">
      {/* Top Warning Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-red-100 pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-red-100 text-red-700 animate-pulse">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm sm:text-base font-bold text-red-950">
                {t.dashboard.regionalAlertTitle}
              </h4>
              <Badge variant="critical" size="sm" dot={true}>
                {bannerAlert.riskLevel} RISK
              </Badge>
            </div>
            <p className="text-xs text-red-800 font-medium mt-0.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
              {bannerAlert.location}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-red-700 bg-red-100/60 px-2.5 py-1 rounded-full">
            <Radio className="w-3 h-3 animate-ping text-red-600" />
            {bannerAlert.reportedCount}
          </span>
        </div>
      </div>

      {/* Main Grid: Alert Details + Simple Map-Style Cluster Visual */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Left: Pest details and action */}
        <div className="md:col-span-8 space-y-2.5">
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Affected Crop:</span>
            <span className="text-sm font-bold text-gray-900 bg-white px-2 py-0.5 rounded border border-gray-200">
              {bannerAlert.crop}
            </span>
            <span className="text-xs font-semibold text-red-900">
              {bannerAlert.issue}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
            <strong className="font-semibold text-gray-900">Recommended Action: </strong>
            {bannerAlert.action}
          </p>

          <div className="pt-1 flex items-center gap-3">
            <Button
              size="sm"
              variant="danger"
              onClick={() => navigate('/alerts')}
            >
              View Geo-Cluster Advisory
            </Button>
            <button
              onClick={() => navigate(`/recommendations?crop=${bannerAlert.crop}`)}
              className="text-xs font-medium text-gray-600 hover:text-agri-800 inline-flex items-center gap-1 transition-colors"
            >
              View IPM Treatment Guidelines
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right: Clean Map-Style Visual Indicator */}
        <div className="md:col-span-4 bg-white p-3 rounded-xl border border-red-100 shadow-2xs">
          <div className="h-28 rounded-lg bg-[#eef3ea] relative overflow-hidden border border-agri-200 flex items-center justify-center">
            {/* Grid coordinate overlay */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#15803d_1px,transparent_1px)] [background-size:12px_12px]"></div>

            {/* Simulated farm point (user) */}
            <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <span className="w-3 h-3 rounded-full bg-agri-600 ring-4 ring-agri-200"></span>
              <span className="text-[9px] font-bold text-agri-900 bg-white/90 px-1 rounded shadow-2xs mt-1">Your Farm</span>
            </div>

            {/* Simulated Hotspot Cluster Point */}
            <div className="absolute right-1/4 top-1/3 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <span className="w-4 h-4 rounded-full bg-red-600 ring-8 ring-red-400/30 animate-pulse"></span>
              <span className="text-[9px] font-bold text-red-900 bg-white/95 px-1 rounded shadow-2xs mt-1">Outbreak Cluster</span>
            </div>

            {/* Radius line */}
            <div className="absolute left-1/3 top-1/2 w-24 h-px border-t border-dashed border-red-400 rotate-[-15deg] pointer-events-none"></div>
            <span className="absolute bottom-1 right-2 text-[9px] font-medium text-gray-500 bg-white/80 px-1 rounded">
              18 km radius
            </span>
          </div>
          <p className="text-[10px] text-gray-500 text-center mt-1.5 font-medium">
            Geo-fenced risk cluster active for Morshi/Amravati
          </p>
        </div>
      </div>
    </Card>
  );
};
