import { ConfidentialClientApplication } from '@azure/msal-node';
import { useAdminStore } from '../../store/adminStore';

let msalInstance: ConfidentialClientApplication | null = null;

export function initializeMSAL() {
  const { settings } = useAdminStore.getState();
  const tenantId = settings.find((s) => s.key === 'azure_tenant_id')?.value;
  const clientId = settings.find((s) => s.key === 'azure_client_id')?.value;
  const clientSecret = settings.find((s) => s.key === 'azure_client_secret')?.value;

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error('Azure AD credentials not configured');
  }

  msalInstance = new ConfidentialClientApplication({
    auth: {
      clientId,
      clientSecret,
      authority: `https://login.microsoftonline.com/${tenantId}`,
    },
  });

  return msalInstance;
}

export function getMSAL(): ConfidentialClientApplication {
  if (!msalInstance) {
    return initializeMSAL();
  }
  return msalInstance;
}

export async function acquireToken(scopes: string[]): Promise<string> {
  const msal = getMSAL();
  const result = await msal.acquireTokenByClientCredential({ scopes });
  return result?.accessToken || '';
}