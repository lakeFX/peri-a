import { create } from 'zustand';
import type { Document, DocumentFolder } from '../types/document';

interface DocumentState {
  documents: Document[];
  folders: DocumentFolder[];
  selectedDocument: Document | null;
  selectedFolder: DocumentFolder | null;
  isUploading: boolean;
  uploadProgress: number;
  error: string | null;
}

interface DocumentStore extends DocumentState {
  setSelectedDocument: (document: Document | null) => void;
  setSelectedFolder: (folder: DocumentFolder | null) => void;
  addDocument: (document: Omit<Document, 'id' | 'uploadedAt'>) => void;
  updateDocument: (id: string, document: Partial<Document>) => void;
  deleteDocument: (id: string) => void;
  addFolder: (folder: Omit<DocumentFolder, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateFolder: (id: string, folder: Partial<DocumentFolder>) => void;
  deleteFolder: (id: string) => void;
  setUploadProgress: (progress: number) => void;
  setError: (error: string | null) => void;
}

export const useDocumentStore = create<DocumentStore>((set) => ({
  documents: [],
  folders: [],
  selectedDocument: null,
  selectedFolder: null,
  isUploading: false,
  uploadProgress: 0,
  error: null,

  setSelectedDocument: (document) => set({ selectedDocument: document }),
  setSelectedFolder: (folder) => set({ selectedFolder: folder }),

  addDocument: (document) =>
    set((state) => ({
      documents: [
        ...state.documents,
        {
          ...document,
          id: crypto.randomUUID(),
          uploadedAt: new Date().toISOString(),
        },
      ],
    })),

  updateDocument: (id, updatedDocument) =>
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === id ? { ...doc, ...updatedDocument } : doc
      ),
    })),

  deleteDocument: (id) =>
    set((state) => ({
      documents: state.documents.filter((doc) => doc.id !== id),
    })),

  addFolder: (folder) =>
    set((state) => ({
      folders: [
        ...state.folders,
        {
          ...folder,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    })),

  updateFolder: (id, updatedFolder) =>
    set((state) => ({
      folders: state.folders.map((folder) =>
        folder.id === id
          ? {
              ...folder,
              ...updatedFolder,
              updatedAt: new Date().toISOString(),
            }
          : folder
      ),
    })),

  deleteFolder: (id) =>
    set((state) => ({
      folders: state.folders.filter((folder) => folder.id !== id),
    })),

  setUploadProgress: (progress) =>
    set({ uploadProgress: progress, isUploading: progress < 100 }),

  setError: (error) => set({ error }),
}));