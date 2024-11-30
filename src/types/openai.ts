export interface TranscriptionOptions {
  language?: string;
  prompt?: string;
  temperature?: number;
}

export interface AnalysisOptions {
  extractFields?: string[];
  templateId?: string;
  maxTokens?: number;
}

export interface ReportGenerationOptions {
  template: string;
  format: 'docx' | 'pdf';
  includeFields?: string[];
  style?: {
    font?: string;
    fontSize?: number;
    lineSpacing?: number;
  };
}

export interface ProcessingError {
  code: string;
  message: string;
  details?: Record<string, any>;
}