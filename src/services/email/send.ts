import { getGraphClient, getSystemEmailAddress } from './config';
import type { Message } from '@microsoft/microsoft-graph-types';

export interface EmailOptions {
  to: string[];
  subject: string;
  body: string;
  attachments?: Array<{
    name: string;
    content: string;
    contentType: string;
  }>;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  const graphClient = getGraphClient();
  const fromAddress = getSystemEmailAddress();

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