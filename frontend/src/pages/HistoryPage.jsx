import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Download,
  ChevronRight,
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  X
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { EmptyState } from '../components/common/EmptyState';
import { initialHistoryRecords } from '../data/historyData';
import { useLanguage } from '../context/LanguageContext';

export const HistoryPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [records] = useState(initialHistoryRecords);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState('ALL');
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Sync search query from URL parameter if available (from global header search)
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Extract unique crops for filter dropdown
  const uniqueCrops = useMemo(() => {
    const crops = new Set(records.map(r => r.crop));
    return ['ALL', ...Array.from(crops)];
  }, [records]);

  // Filter records based on state
  const filteredRecords = useMemo(() => {
    return records.filter(item => {
      const matchSearch =
        searchQuery.trim() === '' ||
        item.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.fieldLocation.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCrop = selectedCrop === 'ALL' || item.crop === selectedCrop;
      const matchSeverity =
        selectedSeverity === 'ALL' ||
        item.severity.toUpperCase() === selectedSeverity.toUpperCase();

      return matchSearch && matchCrop && matchSeverity;
    });
  }, [records, searchQuery, selectedCrop, selectedSeverity]);

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

  const handleExportCSV = () => {
    const headers = ['Record ID', 'Date', 'Crop', 'Issue', 'Confidence', 'Severity', 'Status', 'Field Location'];
    const rows = filteredRecords.map(r => [
      r.id,
      r.formattedDate,
      r.crop,
      `"${r.issue}"`,
      `${r.confidence}%`,
      r.severity,
      r.status,
      `"${r.fieldLocation}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `KisanRakshak_History_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header & Export Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200/80 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            {t.history.title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {t.history.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Download}
            onClick={handleExportCSV}
          >
            {t.history.exportBtn}
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card padding="p-4" className="border-gray-200/90 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          {/* Search Box */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.history.searchPlaceholder}
              className="w-full pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-agri-600 focus:border-agri-600"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Crop Filter Dropdown */}
          <div className="sm:col-span-3">
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm text-gray-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-agri-600"
            >
              <option value="ALL">{t.history.filterCrop}</option>
              {uniqueCrops.filter(c => c !== 'ALL').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Severity Filter Dropdown */}
          <div className="sm:col-span-3">
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm text-gray-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-agri-600"
            >
              <option value="ALL">{t.history.filterSeverity}</option>
              <option value="HIGH">High (Critical)</option>
              <option value="MEDIUM">Medium (Warning)</option>
              <option value="LOW">Low (Healthy)</option>
            </select>
          </div>
        </div>

        {/* Active Filters count */}
        <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Showing <strong>{filteredRecords.length}</strong> {t.history.totalScansFound}</span>
          {(selectedCrop !== 'ALL' || selectedSeverity !== 'ALL' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCrop('ALL');
                setSelectedSeverity('ALL');
                setSearchQuery('');
              }}
              className="text-agri-700 hover:text-agri-900 font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>
      </Card>

      {/* History Records Table (Desktop) */}
      {filteredRecords.length > 0 ? (
        <Card padding="p-0" className="border-gray-200/90 overflow-hidden shadow-xs">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/80 text-gray-600 font-semibold">
                  <th className="py-3 px-5">Date</th>
                  <th className="py-3 px-4">Crop</th>
                  <th className="py-3 px-4">Detected Issue</th>
                  <th className="py-3 px-4">Confidence</th>
                  <th className="py-3 px-4">Severity</th>
                  <th className="py-3 px-4">Field Plot</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-5 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRecords.map((record) => (
                  <tr
                    key={record.id}
                    onClick={() => setSelectedRecord(record)}
                    className="hover:bg-agri-50/40 cursor-pointer transition-colors group"
                  >
                    <td className="py-3.5 px-5 text-gray-500 text-xs whitespace-nowrap">
                      {record.formattedDate}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-gray-900">
                      {record.crop}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-gray-800">
                      <div>{record.issue}</div>
                      <span className="text-[10px] text-gray-400 italic block">{record.scientificName}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-gray-800">{record.confidence}%</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={getSeverityBadgeVariant(record.severityVariant)} size="sm">
                        <span className="flex items-center gap-1">
                          {getSeverityIcon(record.severityVariant)}
                          {record.severity}
                        </span>
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-gray-500">
                      {record.fieldLocation}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                        record.severityVariant === 'critical'
                          ? 'text-red-700 bg-red-50'
                          : record.severityVariant === 'warning'
                          ? 'text-amber-700 bg-amber-50'
                          : 'text-emerald-700 bg-emerald-50'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <span className="text-xs font-medium text-agri-700 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
                        View <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-100">
            {filteredRecords.map((record) => (
              <div
                key={record.id}
                onClick={() => setSelectedRecord(record)}
                className="p-4 hover:bg-agri-50/30 cursor-pointer space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-agri-800 uppercase tracking-wider">{record.crop}</span>
                    <h4 className="text-sm font-semibold text-gray-900 mt-0.5">{record.issue}</h4>
                  </div>
                  <Badge variant={getSeverityBadgeVariant(record.severityVariant)} size="sm">
                    {record.severity}
                  </Badge>
                </div>

                <div className="text-xs text-gray-500 flex items-center justify-between pt-1">
                  <span>Plot: {record.fieldLocation}</span>
                  <span>{record.formattedDate}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <EmptyState
          title="No diagnosis scans match your filter"
          description="Try clearing your search query or choosing 'All Crops' to view complete records."
          action={
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSelectedCrop('ALL');
                setSelectedSeverity('ALL');
                setSearchQuery('');
              }}
            >
              Reset All Filters
            </Button>
          }
        />
      )}

      {/* Detail Modal */}
      <Modal
        isOpen={Boolean(selectedRecord)}
        onClose={() => setSelectedRecord(null)}
        title={selectedRecord ? `${selectedRecord.crop} — ${selectedRecord.issue}` : ''}
        subtitle={selectedRecord ? `Scan ID: ${selectedRecord.id} • ${selectedRecord.formattedDate}` : ''}
      >
        {selectedRecord && (
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-gray-500 block">Scientific Classification</span>
                <span className="font-semibold text-gray-800 italic">{selectedRecord.scientificName}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Confidence Level</span>
                <span className="font-bold text-agri-800">{selectedRecord.confidence}% Match</span>
              </div>
              <div>
                <span className="text-gray-500 block">Assessed Plot</span>
                <span className="font-medium text-gray-800">{selectedRecord.fieldLocation}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Current Action Status</span>
                <Badge variant={getSeverityBadgeVariant(selectedRecord.severityVariant)} size="sm">
                  {selectedRecord.status}
                </Badge>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Field Scout Notes</h4>
              <p className="text-xs sm:text-sm text-gray-700 mt-1 leading-relaxed">{selectedRecord.notes}</p>
            </div>

            <div className="p-3.5 bg-agri-50 rounded-xl border border-agri-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-agri-950">Management Recommendation</h4>
              <p className="text-xs sm:text-sm text-agri-900 font-medium mt-1 leading-relaxed">
                {selectedRecord.recommendationSummary}
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
              <Button variant="outline" size="sm" onClick={() => setSelectedRecord(null)}>
                Close
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setSelectedRecord(null);
                  navigate(`/recommendations?crop=${selectedRecord.crop}`);
                }}
              >
                View Full Management Guide
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
