import React from 'react';
import { FileText, Download, Trash2 } from 'lucide-react';
import { useDocumentStore } from '../../store/documentStore';
import { format } from 'date-fns';

interface DocumentListProps {
  patientId?: string;
  caseId?: string;
}

export function DocumentList({ patientId, caseId }: DocumentListProps) {
  const { documents, deleteDocument } = useDocumentStore();

  const filteredDocuments = documents.filter(
    (doc) =>
      (!patientId || doc.patientId === patientId) &&
      (!caseId || doc.caseId === caseId)
  );

  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Documents</h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {filteredDocuments.map((doc) => (
          <li
            key={doc.id}
            className="px-4 py-4 sm:px-6 hover:bg-gray-50 flex items-center justify-between"
          >
            <div className="flex items-center">
              <FileText className="h-6 w-6 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                <p className="text-sm text-gray-500">
                  {format(new Date(doc.uploadedAt), 'MMM d, yyyy')} •{' '}
                  {(doc.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleDownload(doc.url, doc.name)}
                className="p-2 text-gray-400 hover:text-gray-500"
              >
                <Download className="h-5 w-5" />
              </button>
              <button
                onClick={() => deleteDocument(doc.id)}
                className="p-2 text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </li>
        ))}
        {filteredDocuments.length === 0 && (
          <li className="px-4 py-8 text-center text-gray-500">
            No documents uploaded yet
          </li>
        )}
      </ul>
    </div>
  );
}