import { Client } from '@microsoft/microsoft-graph-client';
import { msalInstance } from '../auth/config';

let graphClient: Client | null = null;

export async function initializeGraphClient(): Promise<Client> {
  if (!graphClient) {
    const account = msalInstance.getAllAccounts()[0];
    if (!account) {
      throw new Error('No active account! Sign in required.');
    }

    const response = await msalInstance.acquireTokenSilent({
      scopes: ['https://graph.microsoft.com/.default'],
      account,
    });

    graphClient = Client.init({
      authProvider: (done) => done(null, response.accessToken),
    });
  }
  return graphClient;
}

export function getGraphClient(): Promise<Client> {
  return graphClient ? Promise.resolve(graphClient) : initializeGraphClient();
}

export function resetGraphClient(): void {
  graphClient = null;
}