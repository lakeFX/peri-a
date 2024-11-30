import { uploadToAzure, deleteFromAzure, generateSasUrl } from './azureStorage';
import { uploadToSharePoint, deleteFromSharePoint } from './sharePoint';
import { processDocument } from './openai';
import { useDocumentStore } from '../store/documentStore';
import type { Document, DocumentType } from '../types/document';

export async function uploadDocument(
  file: File,
  type: DocumentType,
  metadata: {
    patientId?: string;
    caseId?: string;
    description?: string;
    tags?: string[];
  }
): Promise<Document> {
  const { addDocument, setUploadProgress, setError } = useDocumentStore.getState();

  try {
    // Upload to Azure Blob Storage
    const { url, blobName } = await uploadToAzure(file, {
      type,
      patientId: metadata.patientId || '',
      caseId: metadata.caseId || '',
    });

    // Upload to SharePoint
    const sharePointId = await uploadToSharePoint(file, {
      ...metadata,
      blobStorageUrl: url,
    });

    // Process document with AI
    const processingResult = await processDocument(
      {
        id: '',
        name: file.name,
        type,
        size: file.size,
        mimeType: file.type,
        uploadedAt: new Date().toISOString(),
        uploadedBy: 'current-user',
        status: 'pending',
        url,
        metadata: {
          description: metadata.description || '',
          tags: metadata.tags || [],
          sharePointId,
          blobStorageUrl: url,
          originalFileName: file.name,
        },
      },
      'extraction'
    );

    // Create document record
    const document: Omit<Document, 'id' | 'uploadedAt'> = {
      name: file.name,
      type,
      size: file.size,
      mimeType: file.type,
      uploadedBy: 'current-user',
      patientId: metadata.patientId,
      caseId: metadata.caseId,
      status: 'processed',
      url,
      metadata: {
        description: metadata.description || '',
        tags: metadata.tags || [],
        sharePointId,
        blobStorageUrl: url,
        originalFileName: file.name,
      },
    };

    // Add to store
    addDocument(document);

    return document as Document;
  } catch (error) {
    setError(error instanceof Error ? error.message : 'Upload failed');
    throw error;
  }
}

export async function deleteDocument(document: Document): Promise<void> {
  try {
    // Delete from Azure
    if (document.metadata.blobStorageUrl) {
      const blobName = document.metadata.blobStorageUrl.split('/').pop();
      if (blobName) {
        await deleteFromAzure(blobName);
      }
    }

    // Delete from SharePoint
    if (document.metadata.sharePointId) {
      await deleteFromSharePoint(document.metadata.sharePointId);
    }

    // Remove from store
    const { deleteDocument } = useDocumentStore.getState();
    deleteDocument(document.id);
  } catch (error) {
    console.error('Delete document error:', error);
    throw new Error('Failed to delete document');
  }
}

export async function getDocumentDownloadUrl(document: Document): Promise<string> {
  if (!document.metadata.blobStorageUrl) {
    throw new Error('Document has no storage URL');
  }

  const blobName = document.metadata.blobStorageUrl.split('/').pop();
  if (!blobName) {
    throw new Error('Invalid blob storage URL');
  }

  return generateSasUrl(blobName);
}