import React, { useEffect, useState } from 'react';
import { Sprout, CheckCircle2, ShieldCheck, Microscope } from 'lucide-react';
import { Card } from '../common/Card';
import { useLanguage } from '../../context/LanguageContext';

export const DetectionLoader = () => {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);

  const steps = [
    "Preprocessing high-resolution leaf surface...",
    "Scanning chlorotic margins and lesion patterns...",
    "Correlating symptoms with ICAR agricultural disease registry...",
    "Synthesizing Integrated Pest Management (IPM) protocol..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="max-w-xl mx-auto p-8 text-center border-agri-200 bg-white shadow-md">
      <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
        {/* Pulsing ring */}
        <div className="absolute inset-0 rounded-full border-4 border-agri-100 border-t-agri-600 animate-spin"></div>
        <div className="w-14 h-14 rounded-full bg-agri-50 flex items-center justify-center text-agri-700">
          <Microscope className="w-7 h-7 animate-pulse text-agri-700" />
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-1">
        {t.detect.analyzing}
      </h3>
      <p className="text-xs text-gray-500 mb-6">
        {t.detect.analyzingSub}
      </p>

      {/* Progressive Checkpoints */}
      <div className="space-y-2.5 max-w-sm mx-auto text-left">
        {steps.map((label, idx) => (
          <div
            key={label}
            className={`flex items-center gap-2.5 p-2 rounded-lg text-xs transition-all ${
              idx <= step ? 'text-gray-900 bg-agri-50/80 font-medium' : 'text-gray-400'
            }`}
          >
            {idx < step ? (
              <CheckCircle2 className="w-4 h-4 text-agri-600 shrink-0" />
            ) : idx === step ? (
              <div className="w-4 h-4 rounded-full border-2 border-agri-600 border-t-transparent animate-spin shrink-0"></div>
            ) : (
              <div className="w-4 h-4 rounded-full border border-gray-300 shrink-0"></div>
            )}
            <span className="truncate">{label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
