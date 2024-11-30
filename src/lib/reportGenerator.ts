import { Document, Packer, Paragraph, TextRun } from 'docx';
import type { FormTemplate } from '../types/form';

export async function createReport(
  content: string,
  template: FormTemplate,
  type: 'soap' | 'narrative' | 'examination'
): Promise<string> {
  // Create a Word document
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: template.title,
                bold: true,
                size: 32,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: content,
                size: 24,
              }),
            ],
          }),
        ],
      },
    ],
  });

  // Generate buffer
  const buffer = await Packer.toBuffer(doc);

  // Convert to base64 for preview/download
  return Buffer.from(buffer).toString('base64');
}