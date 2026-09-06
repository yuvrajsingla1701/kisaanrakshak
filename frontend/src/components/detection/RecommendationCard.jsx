import React from 'react';
import { ShieldCheck, Leaf, AlertTriangle, AlertCircle, Sparkles, Check } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export const RecommendationCard = ({ recommendation, cropName }) => {
  if (!recommendation) return null;

  return (
    <Card className="border-agri-200/90 bg-linear-to-b from-white to-agri-50/30 p-5 sm:p-7 shadow-xs">
      {/* Title with Prototype badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-agri-100 pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-agri-700 text-white flex items-center justify-center shrink-0">
            <Leaf className="w-5 h-5 text-agri-200" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900">
              Recommended Management Strategy
            </h3>
            <p className="text-xs text-gray-500">
              Integrated Pest Management (IPM) & Biological Control for {cropName}
            </p>
          </div>
        </div>

        <Badge variant="agri" size="sm">
          Prototype Recommendation
        </Badge>
      </div>

      <div className="space-y-5">
        {/* 1. Immediate Action */}
        <div className="p-4 rounded-xl bg-red-50/70 border border-red-200/80">
          <div className="flex items-center gap-2 text-red-900 font-bold text-xs uppercase tracking-wider mb-1.5">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>Immediate Field Action</span>
          </div>
          <p className="text-xs sm:text-sm text-red-950 leading-relaxed font-medium">
            {recommendation.immediateAction}
          </p>
        </div>

        {/* 2. Management Approach */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">
            Management Approach
          </span>
          <p className="text-sm font-semibold text-agri-900 bg-agri-100/60 px-3 py-1.5 rounded-lg inline-block border border-agri-200">
            {recommendation.managementApproach}
          </p>
        </div>

        {/* 3. Biological & Bio-Agent Options */}
        {recommendation.biologicalOptions && recommendation.biologicalOptions.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-agri-900 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-agri-600" />
              <span>Possible Biological Options (Bio-Agents)</span>
            </div>
            <ul className="space-y-2">
              {recommendation.biologicalOptions.map((bioOption, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white border border-gray-200 text-xs sm:text-sm text-gray-800"
                >
                  <div className="w-4 h-4 rounded-full bg-agri-100 text-agri-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{bioOption}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 4. Cultural & Field Sanitation Practices */}
        {recommendation.culturalPractices && recommendation.culturalPractices.length > 0 && (
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">
              Cultural & Preventative Practices
            </span>
            <ul className="space-y-1.5">
              {recommendation.culturalPractices.map((practice, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 leading-snug"
                >
                  <span className="text-agri-600 font-bold">•</span>
                  <span>{practice}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 5. Safety Notice */}
        <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Safety & Local Guidance</p>
            <p className="mt-0.5 text-amber-800 leading-relaxed">
              {recommendation.safetyWarning || "Follow approved product labels and local agricultural guidance. Consult with your local Krishi Vigyan Kendra (KVK) or block agriculture officer before applying chemical formulations."}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
