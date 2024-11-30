import { getGraphClient } from './config';
import type { Document } from '../../types/document';

const TEMPLATES_FOLDER = 'Report Templates';

export async function getTemplates(): Promise<Document[]> {
  const client = await getGraphClient();
  
  const response = await client
    .api(`/sites/{site-id}/drive/root:/${TEMPLATES_FOLDER}:/children`)
    .select('id,name,webUrl,file')
    .get();

  return response.value.map((item: any) => ({
    id: item.id,
    name: item.name,
    type: getTemplateType(item.name),
    url: item.webUrl,
    metadata: {
      sharePointId: item.id,
    },
  }));
}

function getTemplateType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'xlsx':
      return 'excel';
    case 'docx':
      return 'word';
    case 'pdf':
      return 'pdf';
    default:
      return 'other';
  }
}

export async function analyzeTemplate(templateId: string): Promise<{
  structure: any;
  fields: string[];
  sections: string[];
}> {
  const client = await getGraphClient();
  
  // Get template content
  const content = await client
    .api(`/sites/{site-id}/drive/items/${templateId}/content`)
    .get();

  // Process with OpenAI to understand template structure
  const openai = getOpenAI();
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'Analyze this document template and identify its structure, fields, and sections.',
      },
      {
        role: 'user',
        content: content,
      },
    ],
  });

  return JSON.parse(completion.choices[0]?.message?.content || '{}');
}