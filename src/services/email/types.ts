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

export interface EmailTemplate {
  subject: string;
  body: string;
}