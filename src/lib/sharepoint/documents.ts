import { getGraphClient } from './config';
import { getOpenAI } from '../../services/openai';
import type { Document } from '../../types/document';

const DOCUMENT_LIBRARY = 'PERI Documents';

export async function uploadDocument(
  file: File,
  folderPath: string,
  metadata?: Record<string, any>
): Promise<{ id: string; url: string }> {
  const client = await getGraphClient();
  
  // Create folder if it doesn't exist
  const fullPath = `${DOCUMENT_LIBRARY}/${folderPath}`;
  await ensureFolder(client, fullPath);
  
  // Upload file
  const response = await client
    .api(`/sites/{site-id}/drive/root:/${fullPath}/${file.name}:/content`)
    .put(file);

  // Update metadata
  if (metadata) {
    await client
      .api(`/sites/{site-id}/drive/items/${response.id}`)
      .patch({ fields: metadata });
  }

  return {
    id: response.id,
    url: response.webUrl,
  };
}

async function ensureFolder(client: any, path: string): Promise<void> {
  const folders = path.split('/').filter(Boolean);
  let currentPath = '';

  for (const folder of folders) {
    currentPath += `/${folder}`;
    try {
      await client
        .api(`/sites/{site-id}/drive/root:${currentPath}`)
        .get();
    } catch {
      await client
        .api(`/sites/{site-id}/drive/root/children`)
        .post({
          name: folder,
          folder: {},
          '@microsoft.graph.conflictBehavior': 'replace'
        });
    }
  }
}

export async function processDocument(id: string): Promise<{
  content: string;
  analysis: Record<string, any>;
}> {
  const client = await getGraphClient();
  const openai = getOpenAI();

  // Get document content
  const content = await client
    .api(`/sites/{site-id}/drive/items/${id}/content`)
    .get();

  // Process with OpenAI
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'Extract and analyze key information from this medical document.',
      },
      {
        role: 'user',
        content: content,
      },
    ],
  });

  const analysis = JSON.parse(completion.choices[0]?.message?.content || '{}');

  // Update document metadata with analysis
  await client
    .api(`/sites/{site-id}/drive/items/${id}`)
    .patch({
      fields: {
        aiProcessed: true,
        aiAnalysis: JSON.stringify(analysis),
      },
    });

  return {
    content: content,
    analysis,
  };
}

export async function listDocuments(
  folderPath: string,
  filter?: {
    patientId?: string;
    type?: string;
  }
): Promise<Document[]> {
  const client = await getGraphClient();
  
  let path = `${DOCUMENT_LIBRARY}/${folderPath}`;
  if (filter?.patientId) {
    path += `/Patient_${filter.patientId}`;
  }

  const response = await client
    .api(`/sites/{site-id}/drive/root:/${path}:/children`)
    .select('id,name,size,webUrl,createdDateTime,lastModifiedDateTime,fields')
    .expand('fields')
    .get();

  return response.value
    .filter((item: any) => 
      !filter?.type || item.fields?.documentType === filter.type
    )
    .map((item: any) => ({
      id: item.id,
      name: item.name,
      type: item.fields?.documentType || 'other',
      size: item.size,
      mimeType: item.file.mimeType,
      uploadedAt: item.createdDateTime,
      uploadedBy: item.createdBy.user.displayName,
      url: item.webUrl,
      metadata: {
        ...item.fields,
        sharePointId: item.id,
      },
    }));
}