import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  HelpCircle,
  RotateCcw,
  BookOpen,
  BellRing,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { RecommendationCard } from './RecommendationCard';
import { useLanguage } from '../../context/LanguageContext';

export const DetectionResult = ({ result, imageSrc, onScanAgain }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const getSeverityBadgeVariant = (variant) => {
    switch (variant) {
      case 'critical':
        return 'critical';
      case 'warning':
        return 'warning';
      case 'healthy':
        return 'healthy';
      default:
        return 'neutral';
    }
  };

  const getSeverityIcon = (variant) => {
    switch (variant) {
      case 'critical':
        return <AlertOctagon className="w-4 h-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'healthy':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      default:
        return <HelpCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Banner with Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Diagnostic Analysis Completed
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <Button variant="outline" size="sm" icon={RotateCcw} onClick={onScanAgain}>
            Scan Another Specimen
          </Button>
          <Button
            size="sm"
            onClick={() => navigate('/alerts')}
            variant="secondary"
            icon={BellRing}
          >
            Check Regional Alerts
          </Button>
        </div>
      </div>

      {/* Main Diagnostic Summary Card */}
      <Card className="border-gray-200/90 shadow-sm overflow-hidden p-0">
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Specimen Thumbnail on Left */}
          <div className="md:col-span-5 bg-gray-950 p-4 flex flex-col items-center justify-center min-h-[220px]">
            <img
              src={imageSrc}
              alt={result.crop}
              className="max-h-56 max-w-full rounded-lg object-contain border border-white/10"
            />
            <span className="text-[11px] text-gray-400 mt-2">Verified Leaf Specimen</span>
          </div>

          {/* Diagnostic Metrics on Right */}
          <div className="md:col-span-7 p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-agri-700 uppercase tracking-wider">
                  Target Crop: {result.crop.split('(')[0]}
                </span>
                <Badge variant={getSeverityBadgeVariant(result.severityVariant)} size="md">
                  <span className="flex items-center gap-1 font-semibold">
                    {getSeverityIcon(result.severityVariant)}
                    {result.severity} Severity Threat
                  </span>
                </Badge>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-2 leading-tight">
                {result.issue}
              </h2>

              {/* Confidence Meter */}
              <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                  <span className="text-gray-600">Diagnosis Confidence</span>
                  <span className="text-agri-800 font-bold">{result.confidence}% Match</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-agri-600 h-2.5 rounded-full transition-all duration-700"
                    style={{ width: `${result.confidence}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Diagnostic Stage tag */}
            <div className="mt-4 text-xs text-gray-600 flex items-center gap-2">
              <span className="font-semibold text-gray-700">Identified Stage:</span>
              <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-800 font-medium">
                {result.stage || 'Active Field Phase'}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* What We Found & Observed Symptoms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* What We Found */}
        <Card className="md:col-span-6 border-gray-200/90">
          <h3 className="text-sm sm:text-base font-bold text-gray-900 flex items-center gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-agri-700" />
            {t.detect.whatWeFound}
          </h3>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
            {result.whatWeFound}
          </p>
        </Card>

        {/* Observed Symptoms */}
        <Card className="md:col-span-6 border-gray-200/90">
          <h3 className="text-sm sm:text-base font-bold text-gray-900 flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            {t.detect.symptomsTitle}
          </h3>
          <ul className="space-y-1.5">
            {result.symptoms.map((symptom, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                <span className="text-agri-600 font-bold leading-none mt-1">•</span>
                <span>{symptom}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Recommendation Card Component */}
      <RecommendationCard
        recommendation={result.recommendation}
        cropName={result.crop.split('(')[0]}
      />
    </div>
  );
};
