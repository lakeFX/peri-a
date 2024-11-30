import { Readable } from 'stream';
import { BlobServiceClient } from '@azure/storage-blob';
import { getGraphClient } from '../microsoft/client';
import { useAdminStore } from '../../store/adminStore';
import type { Document } from '../../types/document';

export async function processFile(
  file: File,
  type: Document['type'],
  options: {
    patientId?: string;
    caseId?: string;
    metadata?: Record<string, string>;
  } = {}
): Promise<Document> {
  // Get Azure storage connection
  const { settings } = useAdminStore.getState();
  const connectionString = settings.find(
    (s) => s.key === 'azure_storage_connection'
  )?.value;

  if (!connectionString) {
    throw new Error('Azure Storage connection not configured');
  }

  // Create blob client
  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient('documents');
  const blobName = `${Date.now()}-${file.name}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  // Upload to Azure Blob Storage
  const stream = new Readable();
  stream.push(await file.arrayBuffer());
  stream.push(null);
  await blockBlobClient.uploadStream(stream);

  // Upload to SharePoint
  const graphClient = await getGraphClient();
  const siteId = settings.find((s) => s.key === 'sharepoint_site_id')?.value;
  
  if (!siteId) {
    throw new Error('SharePoint site ID not configured');
  }

  const folderPath = options.patientId 
    ? `Patients/${options.patientId}/Documents`
    : 'Documents';

  const sharePointResponse = await graphClient
    .api(`/sites/${siteId}/drive/root:/${folderPath}/${file.name}:/content`)
    .put(stream);

  // Create document record
  const document: Omit<Document, 'id' | 'uploadedAt'> = {
    name: file.name,
    type,
    size: file.size,
    mimeType: file.type,
    uploadedBy: 'current-user',
    patientId: options.patientId,
    caseId: options.caseId,
    status: 'pending',
    url: blockBlobClient.url,
    metadata: {
      ...options.metadata,
      sharePointId: sharePointResponse.id,
      blobStorageUrl: blockBlobClient.url,
      originalFileName: file.name,
    },
  };

  return document as Document;
}