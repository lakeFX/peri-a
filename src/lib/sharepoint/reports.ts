import { getGraphClient } from './config';
import { getOpenAI } from '../openai/config';
import type { Document } from '../../types/document';

export async function generateReport(
  templateId: string,
  data: any,
  options: {
    title: string;
    type: 'excel' | 'word' | 'pdf';
    folderPath?: string;
  }
): Promise<{ url: string }> {
  const client = await getGraphClient();
  
  // Get template content
  const templateContent = await client
    .api(`/sites/{site-id}/drive/items/${templateId}/content`)
    .get();

  // Process with OpenAI to generate report content
  const openai = getOpenAI();
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `You are a report generator. Generate a report using the provided template and data.
                 Maintain the same formatting and structure as the template.
                 Replace placeholders with actual data.`,
      },
      {
        role: 'user',
        content: JSON.stringify({
          template: templateContent,
          data: data,
        }),
      },
    ],
  });

  const reportContent = completion.choices[0]?.message?.content;
  if (!reportContent) {
    throw new Error('Failed to generate report content');
  }

  // Create report file
  const fileName = `${options.title.toLowerCase().replace(/\s+/g, '-')}.${options.type}`;
  const folderPath = options.folderPath || 'Generated Reports';

  const response = await client
    .api(`/sites/{site-id}/drive/root:/${folderPath}/${fileName}:/content`)
    .put(reportContent);

  return { url: response.webUrl };
}

export async function processReportWithAI(
  reportId: string,
  type: 'analysis' | 'summary' | 'extraction'
): Promise<any> {
  const client = await getGraphClient();
  
  // Get report content
  const content = await client
    .api(`/sites/{site-id}/drive/items/${reportId}/content`)
    .get();

  // Process with OpenAI
  const openai = getOpenAI();
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `Analyze this report and provide ${type}.
                 Focus on key information, trends, and insights.`,
      },
      {
        role: 'user',
        content: content,
      },
    ],
  });

  return JSON.parse(completion.choices[0]?.message?.content || '{}');
}