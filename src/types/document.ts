export type DocumentType =
  | 'medical-record'
  | 'insurance'
  | 'legal'
  | 'billing'
  | 'imaging'
  | 'consent'
  | 'correspondence'
  | 'lien'
  | 'other';

export type DocumentStatus = 'pending' | 'processed' | 'error';

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  size: number;
  mimeType: string;
  uploadedAt: string;
  uploadedBy: string;
  patientId?: string;
  caseId?: string;
  status: DocumentStatus;
  url: string;
  metadata: {
    description?: string;
    tags?: string[];
    sharePointId?: string;
    blobStorageUrl?: string;
    originalFileName: string;
  };
}

export interface DocumentFolder {
  id: string;
  name: string;
  path: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
  documents: Document[];
}