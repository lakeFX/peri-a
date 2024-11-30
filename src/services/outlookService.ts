import { Client } from '@microsoft/microsoft-graph-client';
import type { Message, Event } from '@microsoft/microsoft-graph-types';
import { useAdminStore } from '../store/adminStore';

let graphClient: Client | null = null;

export async function initializeGraphClient(accessToken: string) {
  graphClient = Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });
}

export async function sendEmail(options: {
  to: string[];
  subject: string;
  body: string;
  attachments?: Array<{ name: string; content: string; contentType: string }>;
}): Promise<void> {
  if (!graphClient) throw new Error('Graph client not initialized');

  const { settings } = useAdminStore.getState();
  const fromAddress = settings.find((s) => s.key === 'system_email_address')?.value;

  const message: Message = {
    subject: options.subject,
    body: {
      contentType: 'HTML',
      content: options.body,
    },
    toRecipients: options.to.map((email) => ({
      emailAddress: { address: email },
    })),
    from: {
      emailAddress: { address: fromAddress },
    },
  };

  if (options.attachments) {
    message.attachments = options.attachments.map((attachment) => ({
      '@odata.type': '#microsoft.graph.fileAttachment',
      name: attachment.name,
      contentType: attachment.contentType,
      contentBytes: attachment.content,
    }));
  }

  await graphClient.api('/me/sendMail').post({ message });
}

export async function createCalendarEvent(options: {
  subject: string;
  start: Date;
  end: Date;
  attendees?: string[];
  location?: string;
  body?: string;
}): Promise<Event> {
  if (!graphClient) throw new Error('Graph client not initialized');

  const event: Event = {
    subject: options.subject,
    start: {
      dateTime: options.start.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    end: {
      dateTime: options.end.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    body: options.body
      ? {
          contentType: 'HTML',
          content: options.body,
        }
      : undefined,
    location: options.location
      ? {
          displayName: options.location,
        }
      : undefined,
    attendees: options.attendees?.map((email) => ({
      emailAddress: {
        address: email,
      },
      type: 'required',
    })),
  };

  return graphClient.api('/me/events').post(event);
}

export async function updateCalendarEvent(
  eventId: string,
  options: Partial<{
    subject: string;
    start: Date;
    end: Date;
    attendees: string[];
    location: string;
    body: string;
  }>
): Promise<Event> {
  if (!graphClient) throw new Error('Graph client not initialized');

  const updateData: Partial<Event> = {};

  if (options.subject) updateData.subject = options.subject;
  if (options.start) {
    updateData.start = {
      dateTime: options.start.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  }
  if (options.end) {
    updateData.end = {
      dateTime: options.end.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  }
  if (options.body) {
    updateData.body = {
      contentType: 'HTML',
      content: options.body,
    };
  }
  if (options.location) {
    updateData.location = {
      displayName: options.location,
    };
  }
  if (options.attendees) {
    updateData.attendees = options.attendees.map((email) => ({
      emailAddress: {
        address: email,
      },
      type: 'required',
    }));
  }

  return graphClient.api(`/me/events/${eventId}`).patch(updateData);
}

export async function deleteCalendarEvent(eventId: string): Promise<void> {
  if (!graphClient) throw new Error('Graph client not initialized');
  await graphClient.api(`/me/events/${eventId}`).delete();
}

export async function getCalendarEvents(
  start: Date,
  end: Date
): Promise<Event[]> {
  if (!graphClient) throw new Error('Graph client not initialized');

  const response = await graphClient
    .api('/me/calendarView')
    .query({
      startDateTime: start.toISOString(),
      endDateTime: end.toISOString(),
    })
    .select('subject,start,end,location,attendees,body')
    .orderby('start/dateTime')
    .get();

  return response.value;
}