import React, { useState } from 'react';
import { FileSpreadsheet, FileText, DollarSign, Loader2 } from 'lucide-react';
import { generateReport } from '../../services/reports';
import { useBillingStore } from '../../store/billingStore';
import { usePatientStore } from '../../store/patientStore';
import { useTimelineStore } from '../../store/timelineStore';
import type { ReportType, ReportUrls } from '../../types/report';

interface ReportGeneratorProps {
  type: ReportType;
  title: string;
  templateId: string;
  patientId?: string;
  caseId?: string;
}

export function ReportGenerator({ type, title, templateId, patientId, caseId }: ReportGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [urls, setUrls] = useState<ReportUrls | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const results = await generateReport({
        patientId,
        caseId,
        type,
        title,
        templateId,
      }, {
        type,
        title,
        author: 'PERI System',
        date: new Date(),
        generateInvoice: true,
      });

      setUrls(results);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to generate report');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
      >
        {isGenerating ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <FileSpreadsheet className="h-5 w-5 mr-2" />
            Generate Report
          </>
        )}
      </button>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {urls && (
        <div className="flex space-x-4">
          <a
            href={urls.excelUrl}
            download={`${title.toLowerCase().replace(/\s+/g, '-')}.xlsx`}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <FileSpreadsheet className="h-5 w-5 mr-2" />
            Download Excel
          </a>
          <a
            href={urls.wordUrl}
            download={`${title.toLowerCase().replace(/\s+/g, '-')}.docx`}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <FileText className="h-5 w-5 mr-2" />
            Download Word
          </a>
          {urls.invoiceUrl && (
            <a
              href={urls.invoiceUrl}
              download={`${title.toLowerCase().replace(/\s+/g, '-')}-invoice.pdf`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <DollarSign className="h-5 w-5 mr-2" />
              Download Invoice
            </a>
          )}
        </div>
      )}
    </div>
  );
}