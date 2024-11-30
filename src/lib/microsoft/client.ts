import { Client } from '@microsoft/microsoft-graph-client';
import { msalInstance, loginRequest } from '../auth/config';

let graphClient: Client | null = null;

export async function initializeGraphClient(): Promise<Client> {
  if (!graphClient) {
    const account = msalInstance.getAllAccounts()[0];
    if (!account) {
      throw new Error('No active account! Sign in required.');
    }

    const response = await msalInstance.acquireTokenSilent({
      ...loginRequest,
      account,
    });

    graphClient = Client.init({
      authProvider: (done) => done(null, response.accessToken),
    });
  }
  return graphClient;
}

export async function getGraphClient(): Promise<Client> {
  if (!graphClient) {
    return initializeGraphClient();
  }
  return graphClient;
}

export function resetGraphClient(): void {
  graphClient = null;
}