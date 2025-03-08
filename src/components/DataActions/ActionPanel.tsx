import React, { useState } from 'react';
import { Download, Share2, RefreshCw, Mail, X, Check, Loader2, FileType, Send } from 'lucide-react';
import type { ShareFormData, ExportFormat, ActionPanelProps } from './types';

export default function ActionPanel({ onRefresh }: ActionPanelProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<ExportFormat>('pdf');
  const [exportSuccess, setExportSuccess] = useState<{ url: string; filename: string } | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [showSharePanel, setShowSharePanel] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [shareForm, setShareForm] = useState<ShareFormData>({
    email: '',
    message: '',
    format: 'pdf'
  });

  const handleExport = async () => {
    setIsExporting(true);
    setExportSuccess(null);
    
    try {
      // Simulate export generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful export with download URL
      const response = {
        url: '#',
        filename: `climate-report-${Date.now()}.${exportFormat}`
      };
      
      setExportSuccess(response);
      
      // Auto-download the file
      const link = document.createElement('a');
      link.href = response.url;
      link.download = response.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clear success state after 3 seconds
      setTimeout(() => {
        setExportSuccess(null);
      }, 3000);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSharing(true);
    setShareSuccess(false);
    setShareError(null);

    try {
      // Validate email
      if (!shareForm.email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      // Simulate API call to share report
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShareSuccess(true);
      
      // Reset form and close panel after success
      setTimeout(() => {
        setShareSuccess(false);
        setShowSharePanel(false);
        setShareForm({ email: '', message: '', format: 'pdf' });
      }, 2000);
    } catch (error) {
      setShareError(error instanceof Error ? error.message : 'Failed to share report');
    } finally {
      setIsSharing(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-end space-x-4">
        <div className="relative">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center space-x-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>{isExporting ? 'Exporting...' : 'Export'}</span>
          </button>
          {exportSuccess && (
            <div className="absolute top-full mt-2 right-0 bg-green-50 text-green-700 px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg">
              <Check className="w-4 h-4" />
              <span>Export complete!</span>
            </div>
          )}
        </div>

        <button
          onClick={() => setShowSharePanel(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>

        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center space-x-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
        </button>
      </div>

      {/* Share Panel */}
      {showSharePanel && (
        <div className="absolute top-full right-0 mt-4 w-96 bg-white rounded-lg shadow-xl border p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Share Report</h3>
            <button
              onClick={() => setShowSharePanel(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleShare} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipient Email
              </label>
              <input
                type="email"
                value={shareForm.email}
                onChange={(e) => setShareForm({ ...shareForm, email: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="email@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message (Optional)
              </label>
              <textarea
                value={shareForm.message}
                onChange={(e) => setShareForm({ ...shareForm, message: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                rows={3}
                placeholder="Add a message..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                File Format
              </label>
              <select
                value={shareForm.format}
                onChange={(e) => setShareForm({ ...shareForm, format: e.target.value as ExportFormat })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="pdf">PDF Report</option>
                <option value="csv">CSV Data</option>
                <option value="excel">Excel Spreadsheet</option>
              </select>
            </div>

            {shareError && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg">
                {shareError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSharing}
              className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSharing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Report</span>
                </>
              )}
            </button>

            {shareSuccess && (
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <Check className="w-4 h-4" />
                <span>Report shared successfully!</span>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}