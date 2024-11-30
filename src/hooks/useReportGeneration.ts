import { useState } from 'react';
import { generateExcelReport } from '../lib/reports/excel';
import { uploadDocument } from '../lib/sharepoint/documents';
import type { BillingItem } from '../types/billing';
import type { Patient } from '../types/patient';
import type { TimelineEvent } from '../types/timeline';

export function useReportGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateReport = async (
    data: BillingItem[] | Patient[] | TimelineEvent[],
    options: {
      title: string;
      type: 'billing' | 'patient' | 'timeline';
      folderPath?: string;
    }
  ) => {
    setIsGenerating(true);
    setError(null);

    try {
      // Generate Excel file
      const buffer = generateExcelReport(data, {
        ...options,
        author: 'PERI System',
        date: new Date(),
      });

      // Convert buffer to File
      const file = new File(
        [buffer], 
        `${options.title.toLowerCase().replace(/\s+/g, '-')}.xlsx`,
        { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
      );

      // Upload to SharePoint
      const folderPath = options.folderPath || 'Reports';
      const { url } = await uploadDocument(file, folderPath, {
        reportType: options.type,
        generatedAt: new Date().toISOString(),
      });

      return url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate report');
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateReport,
    isGenerating,
    error,
  };
}