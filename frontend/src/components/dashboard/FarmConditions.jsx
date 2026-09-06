import React from 'react';
import { CloudRain, Droplets, Thermometer, Wind, Compass, Info } from 'lucide-react';
import { Card, CardHeader } from '../common/Card';
import { useLanguage } from '../../context/LanguageContext';

export const FarmConditions = ({ conditions }) => {
  const { t } = useLanguage();

  return (
    <Card className="border-gray-200/90">
      <CardHeader
        title={t.dashboard.farmConditionsTitle}
        subtitle={`${conditions.location} • ${conditions.updatedAt}`}
        action={
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            <Info className="w-3 h-3" />
            Mock Sensor Feed
          </span>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-2">
        {/* Temperature */}
        <div className="p-3.5 rounded-xl bg-orange-50/60 border border-orange-100 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-orange-100 text-orange-700 shrink-0">
            <Thermometer className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-600 font-medium">Temperature</p>
            <p className="text-lg sm:text-xl font-bold text-gray-900 leading-tight mt-0.5">
              {conditions.temperature.value}{conditions.temperature.unit}
            </p>
            <p className="text-[10px] text-orange-800 font-medium truncate mt-0.5">
              {conditions.temperature.status}
            </p>
          </div>
        </div>

        {/* Humidity */}
        <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-700 shrink-0">
            <Droplets className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-600 font-medium">Humidity</p>
            <p className="text-lg sm:text-xl font-bold text-gray-900 leading-tight mt-0.5">
              {conditions.humidity.value}{conditions.humidity.unit}
            </p>
            <p className="text-[10px] text-blue-800 font-medium truncate mt-0.5" title={conditions.humidity.status}>
              Spore Alert ({conditions.humidity.status.split(' ')[0]})
            </p>
          </div>
        </div>

        {/* Rain Probability */}
        <div className="p-3.5 rounded-xl bg-cyan-50/60 border border-cyan-100 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-cyan-100 text-cyan-700 shrink-0">
            <CloudRain className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-600 font-medium">Rain Probability</p>
            <p className="text-lg sm:text-xl font-bold text-gray-900 leading-tight mt-0.5">
              {conditions.rainProbability.value}{conditions.rainProbability.unit}
            </p>
            <p className="text-[10px] text-cyan-800 font-medium truncate mt-0.5">
              {conditions.rainProbability.status}
            </p>
          </div>
        </div>

        {/* Wind */}
        <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
            <Wind className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-600 font-medium">Wind Speed</p>
            <p className="text-lg sm:text-xl font-bold text-gray-900 leading-tight mt-0.5">
              {conditions.windSpeed.value} <span className="text-xs font-semibold">{conditions.windSpeed.unit}</span>
            </p>
            <p className="text-[10px] text-emerald-800 font-medium truncate mt-0.5">
              {conditions.windSpeed.status}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 text-[11px] text-gray-500 bg-gray-50/80 p-2 rounded-lg flex items-center justify-between border border-gray-100">
        <span>Soil Moisture Index: <strong className="text-gray-700 font-semibold">{conditions.soilMoisture.value}% (Adequate)</strong></span>
        <span className="text-gray-400">Architecture ready for OpenWeather / IMD API integration</span>
      </div>
    </Card>
  );
};
