import React, { useCallback } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { useDocumentProcessing } from '../../hooks/useDocumentProcessing';
import { useDocumentStore } from '../../store/documentStore';

interface DocumentUploaderProps {
  patientId?: string;
  caseId?: string;
  onSuccess?: () => void;
}

export default function DocumentUploader({ patientId, caseId, onSuccess }: DocumentUploaderProps) {
  const { processFile, isProcessing, progress, error } = useDocumentProcessing();
  const { addDocument } = useDocumentStore();

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      await handleFiles(files);
    },
    [patientId, caseId]
  );

  const handleFiles = async (files: File[]) => {
    if (!files.length) return;

    try {
      const file = files[0];
      const { document, analysis } = await processFile(file, {
        patientId,
        caseId,
        type: determineDocumentType(file),
      });

      addDocument({
        ...document,
        metadata: {
          ...document.metadata,
          aiAnalysis: analysis,
        },
      });

      if (onSuccess) onSuccess();
    } catch (error) {
      // Error handled by hook
    }
  };

  const determineDocumentType = (file: File): string => {
    const ext = file.name.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return 'medical-record';
      case 'docx':
      case 'doc':
        return 'report';
      case 'xlsx':
      case 'xls':
        return 'billing';
      default:
        return 'other';
    }
  };

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors"
      >
        <input
          type="file"
          onChange={(e) => handleFiles(Array.from(e.target.files || []))}
          className="hidden"
          id="file-upload"
          accept=".pdf,.doc,.docx,.xls,.xlsx"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <Upload className="h-12 w-12 text-gray-400 mb-4" />
          <span className="text-sm text-gray-600">
            Drag and drop or click to upload
          </span>
          <span className="text-xs text-gray-500 mt-1">
            PDF, Word, or Excel files
          </span>
        </label>
      </div>

      {isProcessing && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Processing document...</span>
            <span className="text-gray-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}