import { Client } from '@microsoft/microsoft-graph-client';
import { useAdminStore } from '../../store/adminStore';

let graphClient: Client | null = null;

export function initializeGraphClient(accessToken: string) {
  graphClient = Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });
  return graphClient;
}

export function getGraphClient(): Client {
  if (!graphClient) {
    throw new Error('Graph client not initialized');
  }
  return graphClient;
}

export function getSystemEmailAddress(): string {
  const { settings } = useAdminStore.getState();
  const emailAddress = settings.find((s) => s.key === 'system_email_address')?.value;
  
  if (!emailAddress) {
    throw new Error('System email address not configured');
  }
  
  return emailAddress;
}