import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  BookOpen,
  Leaf,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Search,
  CalendarCheck,
  AlertTriangle
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { cropsRecommendationCatalog } from '../data/recommendationData';
import { useLanguage } from '../context/LanguageContext';

export const RecommendationsPage = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const crops = Object.keys(cropsRecommendationCatalog);
  const initialCrop = searchParams.get('crop') || 'Cotton';
  const [selectedCrop, setSelectedCrop] = useState(crops.includes(initialCrop) ? initialCrop : 'Cotton');

  const availableIssues = cropsRecommendationCatalog[selectedCrop] || [];
  const [selectedIssueId, setSelectedIssueId] = useState(availableIssues[0]?.id || '');

  // Keep state synced when crop selector changes
  useEffect(() => {
    const issues = cropsRecommendationCatalog[selectedCrop] || [];
    if (issues.length > 0) {
      setSelectedIssueId(issues[0].id);
    }
  }, [selectedCrop]);

  const activeIssue = availableIssues.find(i => i.id === selectedIssueId) || availableIssues[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-200/80 pb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          {t.recommendations.title}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          {t.recommendations.subtitle}
        </p>
      </div>

      {/* Selectors Bar */}
      <Card padding="p-4 sm:p-5" className="border-gray-200/90 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Crop Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
              {t.recommendations.selectCrop}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {crops.map((crop) => (
                <button
                  key={crop}
                  onClick={() => setSelectedCrop(crop)}
                  className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all text-center ${
                    selectedCrop === crop
                      ? 'bg-agri-800 text-white border-agri-800 shadow-xs'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>

          {/* Issue Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
              {t.recommendations.selectIssue}
            </label>
            <select
              value={selectedIssueId}
              onChange={(e) => setSelectedIssueId(e.target.value)}
              className="w-full py-2 px-3 rounded-lg text-xs sm:text-sm bg-white border border-gray-200 text-gray-800 font-medium focus:ring-1 focus:ring-agri-600 focus:border-agri-600"
            >
              {availableIssues.map((issue) => (
                <option key={issue.id} value={issue.id}>
                  {issue.issueName} ({issue.threatCategory})
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Active Management Protocol Display */}
      {activeIssue && (
        <div className="space-y-5">
          {/* Overview Banner */}
          <Card className="border-agri-200 bg-linear-to-r from-agri-50/60 to-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-agri-800">
                  {selectedCrop} Management Protocol
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-gray-950 mt-1">
                  {activeIssue.issueName}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
                  {activeIssue.summary}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <Badge variant={activeIssue.severity === 'High' ? 'critical' : 'warning'} size="md">
                  {activeIssue.severity} Threat Level
                </Badge>
              </div>
            </div>
          </Card>

          {/* Protocol Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 1. Immediate Field Action */}
            <Card className="border-red-200/80 bg-red-50/20">
              <div className="flex items-center gap-2 text-red-900 font-bold text-xs uppercase tracking-wider mb-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span>{t.recommendations.immediateTab}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-normal">
                {activeIssue.immediateAction}
              </p>
            </Card>

            {/* 2. Biological Bio-Agents */}
            <Card className="border-agri-200/80 bg-agri-50/20">
              <div className="flex items-center gap-2 text-agri-900 font-bold text-xs uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 text-agri-600" />
                <span>{t.recommendations.biologicalTab}</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-800">
                {activeIssue.biologicalOptions.map((opt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-agri-600 font-bold mt-0.5">•</span>
                    <span>{opt}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* 3. Cultural & Preventive Sanitation */}
            <Card className="border-gray-200">
              <div className="flex items-center gap-2 text-gray-800 font-bold text-xs uppercase tracking-wider mb-2">
                <Leaf className="w-4 h-4 text-agri-700" />
                <span>{t.recommendations.culturalTab}</span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-gray-700">
                {activeIssue.culturalPractices.map((prac, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-agri-600 font-bold mt-0.5">•</span>
                    <span>{prac}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* 4. Monitoring & Scouting Schedule */}
            <Card className="border-gray-200">
              <div className="flex items-center gap-2 text-gray-800 font-bold text-xs uppercase tracking-wider mb-2">
                <CalendarCheck className="w-4 h-4 text-agri-700" />
                <span>{t.recommendations.monitoringTab}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                {activeIssue.monitoringGuideline}
              </p>
            </Card>
          </div>

          {/* Safety & Advisory Disclaimer */}
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-950 space-y-1">
              <p className="font-bold text-amber-900">Prototype Agricultural Guidance Disclaimer</p>
              <p className="text-amber-900/90 leading-relaxed">
                {activeIssue.safetyNotice} The information presented here illustrates Integrated Pest Management principles (using biocontrol agents such as <em>Beauveria bassiana</em> and <em>Trichoderma viride</em>). Always read manufacturer labels and verify with local agricultural officers before executing treatments.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
