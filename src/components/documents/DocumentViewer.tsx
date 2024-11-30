import React from 'react';
import { X } from 'lucide-react';
import { useDocumentStore } from '../../store/documentStore';

interface DocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DocumentViewer({ isOpen, onClose }: DocumentViewerProps) {
  const { selectedDocument } = useDocumentStore();

  if (!isOpen || !selectedDocument) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">{selectedDocument.name}</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 p-4 overflow-auto">
          {selectedDocument.mimeType.startsWith('image/') ? (
            <img
              src={selectedDocument.url}
              alt={selectedDocument.name}
              className="max-w-full h-auto"
            />
          ) : (
            <iframe
              src={selectedDocument.url}
              className="w-full h-full"
              title={selectedDocument.name}
            />
          )}
        </div>
      </div>
    </div>
  );
}