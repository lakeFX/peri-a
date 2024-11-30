import { getDocument } from './documents';
import { getOpenAI } from '../openai/config';
import type { Document } from '../../types/document';

export async function processDocument(document: Document): Promise<{
  content: string;
  analysis: {
    type: string;
    confidence: number;
    metadata: Record<string, any>;
  };
}> {
  // Get document content from SharePoint
  const content = await getDocument(document.metadata.sharePointId!);
  
  // Convert content to text based on document type
  const text = await extractText(content, document.mimeType);
  
  // Process with OpenAI
  const openai = getOpenAI();
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `Analyze the following medical document and extract key information.
                 Document Type: ${document.type}
                 Focus on:
                 - Patient information
                 - Medical conditions
                 - Treatment plans
                 - Important dates
                 Return a structured JSON response.`,
      },
      {
        role: 'user',
        content: text,
      },
    ],
    temperature: 0.3,
    response_format: { type: 'json_object' },
  });

  const analysis = JSON.parse(completion.choices[0]?.message?.content || '{}');
  
  return {
    content: text,
    analysis: {
      type: document.type,
      confidence: analysis.confidence || 0,
      metadata: analysis.metadata || {},
    },
  };
}

async function extractText(content: ArrayBuffer, mimeType: string): Promise<string> {
  // Convert different document types to text
  switch (mimeType) {
    case 'application/pdf':
      // PDF extraction will be implemented
      return '';
    
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      // Word document extraction will be implemented
      return '';
    
    case 'text/plain':
      return new TextDecoder().decode(content);
    
    default:
      throw new Error(`Unsupported document type: ${mimeType}`);
  }
}