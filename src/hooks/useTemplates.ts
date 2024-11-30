import { useState } from 'react';
import { getTemplates, analyzeTemplate } from '../lib/sharepoint/templates';
import type { Document } from '../types/document';

export function useTemplates() {
  const [templates, setTemplates] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTemplates = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getTemplates();
      setTemplates(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch templates');
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeTemplateStructure = async (templateId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      return await analyzeTemplate(templateId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze template');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    templates,
    isLoading,
    error,
    fetchTemplates,
    analyzeTemplateStructure,
  };
}