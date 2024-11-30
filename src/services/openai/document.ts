import { getOpenAI } from './config';
import type { Document } from '../../types/document';

export async function processDocument(
  document: Document,
  type: 'extraction' | 'analysis' | 'report'
): Promise<{
  structuredData?: Record<string, any>;
  analysis?: string;
  report?: string;
}> {
  const openai = getOpenAI();

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a medical document processing assistant. Analyze the following ${document.type} document and extract relevant information.`,
        },
        {
          role: 'user',
          content: `Document: ${document.name}\nType: ${document.type}\nContent: [Document content will be provided here]`,
        },
      ],
      temperature: 0.3,
      max_tokens: 1000,
    });

    const result = completion.choices[0]?.message?.content;
    if (!result) {
      throw new Error('No response from OpenAI');
    }

    switch (type) {
      case 'extraction':
        return { structuredData: JSON.parse(result) };
      case 'analysis':
        return { analysis: result };
      case 'report':
        return { report: result };
      default:
        throw new Error('Invalid processing type');
    }
  } catch (error) {
    console.error('OpenAI processing error:', error);
    throw new Error('Failed to process document');
  }
}