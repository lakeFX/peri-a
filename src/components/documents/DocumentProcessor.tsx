import React from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { useDocumentProcessing } from '../../hooks/useDocumentProcessing';
import { useDocumentStore } from '../../store/documentStore';

interface DocumentProcessorProps {
  patientId?: string;
  caseId?: string;
  onSuccess?: () => void;
}

export function DocumentProcessor({ patientId, caseId, onSuccess }: DocumentProcessorProps) {
  const { processFile, isProcessing, progress, error } = useDocumentProcessing();
  const { addDocument } = useDocumentStore();

  const handleFileSelect = async (files: FileList | null) => {
    if (!files?.length) return;

    try {
      const { document, analysis } = await processFile(files[0], {
        patientId,
        caseId,
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
      // Error is handled by the hook
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
        <input
          type="file"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          id="file-upload"
          accept=".pdf,.doc,.docx,.txt"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <Upload className="h-12 w-12 text-gray-400 mb-4" />
          <span className="text-sm text-gray-600">
            Click to upload or drag and drop
          </span>
          <span className="text-xs text-gray-500 mt-1">
            PDF, Word, or text files
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