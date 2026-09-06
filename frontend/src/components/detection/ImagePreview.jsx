import React from 'react';
import { RefreshCw, Play, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { useLanguage } from '../../context/LanguageContext';

export const ImagePreview = ({ imageSrc, imageName, onAnalyze, onReset, isAnalyzing }) => {
  const { t } = useLanguage();

  return (
    <Card className="max-w-2xl mx-auto border-gray-200/90 overflow-hidden p-0">
      {/* Image Display Area */}
      <div className="relative bg-gray-900 flex items-center justify-center min-h-[280px] sm:min-h-[340px] max-h-[420px] overflow-hidden">
        <img
          src={imageSrc}
          alt="Uploaded Crop Specimen"
          className="w-full h-full object-contain max-h-[400px]"
        />

        {/* Floating Specimen Badge */}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1.5 border border-white/20">
          <CheckCircle2 className="w-3.5 h-3.5 text-agri-400" />
          <span>Specimen Ready: {imageName || 'Crop Photo'}</span>
        </div>
      </div>

      {/* Control Strip */}
      <div className="p-5 sm:p-6 bg-white border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm sm:text-base font-bold text-gray-900">
            Verify Crop Image Before Diagnosis
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">
            Ensure the affected leaf or insect damage is clearly focused for maximum diagnostic accuracy.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="outline"
            size="md"
            icon={RefreshCw}
            onClick={onReset}
            disabled={isAnalyzing}
          >
            {t.detect.clearBtn}
          </Button>

          <Button
            variant="primary"
            size="md"
            icon={Play}
            onClick={onAnalyze}
            isLoading={isAnalyzing}
            className="bg-agri-700 hover:bg-agri-800"
          >
            {t.detect.analyzeBtn}
          </Button>
        </div>
      </div>
    </Card>
  );
};
