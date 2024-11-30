import React from 'react';
import { useDocumentStore } from '../../store/documentStore';
import DocumentUploader from '../documents/DocumentUploader';
import { FileText, Download, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface CaseDocumentsProps {
  caseId: string;
}

export default function CaseDocuments({ caseId }: CaseDocumentsProps) {
  const { documents, deleteDocument } = useDocumentStore();
  const caseDocuments = documents.filter(doc => doc.caseId === caseId);

  return (
    <div className="space-y-6">
      <DocumentUploader caseId={caseId} />

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Case Documents</h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {caseDocuments.map((doc) => (
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
                <a
                  href={doc.url}
                  download
                  className="p-2 text-gray-400 hover:text-gray-500"
                >
                  <Download className="h-5 w-5" />
                </a>
                <button
                  onClick={() => deleteDocument(doc.id)}
                  className="p-2 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
          {caseDocuments.length === 0 && (
            <li className="px-4 py-8 text-center text-gray-500">
              No documents uploaded yet
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}