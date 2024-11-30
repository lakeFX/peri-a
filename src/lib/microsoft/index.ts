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

export async function getCalendarEvents(start: Date, end: Date) {
  const client = await initializeGraphClient();
  
  return client.api('/me/calendarView')
    .query({
      startDateTime: start.toISOString(),
      endDateTime: end.toISOString(),
    })
    .select('subject,start,end,location')
    .orderby('start/dateTime')
    .get();
}

export async function createCalendarEvent(options: {
  subject: string;
  start: Date;
  end: Date;
  location?: string;
}) {
  const client = await initializeGraphClient();
  
  return client.api('/me/events').post({
    subject: options.subject,
    start: {
      dateTime: options.start.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    end: {
      dateTime: options.end.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    location: options.location ? { displayName: options.location } : undefined,
  });
}