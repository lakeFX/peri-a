import { getGraphClient } from './client';
import type { EmailOptions } from '../email/types';
import type { DriveItem } from '@microsoft/microsoft-graph-types';

// Email operations
export async function sendEmail(options: EmailOptions): Promise<void> {
  const client = await getGraphClient();
  
  const message = {
    subject: options.subject,
    body: {
      contentType: 'HTML',
      content: options.body,
    },
    toRecipients: options.to.map((email) => ({
      emailAddress: { address: email },
    })),
    attachments: options.attachments?.map((attachment) => ({
      '@odata.type': '#microsoft.graph.fileAttachment',
      name: attachment.name,
      contentType: attachment.contentType,
      contentBytes: attachment.content,
    })),
  };

  await client.api('/me/sendMail').post({ message });
}

// SharePoint operations
export async function uploadToSharePoint(
  file: File,
  folderPath: string
): Promise<DriveItem> {
  const client = await getGraphClient();
  const content = await file.arrayBuffer();
  const { settings } = useAdminStore.getState();
  const siteId = settings.find((s) => s.key === 'sharepoint_site_id')?.value;

  if (!siteId) {
    throw new Error('SharePoint site ID not configured');
  }
  
  return client.api(`/sites/${siteId}/drive/root:/${folderPath}/${file.name}:/content`)
    .put(content);
}

export async function getSharePointFile(
  fileId: string
): Promise<ArrayBuffer> {
  const client = await getGraphClient();
  const { settings } = useAdminStore.getState();
  const siteId = settings.find((s) => s.key === 'sharepoint_site_id')?.value;

  if (!siteId) {
    throw new Error('SharePoint site ID not configured');
  }

  return client.api(`/sites/${siteId}/drive/items/${fileId}/content`)
    .get();
}

// Calendar operations
export async function createCalendarEvent(options: {
  subject: string;
  start: Date;
  end: Date;
  attendees?: string[];
  location?: string;
  body?: string;
}): Promise<void> {
  const client = await getGraphClient();
  
  const event = {
    subject: options.subject,
    start: {
      dateTime: options.start.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    end: {
      dateTime: options.end.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    body: options.body ? {
      contentType: 'HTML',
      content: options.body,
    } : undefined,
    location: options.location ? {
      displayName: options.location,
    } : undefined,
    attendees: options.attendees?.map((email) => ({
      emailAddress: { address: email },
      type: 'required',
    })),
  };

  await client.api('/me/events').post(event);
}