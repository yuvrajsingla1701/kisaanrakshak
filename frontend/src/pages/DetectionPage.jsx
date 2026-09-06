import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ImageUploader } from '../components/detection/ImageUploader';
import { ImagePreview } from '../components/detection/ImagePreview';
import { DetectionLoader } from '../components/detection/DetectionLoader';
import { DetectionResult } from '../components/detection/DetectionResult';
import { detectionPresets, defaultDetectionResult } from '../data/detectionData';
import { useLanguage } from '../context/LanguageContext';

export const DetectionPage = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectionResult, setDetectionResult] = useState(null);

  // Check if routed from dashboard with preset or uploaded image
  useEffect(() => {
    const presetId = searchParams.get('preset');
    const mode = searchParams.get('mode');

    if (presetId) {
      const found = detectionPresets.find(p => p.id === presetId);
      if (found) {
        setSelectedImage(found.previewImage);
        setImageName(found.title);
        // Automatically run simulated diagnosis
        runSimulatedDiagnosis(found.diagnosis);
      }
    } else if (mode === 'analyze') {
      const savedImg = sessionStorage.getItem('kisan_uploaded_image');
      if (savedImg) {
        setSelectedImage(savedImg);
        setImageName('Field Photo Specimen.jpg');
        sessionStorage.removeItem('kisan_uploaded_image');
      }
    }
  }, [searchParams]);

  const handleImageSelect = (dataUrl, fileName) => {
    setSelectedImage(dataUrl);
    setImageName(fileName);
    setDetectionResult(null);
  };

  const handleSelectPreset = (preset) => {
    setSelectedImage(preset.previewImage);
    setImageName(preset.title);
    runSimulatedDiagnosis(preset.diagnosis);
  };

  const runSimulatedDiagnosis = (customResult = null) => {
    setIsAnalyzing(true);
    setDetectionResult(null);

    // Simulate AI inference latency (1.8 seconds)
    setTimeout(() => {
      setIsAnalyzing(false);
      setDetectionResult(customResult || defaultDetectionResult);
    }, 1800);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setImageName('');
    setDetectionResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      {!detectionResult && (
        <div className="border-b border-gray-200/80 pb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            {t.detect.pageTitle}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {t.detect.pageSubtitle}
          </p>
        </div>
      )}

      {/* State 1: Upload or pick preset */}
      {!selectedImage && !isAnalyzing && !detectionResult && (
        <ImageUploader
          onImageSelect={handleImageSelect}
          onSelectPreset={handleSelectPreset}
        />
      )}

      {/* State 2: Image Preview before analysis */}
      {selectedImage && !isAnalyzing && !detectionResult && (
        <ImagePreview
          imageSrc={selectedImage}
          imageName={imageName}
          onAnalyze={() => runSimulatedDiagnosis()}
          onReset={handleReset}
          isAnalyzing={isAnalyzing}
        />
      )}

      {/* State 3: Analysis in progress */}
      {isAnalyzing && (
        <DetectionLoader />
      )}

      {/* State 4: Diagnosis Results & Recommendations */}
      {detectionResult && !isAnalyzing && (
        <DetectionResult
          result={detectionResult}
          imageSrc={selectedImage || '/samples/cotton_bollworm.svg'}
          onScanAgain={handleReset}
        />
      )}
    </div>
  );
};
