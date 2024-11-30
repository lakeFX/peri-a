import { useState } from 'react';
import { processDocument } from '../lib/sharepoint/processing';
import { uploadDocument } from '../lib/sharepoint/documents';
import type { Document } from '../types/document';

export function useDocumentProcessing() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const processFile = async (
    file: File,
    options: {
      patientId?: string;
      caseId?: string;
      type?: Document['type'];
    } = {}
  ) => {
    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      // Upload to SharePoint
      setProgress(20);
      const folderPath = options.patientId 
        ? `Patient Records/${options.patientId}/Documents`
        : 'Documents';

      const { id, url } = await uploadDocument(file, folderPath, {
        documentType: options.type || 'other',
        patientId: options.patientId,
        caseId: options.caseId,
      });

      setProgress(50);

      // Process with OpenAI
      const document: Document = {
        id: crypto.randomUUID(),
        name: file.name,
        type: options.type || 'other',
        size: file.size,
        mimeType: file.type,
        uploadedAt: new Date().toISOString(),
        uploadedBy: 'current-user',
        status: 'pending',
        url,
        metadata: {
          sharePointId: id,
          originalFileName: file.name,
        },
      };

      const result = await processDocument(document);
      setProgress(100);

      return {
        document,
        analysis: result.analysis,
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Processing failed');
      throw err;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processFile,
    isProcessing,
    progress,
    error,
  };
}