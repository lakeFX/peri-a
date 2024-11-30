import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { uploadDocument } from '../../lib/sharepoint/documents';
import { useDocumentStore } from '../../store/documentStore';

interface DocumentUploadProps {
  patientId?: string;
  caseId?: string;
  onSuccess?: () => void;
}

export function DocumentUpload({ patientId, caseId, onSuccess }: DocumentUploadProps) {
  const { addDocument, setUploadProgress, setError } = useDocumentStore();

  const handleUpload = async (files: FileList | null) => {
    if (!files?.length) return;

    try {
      setUploadProgress(0);
      
      const file = files[0];
      const folderPath = patientId 
        ? `Patient Records/${patientId}/Documents`
        : 'Documents';

      const metadata = {
        documentType: file.type,
        patientId,
        caseId,
      };

      const { id, url } = await uploadDocument(file, folderPath, metadata);

      addDocument({
        name: file.name,
        type: 'medical-record',
        size: file.size,
        mimeType: file.type,
        uploadedBy: 'current-user',
        patientId,
        caseId,
        status: 'pending',
        url,
        metadata: {
          sharePointId: id,
          originalFileName: file.name,
        },
      });

      setUploadProgress(100);
      if (onSuccess) onSuccess();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Upload failed');
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
      <input
        type="file"
        onChange={(e) => handleUpload(e.target.files)}
        className="hidden"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer flex flex-col items-center"
      >
        <Upload className="h-12 w-12 text-gray-400 mb-4" />
        <span className="text-sm text-gray-600">
          Click to upload or drag and drop
        </span>
      </label>
    </div>
  );
}