import { Client } from '@microsoft/microsoft-graph-client';
import { acquireToken } from './auth';
import { useAdminStore } from '../../store/adminStore';

let graphClient: Client | null = null;

export async function initializeSharePoint() {
  const token = await acquireToken(['https://graph.microsoft.com/.default']);
  
  graphClient = Client.init({
    authProvider: (done) => done(null, token),
  });

  return graphClient;
}

export function getSharePointClient(): Client {
  if (!graphClient) {
    throw new Error('SharePoint client not initialized');
  }
  return graphClient;
}

export async function uploadToSharePoint(file: File, folderPath: string): Promise<string> {
  const client = getSharePointClient();
  const { settings } = useAdminStore.getState();
  const siteId = settings.find((s) => s.key === 'sharepoint_site_id')?.value;

  if (!siteId) {
    throw new Error('SharePoint site ID not configured');
  }

  const response = await client.api(`/sites/${siteId}/drive/root:/${folderPath}/${file.name}:/content`)
    .put(file);

  return response.id;
}

export async function getSharePointFile(fileId: string): Promise<ArrayBuffer> {
  const client = getSharePointClient();
  const { settings } = useAdminStore.getState();
  const siteId = settings.find((s) => s.key === 'sharepoint_site_id')?.value;

  if (!siteId) {
    throw new Error('SharePoint site ID not configured');
  }

  const response = await client.api(`/sites/${siteId}/drive/items/${fileId}/content`)
    .get();

  return response;
}