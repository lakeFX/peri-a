import React, { useState } from 'react';
import { FileSpreadsheet, FileText, Download } from 'lucide-react';
import { ReportGenerator } from '../components/reports/ReportGenerator';
import { TemplateSelector } from '../components/reports/TemplateSelector';
import { ReportAnalytics } from '../components/reports/ReportAnalytics';

export default function Reports() {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <FileSpreadsheet className="h-5 w-5 mr-2" />
            Analytics
          </button>
        </div>
      </div>

      {showAnalytics && <ReportAnalytics />}

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Report Templates</h2>
        <TemplateSelector onSelect={setSelectedTemplateId} />
      </div>

      {selectedTemplateId && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Generate Report</h2>
          <ReportGenerator
            type="billing"
            title="Billing Report"
            templateId={selectedTemplateId}
          />
        </div>
      )}
    </div>
  );
}