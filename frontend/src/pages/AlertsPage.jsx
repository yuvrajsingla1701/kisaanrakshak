import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  AlertTriangle,
  Info,
  MapPin,
  Radio,
  TrendingUp,
  ArrowRight,
  Filter,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { Card, CardHeader } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { regionalAlertsData } from '../data/alertData';
import { useLanguage } from '../context/LanguageContext';

export const AlertsPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL' | 'CRITICAL' | 'WARNING' | 'INFO'

  const filteredHotspots = regionalAlertsData.hotspots.filter(h => {
    if (activeTab === 'ALL') return true;
    return h.riskLevel === activeTab;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200/80 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            {t.alerts.title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {t.alerts.subtitle} • <span className="font-semibold text-agri-800">{regionalAlertsData.activeRegion}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-2xs">
            {regionalAlertsData.lastClusterSync}
          </span>
        </div>
      </div>

      {/* District Intelligence Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card padding="p-3.5" className="border-gray-200">
          <span className="text-xs text-gray-500 block">District Reports (7d)</span>
          <span className="text-xl font-bold text-gray-900 mt-0.5 block">{regionalAlertsData.regionalStats.totalReportsToday}</span>
        </Card>
        <Card padding="p-3.5" className="border-red-200 bg-red-50/30">
          <span className="text-xs text-red-700 font-semibold block">Critical High-Risk Zones</span>
          <span className="text-xl font-bold text-red-950 mt-0.5 block">{regionalAlertsData.regionalStats.highRiskDistricts}</span>
        </Card>
        <Card padding="p-3.5" className="border-amber-200 bg-amber-50/30">
          <span className="text-xs text-amber-700 font-semibold block">Quarantine Clusters</span>
          <span className="text-xl font-bold text-amber-950 mt-0.5 block">{regionalAlertsData.regionalStats.quarantineClusters}</span>
        </Card>
        <Card padding="p-3.5" className="border-agri-200 bg-agri-50/30">
          <span className="text-xs text-agri-700 font-semibold block">Active Monitoring Stations</span>
          <span className="text-xl font-bold text-agri-950 mt-0.5 block">{regionalAlertsData.regionalStats.activeMonitoringPoles}</span>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab('ALL')}
          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'ALL'
              ? 'bg-agri-800 text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          All Alerts ({regionalAlertsData.hotspots.length})
        </button>
        <button
          onClick={() => setActiveTab('CRITICAL')}
          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'CRITICAL'
              ? 'bg-red-600 text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Critical ({regionalAlertsData.hotspots.filter(h => h.riskLevel === 'CRITICAL').length})
        </button>
        <button
          onClick={() => setActiveTab('WARNING')}
          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'WARNING'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Warning ({regionalAlertsData.hotspots.filter(h => h.riskLevel === 'WARNING').length})
        </button>
        <button
          onClick={() => setActiveTab('INFO')}
          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'INFO'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Advisory ({regionalAlertsData.hotspots.filter(h => h.riskLevel === 'INFO').length})
        </button>
      </div>

      {/* Alert Cards Grid */}
      <div className="space-y-4">
        {filteredHotspots.map((hotspot) => {
          const isCritical = hotspot.riskLevel === 'CRITICAL';
          const isWarning = hotspot.riskLevel === 'WARNING';

          return (
            <Card
              key={hotspot.id}
              className={`border transition-all ${
                isCritical
                  ? 'border-red-300 bg-linear-to-r from-red-50/80 via-white to-white'
                  : isWarning
                  ? 'border-amber-300 bg-linear-to-r from-amber-50/70 via-white to-white'
                  : 'border-blue-200 bg-linear-to-r from-blue-50/50 via-white to-white'
              }`}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl shrink-0 ${
                    isCritical
                      ? 'bg-red-100 text-red-700'
                      : isWarning
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {isCritical ? <ShieldAlert className="w-5 h-5 animate-pulse" /> : isWarning ? <AlertTriangle className="w-5 h-5" /> : <Info className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant={hotspot.severityVariant} size="sm" dot={true}>
                        {hotspot.riskLevel} RISK
                      </Badge>
                      <span className="text-xs font-bold text-gray-900 bg-white px-2 py-0.5 rounded border border-gray-200">
                        {hotspot.crop}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900">
                        {hotspot.threat}
                      </h3>
                    </div>

                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span>{hotspot.name}</span>
                      <span className="font-semibold text-agri-800">({hotspot.distance})</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-gray-200 text-gray-700 shadow-2xs">
                    <Radio className="w-3 h-3 text-red-500" />
                    {hotspot.clusterReports} local reports
                  </span>
                  <span className="text-gray-500 hidden md:inline">
                    {hotspot.spreadTrend}
                  </span>
                </div>
              </div>

              {/* Advisory Body */}
              <div className="mt-3.5 space-y-3">
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">Advisory: </strong>
                  {hotspot.advisory}
                </p>

                {/* Immediate Preventive Checklist */}
                <div className="bg-white/80 p-3.5 rounded-xl border border-gray-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Recommended Regional Actions:
                  </h4>
                  <ul className="space-y-1.5">
                    {hotspot.actions.map((act, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-agri-600 shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Link */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => navigate(`/detect`)}
                    className="text-xs font-bold text-agri-800 hover:text-agri-950 inline-flex items-center gap-1"
                  >
                    Check Your {hotspot.crop} Plot Now
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => navigate(`/recommendations?crop=${hotspot.crop}`)}
                    className="text-xs font-medium text-gray-500 hover:text-gray-800"
                  >
                    View IPM Protocol
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
