import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react';
import { Card, CardHeader } from '../common/Card';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useLanguage } from '../../context/LanguageContext';

export const RecentScans = ({ scans }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedScan, setSelectedScan] = useState(null);

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
        return <AlertOctagon className="w-3.5 h-3.5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />;
      case 'healthy':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
      default:
        return null;
    }
  };

  return (
    <>
      <Card className="border-gray-200/90 overflow-hidden">
        <CardHeader
          title={t.dashboard.recentScansTitle}
          subtitle={t.dashboard.recentScansSubtitle}
          action={
            <button
              onClick={() => navigate('/history')}
              className="text-xs sm:text-sm font-semibold text-agri-700 hover:text-agri-800 inline-flex items-center gap-1 transition-colors"
            >
              <span>{t.dashboard.viewAllScans}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          }
        />

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto -mx-5 sm:-mx-6">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70 text-gray-500 font-medium">
                <th className="py-2.5 px-6">{t.dashboard.tableCols.crop}</th>
                <th className="py-2.5 px-4">{t.dashboard.tableCols.issue}</th>
                <th className="py-2.5 px-4">{t.dashboard.tableCols.confidence}</th>
                <th className="py-2.5 px-4">{t.dashboard.tableCols.severity}</th>
                <th className="py-2.5 px-4">{t.dashboard.tableCols.date}</th>
                <th className="py-2.5 px-4">{t.dashboard.tableCols.status}</th>
                <th className="py-2.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {scans.map((scan) => (
                <tr
                  key={scan.id}
                  onClick={() => setSelectedScan(scan)}
                  className="hover:bg-agri-50/40 cursor-pointer transition-colors group"
                >
                  <td className="py-3 px-6 font-semibold text-gray-900">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-700">
                        {scan.crop.charAt(0)}
                      </div>
                      <span>{scan.crop}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-800">
                    {scan.issue}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-agri-600 h-1.5 rounded-full"
                          style={{ width: `${scan.confidence}%` }}
                        ></div>
                      </div>
                      <span className="font-semibold text-xs text-gray-700">{scan.confidence}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={getSeverityBadgeVariant(scan.severityVariant)} size="sm">
                      <span className="flex items-center gap-1">
                        {getSeverityIcon(scan.severityVariant)}
                        {scan.severity}
                      </span>
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-gray-500 text-xs">
                    {scan.date}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                      scan.severityVariant === 'critical'
                        ? 'text-red-700 bg-red-50'
                        : scan.severityVariant === 'warning'
                        ? 'text-amber-700 bg-amber-50'
                        : 'text-emerald-700 bg-emerald-50'
                    }`}>
                      {scan.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-right">
                    <span className="text-xs font-medium text-agri-700 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
                      Inspect <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="md:hidden space-y-3 pt-1">
          {scans.map((scan) => (
            <div
              key={scan.id}
              onClick={() => setSelectedScan(scan)}
              className="p-3.5 rounded-xl border border-gray-200/90 bg-white hover:border-agri-400 active:bg-agri-50/30 transition-all flex flex-col gap-2.5 cursor-pointer shadow-2xs"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold text-agri-800 uppercase tracking-wider">{scan.crop}</span>
                  <h4 className="text-sm font-semibold text-gray-900 mt-0.5">{scan.issue}</h4>
                </div>
                <Badge variant={getSeverityBadgeVariant(scan.severityVariant)} size="sm">
                  {scan.severity}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 pt-1 border-t border-gray-100">
                <span>Confidence: <strong className="text-gray-700">{scan.confidence}%</strong></span>
                <span>{scan.date}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Click-to-inspect scan detail modal */}
      <Modal
        isOpen={Boolean(selectedScan)}
        onClose={() => setSelectedScan(null)}
        title={selectedScan ? `${selectedScan.crop} — ${selectedScan.issue}` : ''}
        subtitle={selectedScan ? `Scanned on ${selectedScan.date} • Confidence: ${selectedScan.confidence}%` : ''}
      >
        {selectedScan && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div>
                <span className="text-xs text-gray-500">Assessed Severity</span>
                <p className="text-sm font-bold text-gray-900 flex items-center gap-1.5 mt-0.5">
                  {getSeverityIcon(selectedScan.severityVariant)}
                  {selectedScan.severity} Level Threat
                </p>
              </div>
              <Badge variant={getSeverityBadgeVariant(selectedScan.severityVariant)} size="md">
                Status: {selectedScan.status}
              </Badge>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Diagnostic Summary</h4>
              <p className="text-sm text-gray-700 mt-1 leading-relaxed">{selectedScan.summary}</p>
            </div>

            <div className="p-3.5 bg-agri-50/80 rounded-xl border border-agri-200/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-agri-900">Recommended Action Plan</h4>
              <p className="text-sm text-agri-950 font-medium mt-1">{selectedScan.recommendationSummary}</p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <Button variant="outline" size="sm" onClick={() => setSelectedScan(null)}>
                Close
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setSelectedScan(null);
                  navigate(`/recommendations?crop=${selectedScan.crop}`);
                }}
              >
                View Full Management Guide
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};
