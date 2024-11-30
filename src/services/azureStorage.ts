import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import { DefaultAzureCredential } from '@azure/identity';
import type { Document } from '../types/document';

// Azure Storage configuration
const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const containerName = 'documents';

// Create pipeline with DefaultAzureCredential
const credential = new DefaultAzureCredential();
const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  credential
);

export async function uploadToAzure(
  file: File,
  metadata: Record<string, string>
): Promise<{ url: string; blobName: string }> {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobName = `${Date.now()}-${file.name}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload file with metadata
    await blockBlobClient.uploadData(await file.arrayBuffer(), {
      metadata,
      blobHTTPHeaders: {
        blobContentType: file.type,
      },
    });

    return {
      url: blockBlobClient.url,
      blobName,
    };
  } catch (error) {
    console.error('Azure upload error:', error);
    throw new Error('Failed to upload file to Azure');
  }
}

export async function deleteFromAzure(blobName: string): Promise<void> {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.delete();
  } catch (error) {
    console.error('Azure delete error:', error);
    throw new Error('Failed to delete file from Azure');
  }
}

export async function getDocumentUrl(blobName: string): Promise<string> {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  return blockBlobClient.url;
}

export async function listDocuments(prefix?: string): Promise<string[]> {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobs: string[] = [];

  for await (const blob of containerClient.listBlobsFlat({ prefix })) {
    blobs.push(blob.name);
  }

  return blobs;
}

export async function generateSasUrl(
  blobName: string,
  expiryMinutes: number = 60
): Promise<string> {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const startsOn = new Date();
  const expiresOn = new Date(startsOn);
  expiresOn.setMinutes(startsOn.getMinutes() + expiryMinutes);

  const sasUrl = await blockBlobClient.generateSasUrl({
    permissions: { read: true },
    startsOn,
    expiresOn,
  });

  return sasUrl;
}