import { Client } from '@microsoft/microsoft-graph-client';
import { useAdminStore } from '../../store/adminStore';

// Single Microsoft Graph client instance
let graphClient: Client | null = null;

// Initialize Microsoft Graph client
export async function initializeGraphClient(): Promise<Client> {
  const { settings } = useAdminStore.getState();
  const tenantId = settings.find((s) => s.key === 'azure_tenant_id')?.value;
  const clientId = settings.find((s) => s.key === 'azure_client_id')?.value;
  const clientSecret = settings.find((s) => s.key === 'azure_client_secret')?.value;

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error('Azure AD credentials not configured');
  }

  // Use Azure Identity library for token acquisition
  const response = await fetch('/.auth/me');
  const authInfo = await response.json();
  const accessToken = authInfo.access_token;

  graphClient = Client.init({
    authProvider: (done) => done(null, accessToken),
  });

  return graphClient;
}

// Get Microsoft Graph client
export async function getGraphClient(): Promise<Client> {
  if (!graphClient) {
    return initializeGraphClient();
  }
  return graphClient;
}

// Reset client (useful for error handling)
export function resetGraphClient() {
  graphClient = null;
}