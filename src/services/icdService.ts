import OpenAI from 'openai';
import type { ICDCode } from '../types/billing';
import type { SOAPNote } from '../types/patient';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID,
});

export async function suggestICDCodes(
  soapNote: SOAPNote,
  version: 'ICD-10' | 'ICD-11' = 'ICD-10'
): Promise<{
  suggestions: ICDCode[];
  confidence: number;
  reasoning: string;
}> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a medical coding expert specializing in ${version}. 
                   Analyze the provided SOAP note and suggest appropriate ICD codes.
                   Consider the subjective complaints, objective findings, and assessment.
                   Provide confidence levels and reasoning for each suggestion.`,
        },
        {
          role: 'user',
          content: JSON.stringify({
            subjective: soapNote.subjective,
            objective: soapNote.objective,
            assessment: soapNote.assessment,
          }),
        },
      ],
      temperature: 0.3,
      max_tokens: 1000,
    });

    const analysis = JSON.parse(completion.choices[0]?.message?.content || '{}');

    return {
      suggestions: analysis.codes || [],
      confidence: analysis.confidence || 0,
      reasoning: analysis.reasoning || '',
    };
  } catch (error) {
    console.error('ICD code suggestion error:', error);
    throw new Error('Failed to generate ICD code suggestions');
  }
}

export async function validateICDCodes(
  codes: string[],
  version: 'ICD-10' | 'ICD-11' = 'ICD-10'
): Promise<boolean> {
  // This will be replaced with actual ICD code validation API
  // For now, it just checks the format
  const icd10Pattern = /^[A-Z][0-9][0-9AB]\.[0-9A-Z]{1,4}$/;
  const icd11Pattern = /^[1-9][A-Z][A-Z0-9]{2}\.[0-9]{1,3}$/;
  
  const pattern = version === 'ICD-10' ? icd10Pattern : icd11Pattern;
  return codes.every((code) => pattern.test(code));
}