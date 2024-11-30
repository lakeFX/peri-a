import { getOpenAI } from './config';
import type { Patient } from '../../types/patient';

export async function processIntakeEmail(emailContent: string): Promise<Partial<Patient>> {
  const openai = getOpenAI();

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `Extract patient information from the following email content.
                   Focus on identifying:
                   - Patient name and contact details
                   - Insurance information
                   - Medical history
                   Structure the output as a JSON object matching the Patient type.`,
        },
        {
          role: 'user',
          content: emailContent,
        },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const result = completion.choices[0]?.message?.content;
    if (!result) {
      throw new Error('No response from OpenAI');
    }

    return JSON.parse(result) as Partial<Patient>;
  } catch (error) {
    console.error('Intake processing error:', error);
    throw new Error('Failed to process intake email');
  }
}

export async function processIntakeForm(formContent: string): Promise<Partial<Patient>> {
  const openai = getOpenAI();

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `Extract structured patient information from the form content.
                   Include:
                   - Basic patient information
                   - Contact details
                   - Insurance information
                   - Emergency contacts
                   Structure the output as a JSON object matching the Patient type.`,
        },
        {
          role: 'user',
          content: formContent,
        },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const result = completion.choices[0]?.message?.content;
    if (!result) {
      throw new Error('No response from OpenAI');
    }

    return JSON.parse(result) as Partial<Patient>;
  } catch (error) {
    console.error('Form processing error:', error);
    throw new Error('Failed to process intake form');
  }
}