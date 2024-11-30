import OpenAI from 'openai';
import { useAdminStore } from '../../store/adminStore';

let openaiInstance: OpenAI | null = null;

export function initializeOpenAI() {
  const { settings } = useAdminStore.getState();
  const apiKey = settings.find((s) => s.key === 'openai_api_key')?.value;
  const orgId = settings.find((s) => s.key === 'openai_org_id')?.value;

  if (!apiKey) {
    throw new Error('OpenAI API key not configured');
  }

  openaiInstance = new OpenAI({
    apiKey,
    organization: orgId,
    dangerouslyAllowBrowser: true
  });

  return openaiInstance;
}

export function getOpenAI(): OpenAI {
  if (!openaiInstance) {
    return initializeOpenAI();
  }
  return openaiInstance;
}