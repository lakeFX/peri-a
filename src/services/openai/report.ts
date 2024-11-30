import { getOpenAI } from './config';
import { createReport } from '../../lib/reportGenerator';
import type { FormTemplate } from '../../types/form';

export async function generateReport(
  template: FormTemplate,
  data: Record<string, any>
): Promise<string> {
  const openai = getOpenAI();

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a medical report generator. Generate a report using the following template and data.`,
        },
        {
          role: 'user',
          content: JSON.stringify({ template, data }),
        },
      ],
      temperature: 0.3,
      max_tokens: 2000,
    });

    const result = completion.choices[0]?.message?.content;
    if (!result) {
      throw new Error('No response from OpenAI');
    }

    return createReport(result, template, 'narrative');
  } catch (error) {
    console.error('Report generation error:', error);
    throw new Error('Failed to generate report');
  }
}