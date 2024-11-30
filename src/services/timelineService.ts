import OpenAI from 'openai';
import type { TimelineEvent, TimelineTemplate } from '../types/timeline';
import type { SOAPNote } from '../types/patient';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID,
});

export async function suggestTimelineAdjustments(
  patientId: string,
  currentTimeline: TimelineEvent[],
  soapNotes: SOAPNote[]
): Promise<{
  adjustments: Array<{
    eventId: string;
    suggestedDate: string;
    confidence: number;
    reasoning: string;
  }>;
}> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a medical timeline optimization expert.
                   Analyze the patient's SOAP notes and current timeline.
                   Suggest adjustments to the timeline based on patient progress and needs.
                   Consider treatment response, complications, and recovery rate.`,
        },
        {
          role: 'user',
          content: JSON.stringify({
            timeline: currentTimeline,
            soapNotes,
          }),
        },
      ],
      temperature: 0.3,
      max_tokens: 1000,
    });

    const analysis = JSON.parse(completion.choices[0]?.message?.content || '{}');
    return {
      adjustments: analysis.adjustments || [],
    };
  } catch (error) {
    console.error('Timeline adjustment suggestion error:', error);
    throw new Error('Failed to generate timeline adjustments');
  }
}

export async function validateTimeline(
  timeline: TimelineEvent[],
  template: TimelineTemplate
): Promise<{
  isValid: boolean;
  issues?: string[];
}> {
  // Implement timeline validation logic
  // Check for required events, proper sequencing, and reasonable intervals
  return {
    isValid: true,
  };
}

export async function syncWithOutlook(
  events: TimelineEvent[]
): Promise<{
  synced: number;
  failed: number;
  errors?: string[];
}> {
  // This will be implemented when integrating with Microsoft Graph API
  return {
    synced: 0,
    failed: 0,
  };
}