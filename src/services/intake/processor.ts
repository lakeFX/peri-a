import { processIntakeEmail, processIntakeForm } from '../openai';
import { processFile } from '../files/processor';
import type { Patient } from '../../types/patient';
import type { Document } from '../../types/document';

export async function processEmailContent(
  content: string
): Promise<{
  patientData: Partial<Patient>;
  documents: Document[];
}> {
  const patientData = await processIntakeEmail(content);
  const documents: Document[] = [];

  // Extract and process any attachments mentioned in the email
  const attachmentMatches = content.match(/Attachment: (.*?)(?=\n|$)/g);
  if (attachmentMatches) {
    for (const match of attachmentMatches) {
      const fileName = match.replace('Attachment: ', '').trim();
      // Process attachments when available
      // This is a placeholder for future attachment processing
    }
  }

  return { patientData, documents };
}

export async function processIntakeDocument(
  file: File
): Promise<{
  patientData: Partial<Patient>;
  document: Document;
}> {
  // First store the document
  const document = await processFile(file, 'medical-record', {
    metadata: {
      documentType: 'intake-form',
    },
  });

  // Extract text content from the document
  const text = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.readAsText(file);
  });

  // Process the content
  const patientData = await processIntakeForm(text);

  return { patientData, document };
}