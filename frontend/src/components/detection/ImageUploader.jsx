import React, { useRef, useState } from 'react';
import { UploadCloud, Camera, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
import { useLanguage } from '../../context/LanguageContext';
import { detectionPresets } from '../../data/detectionData';

export const ImageUploader = ({ onImageSelect, onSelectPreset }) => {
  const { t } = useLanguage();
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPG, PNG, WEBP)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      onImageSelect(event.target.result, file.name);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {/* Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all bg-white cursor-pointer ${
          isDragging
            ? 'border-agri-600 bg-agri-50/50 scale-[1.01]'
            : 'border-gray-300 hover:border-agri-500 hover:bg-gray-50/50'
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
        />

        <div className="w-16 h-16 rounded-full bg-agri-50 text-agri-700 flex items-center justify-center mx-auto mb-4 border border-agri-100">
          <UploadCloud className="w-8 h-8" />
        </div>

        <h3 className="text-base sm:text-lg font-bold text-gray-900">
          {t.detect.dropTitle}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-sm mx-auto">
          {t.detect.dropSubtitle}
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button
            type="button"
            icon={ImageIcon}
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
          >
            {t.detect.browseBtn}
          </Button>

          <Button
            type="button"
            variant="outline"
            icon={Camera}
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
          >
            {t.detect.orCamera}
          </Button>
        </div>
      </div>

      {/* Preset Samples Picker */}
      <div className="bg-agri-50/70 border border-agri-200/80 rounded-xl p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-agri-700" />
          <h4 className="text-xs sm:text-sm font-bold text-agri-950 uppercase tracking-wider">
            Quick Test Preset Samples (Instant Prototype Diagnosis)
          </h4>
        </div>
        <p className="text-xs text-agri-800 mb-3">
          Click any verified agricultural sample below to simulate instant diagnosis without uploading your own photo:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {detectionPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className="flex items-center gap-3 p-2.5 rounded-lg bg-white border border-agri-200 hover:border-agri-500 hover:shadow-xs text-left transition-all group"
            >
              <img
                src={preset.thumbnail}
                alt={preset.title}
                className="w-12 h-12 rounded-md object-cover border border-gray-200 bg-gray-50 shrink-0"
              />
              <div className="min-w-0">
                <span className="text-[11px] font-bold text-agri-800 uppercase block">
                  {preset.crop}
                </span>
                <p className="text-xs font-semibold text-gray-900 truncate group-hover:text-agri-700">
                  {preset.diagnosis.issue.split('(')[0]}
                </p>
                <span className={`text-[10px] font-medium px-1.5 py-0.2 rounded mt-0.5 inline-block ${
                  preset.diagnosis.severityVariant === 'critical'
                    ? 'bg-red-50 text-red-700'
                    : preset.diagnosis.severityVariant === 'warning'
                    ? 'bg-amber-50 text-amber-700'
                    : 'bg-emerald-50 text-emerald-700'
                }`}>
                  {preset.diagnosis.severity} Threat
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
